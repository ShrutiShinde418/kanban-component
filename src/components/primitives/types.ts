import React, { type ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type InputProps =
  | (React.InputHTMLAttributes<HTMLInputElement> & {
      isTextArea?: false;
    })
  | (React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
      isTextArea: true;
    });

export interface FormControlProps {
  labelName: string;
  isFieldRequired: boolean;
  labelClasses?: string;
  inputProps: InputProps;
  icon?: React.ReactNode;
}

export interface MenuItem {
  id: number;
  title: string;
}

export interface MenuProps {
  subMenuItems: MenuItem[];
  classNames?: string;
  menuItemClassNames?: string;
  listStyles?: string;
}
