import React from "react";
import type { ButtonProps } from "./types.ts";

const Button: React.FC<ButtonProps> = ({ ...props }) => {
  return <button {...props}>{props.children}</button>;
};

export default Button;
