import { useState } from "react";
import { statuses } from "../util/styles";
import { Spinner } from "../components";
import { FaCloudUploadAlt, MdDelete } from "../assets/icons";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import {
  alertDanger,
  alertNULL,
  alertSuccess,
} from "../context/actions/alertActions";
import { buttonClick } from "../animations";
import { motion } from "framer-motion";
import { addNewProduct } from "../api";

const DBNewItem = () => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [imageDownloadUrl, setImageDownloadUrl] = useState(null);

  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];

    const storageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(alertDanger(`Error : ${error}`));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //  console.log("file available at", downloadURL);
          setImageDownloadUrl(downloadURL);
          setIsLoading(false);
          setProgress(null);
          dispatch(alertSuccess(`Image uploaded to the cloud`));
          setTimeout(() => {
            dispatch(alertNULL());
          }, 3000);
        });
      }
    );
  };

  const deleteImageFromFirebase = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageDownloadUrl);

    deleteObject(deleteRef).then(() => {
      setImageDownloadUrl(null);
      setIsLoading(false);
      dispatch(alertSuccess(`Image removed from the cloud`));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    });
  };

  const submitNewData = () => {
    const data = {
      product_name: itemName,
      product_category: category,
      product_price: price,
      imageURL: imageDownloadUrl,
    };
    // console.log(data);
    addNewProduct(data).then((res) => {
        console.log(res)
      dispatch(alertSuccess("New Item added"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      setImageDownloadUrl(null);
      setItemName("");
      setPrice("");
      setCategory(null);
    });
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col pt-6 px-24 w-full">
        <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
          <InputValueField
            type={"text"}
            placeholder="Item Name Here"
            stateFunc={setItemName}
            stateValue={itemName}
          />
          <div className="w-full flex items-center justify-around gap-3 flex-wrap">
            {statuses &&
              statuses?.map((data) => {
                return (
                  <p
                    key={data.id}
                    onClick={() => setCategory(data.category)}
                    className={`px-4 py-3 rounded-md text-xl  font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
                      data.category === category
                        ? "bg-red-400 text-primary "
                        : "bg-transparent text-textColor"
                    }`}
                  >
                    {data.title}
                  </p>
                );
              })}
          </div>

          <InputValueField
            type={"number"}
            placeholder="Item Price Here"
            stateFunc={setPrice}
            stateValue={price}
          />

          <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
            {isLoading ? (
              <>
                <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
                  <Spinner />
                  {Math.round(progress > 0) && (
                    <div className="w-full flex flex-col items-center justify-center gap-2">
                      <div className="flex justify-between w-full">
                        <span className="text-base font-medium text-textColor ">
                          Progress
                        </span>
                        <span className="text-sm font-medium text-textColor">
                          {Math.round(progress) > 0 && (
                            <>{`${Math.round(progress)}%`}</>
                          )}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                          style={{ width: `${Math.round(progress)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {!imageDownloadUrl ? (
                  <>
                    <label>
                      <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                        <div className="flex flex-col justify-center items-center cursor-pointer">
                          <p className="font-bold text-4xl">
                            <FaCloudUploadAlt className="-rotate-0" />
                          </p>
                          <p className="text-lg text-textColor">
                            Click to upload an image
                          </p>
                        </div>
                      </div>
                      <input
                        type="file"
                        name="upload-image"
                        accept="image/*"
                        onChange={uploadImage}
                        className="w-0 h-0"
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <div className="relative w-full h-full overflow-hidden rounded-md">
                      <motion.img
                        whileHover={{ scale: 1.15 }}
                        src={imageDownloadUrl}
                        className="w-full h-full object-cover"
                      />
                      <motion.button
                        {...buttonClick}
                        type="button"
                        className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out   "
                        onClick={() =>
                          deleteImageFromFirebase(imageDownloadUrl)
                        }
                      >
                        <MdDelete className="-rotate-0" />
                      </motion.button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <motion.button
            onClick={submitNewData}
            {...buttonClick}
            className="w-9/12  py-2  rounded-md bg-red-400 text-primary hover:bg-red-600 cursor-pointer"
          >
            Save
          </motion.button>
        </div>
      </div>
    </>
  );
};

export const InputValueField = ({
  type,
  placeholder,
  stateValue,
  stateFunc,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400"
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
      />
    </>
  );
};

export default DBNewItem;
