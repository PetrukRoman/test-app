import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { logInUser } from "../../services/firebase";
import { isEmail, isNotEmpty } from "../../util/validation";
import { ModalContext, ModalContextType } from "../../context/modalContext";
import { UserData } from "../../types";
import Modal from "../Modal/Modal";
import InputGroup from "../Input/Input";
import Button from "../Button/Button";
import UseInput from "../../hooks/useInput";
import Loader from "../Loader/Loader";
import useForm from "../../hooks/useForm";
import styles from "./Login.module.css";

const Login = () => {
  const { t } = useTranslation();
  const { isLoginOpen, closeLogin, openSignup } = useContext(ModalContext) as ModalContextType;
  const mutation = useMutation({
    mutationFn: (userData: UserData) => logInUser(userData),
    onSuccess: () => {
      emailInput.resetInput();
      passwordInput.resetInput();
      closeLogin();
    },
    onError: () => {
      passwordInput.resetInput();
    },
  });

  const emailInput = UseInput({
    defaulftValue: "",
    validFunc: (value) => {
      return isEmail(value) && isNotEmpty(value);
    },
  });

  const passwordInput = UseInput({
    defaulftValue: "",
    validFunc: (value) => {
      return isNotEmpty(value);
    },
  });
  const { checkFormValid, hasFieldsErrors } = useForm([emailInput, passwordInput]);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validForn = checkFormValid();

    if (!validForn) {
      return;
    }

    mutation.mutate({
      email: emailInput.value,
      password: passwordInput.value,
    });
  };

  return (
    <Modal open={isLoginOpen} onClose={closeLogin}>
      {mutation.isPending && <Loader />}
      <div className={styles.login}>
        <h2>{t("Welcome.key")}</h2>
        <form onSubmit={(event) => handleLogin(event)}>
          <InputGroup
            label={t("Email.key")}
            type="email "
            id="login"
            name="email"
            autoFocus={false}
            value={emailInput.value}
            onChange={emailInput.handleInputChange}
            onBlur={emailInput.handleInputBlur}
            error={{
              isError: emailInput.error,
              message: t("InvalidEmail.key"),
            }}
          />
          <InputGroup
            label={t("Password.key")}
            type="password"
            id="password"
            name="password"
            value={passwordInput.value}
            onChange={passwordInput.handleInputChange}
            onBlur={passwordInput.handleInputBlur}
            error={{
              isError: passwordInput.error,
              message: t("InvalidPassword.key"),
            }}
          />
          {mutation.isError && <p>{mutation.error.message}</p>}
          <div className={styles.cta}>
            <Button variant="filled" size="fill" disabled={hasFieldsErrors}>
              {t("LogIn.key")}
            </Button>
          </div>
        </form>
        <div className={styles.center}>
          <Button
            size="small"
            onClick={() => {
              closeLogin();
              openSignup();
            }}
          >
            {t("NotAccount.key")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default Login;
