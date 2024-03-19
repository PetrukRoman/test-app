import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { ModalContext, ModalContextType } from "../../context/modalContext";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import styles from "./Logout.module.css";
const Logout = () => {
  const { t } = useTranslation();
  const { isLogoutOpen, closeLogout } = useContext(ModalContext) as ModalContextType;
  const { logOut } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const { mutate, isError, isPending, error } = useMutation({
    onSuccess: () => {
      closeLogout();
      navigate("/");
      logOut();
    },
    mutationFn: () => signOut(auth),
  });

  const handleLogout = () => {
    mutate();
  };
  return (
    <Modal open={isLogoutOpen} onClose={closeLogout}>
      {isPending && !isError && <Loader />}
      <div className={styles.logoutContainer}>
        <h2>{t("ExitQuestion.key")}</h2>

        {isError && <p>{error.message}</p>}
        <Button variant="filled" size="fill" onClick={handleLogout}>
          {t("SignOut.key")}
        </Button>
      </div>
    </Modal>
  );
};
export default Logout;
