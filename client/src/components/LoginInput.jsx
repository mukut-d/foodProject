import { motion } from "framer-motion";
import { useState } from "react";
import { fadeInOut } from "../animations";

const LoginInput = ({
  placeholder,
  icon,
  inputState,
  inputStateFunc,
  type,
  isSignUp,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <>
      <motion.div
        {...fadeInOut}
        className={`flex items-center justify-center gap-4 bg-rose-50 backdrop-blur-md rounded-md w-full px-4 py-4 ${
          isFocus ? "shadow-md shadow-red-400" : "shadow-none"
        }`}
      >
        {icon}
        <input
          type={type}
          placeholder={placeholder}
          className="w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none "
          value={inputState}
          onChange={(event) => {
            inputStateFunc(event.target.value);
          }}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </motion.div>
    </>
  );
};

export default LoginInput;
