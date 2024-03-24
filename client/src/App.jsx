import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { fadeInOut } from "./animations";
import { getAllCartItems, validateUserJWTToken } from "./api";
import { Alert, CheckoutSuccess, MainLoader } from "./components";
import { app } from "./config/firebase.config";
import { Dashboard, Login, Main } from "./containers";
import { setCartItems } from "./context/actions/cartAction";
import { setUserDetails } from "./context/actions/userActions";

function App() {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      // console.log(cred);  - to see access tokens
      if (cred) {
        cred.getIdToken().then((token) => {
          // console.log("token-",token)
          validateUserJWTToken(token).then((data) => {
            if (data) {
              getAllCartItems(data?.user_id).then((items) => {
                console.log(items);
                dispatch(setCartItems(items));
              });
            }
            dispatch(setUserDetails(data));
          });
        });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    });
  }, []);
  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 inset-0 bg-lighttextGray backdrop-blur-md flex items-center justify-center w-full"
        >
          <MainLoader />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        {/* <Route path="/user-orders" element={<UsersOrder />} /> */}
      </Routes>

      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
}

export default App;
