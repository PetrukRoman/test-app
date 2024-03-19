import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import CloseIcon from "../../assets/close.svg";
import styles from "./Modal.module.css";

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

const Modal = ({ children, open, onClose }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      console.log("open");
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialogRef} className={styles.modal} onClose={onClose}>
      {children}
      <button className={styles.closeBtn} onClick={onClose}>
        <img src={CloseIcon} alt="close" />
      </button>
    </dialog>,
    document.getElementById("modal")!
  );
};
export default Modal;
