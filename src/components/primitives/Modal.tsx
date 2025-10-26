import { useRef, useEffect, type FC } from "react";
import { createPortal } from "react-dom";
import type { ModalProps } from "./types.ts";

const Modal: FC<ModalProps> = ({ children, open, onClose }) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current;

    if (dialog.current) {
      dialog.current.showModal();
    }

    return () => modal?.close();
  }, [open]);
  return createPortal(
    <dialog ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal") as HTMLDivElement,
  );
};

export default Modal;
