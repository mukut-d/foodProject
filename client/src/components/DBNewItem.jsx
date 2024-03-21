import { useState } from "react";
import { statuses } from "../util/styles";
import { Spinner } from "../components";
import { FaCloudUploadAlt } from "../assets/icons";

const DBNewItem = () => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [imageDownloadUrl, setImageDownloadUrl] = useState(null);

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    console.log(imageFile);
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
                  <></>
                )}
              </>
            )}
          </div>
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
