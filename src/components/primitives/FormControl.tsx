import React from "react";
import Input from "./Input.tsx";
import type { FormControlProps } from "./types.ts";

const FormControl: React.FC<FormControlProps> = ({
  icon,
  labelName,
  isFieldRequired,
  labelClasses,
  inputProps,
}) => {
  return (
    <div>
      <label className={labelClasses}>
        {icon}
        {labelName} {isFieldRequired && <span className="text-red-500">*</span>}
      </label>
      <Input {...inputProps} />
    </div>
  );
};

export default FormControl;
