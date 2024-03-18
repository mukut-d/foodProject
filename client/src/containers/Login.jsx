import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { LoginBg, Logo } from "../assets";
import { LoginInput } from "../components";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { FcGoogle } from "react-icons/fc";
import { app } from "../config/firebase.config";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
       // console.log(cred);  - to see access tokens
        if (cred) {
          cred.getIdToken().then(token => {
            console.log("token-",token)
          })
        }
      });
    });
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      <img
        src={LoginBg}
        alt="Login Background"
        className="w-full h-full object-cover absolute top-0 left-0"
      />
      {/* Content Box */}
      <div className=" flex flex-col items-center  w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
        {/* Top Logo Section */}
        <div className="flex items-center justify-start gap-4 w-full ">
          <img src={Logo} className="w-8" alt="" />
          <p className="text-headingColor font-semibold text-3xl">City</p>
        </div>
        {/* Welcome Text */}
        <p className="text-3xl font-semibold text-headingColor">Welcome Back</p>
        <p className="text-xl text-textColor -mt-6 ">
          {isSignUp ? "Sign Up" : "Sign In"} with following
        </p>

        {/* input section */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeholder={"Email Here"}
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inputState={userEmail}
            inputStateFunc={setUserEmail}
            text="email"
            isSignUp={isSignUp}
          />

          <LoginInput
            placeholder={"Password Here"}
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={password}
            inputStateFunc={setPassword}
            text="password"
            isSignUp={isSignUp}
          />

          {isSignUp && (
            <LoginInput
              placeholder={"Confirm Password Here"}
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={confirmPassword}
              inputStateFunc={setConfirmPassword}
              text="password"
              isSignUp={isSignUp}
            />
          )}

          {!isSignUp ? (
            <p>
              Doesn't have an account{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(true)}
              >
                Create One
              </motion.button>
            </p>
          ) : (
            <p>
              Already have an account{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(false)}
              >
                Sign-in here
              </motion.button>
            </p>
          )}

          {/* Button section */}
          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
            >
              Sign In
            </motion.button>
          )}
        </div>
        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
          <p className="text-white">or</p>
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
        </div>
        <motion.div
          {...buttonClick}
          className="flex items-center justify-center px-20 py-2 bg-rose-50 backdrop-blur-md cursor-pointer rounded-3xl gap-4
          "
          onClick={loginWithGoogle}
        >
          <FcGoogle className="text-3xl" />
          <p className="capitalize text-base text-headingColor ">
            Signin with Google
          </p>
        </motion.div>
      </div>
    </div>
  );
}
