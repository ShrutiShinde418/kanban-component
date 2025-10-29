import React from "react";
import type { InputProps } from "./types.ts";

const Input: React.FC<InputProps> = (props) => {
  return (
    <>{props.isTextArea ? <textarea {...props} /> : <input {...props} />}</>
  );
};

export default Input;
