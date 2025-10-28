import React from "react";
import type { InputProps } from "./types.ts";

const Input: React.FC<InputProps> = ({ ...props }) => {
  return <input {...props} />;
};

export default Input;
