import type { ReactNode } from "react";

export interface ModalProps {
  open: () => HTMLDialogElement["close"];
  onClose: () => HTMLDialogElement["close"];
  children: ReactNode;
}
