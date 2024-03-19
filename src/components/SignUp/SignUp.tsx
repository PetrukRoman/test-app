import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "../../services/firebase";
import { useTranslation } from "react-i18next";

import { isEmail, isEqual, isMinLength, isNotEmpty } from "../../util/validation";
import { ModalContext, ModalContextType } from "../../context/modalContext";
import { UserData } from "../../types";
import Modal from "../Modal/Modal";
import InputGroup from "../Input/Input";
import Button from "../Button/Button";
import UseInput from "../../hooks/useInput";
import Loader from "../Loader/Loader";
import useForm from "../../hooks/useForm";

import styles from "./SignUp.module.css";

const SignUp = () => {
  const { t } = useTranslation();
  const { isSignupOpen, closeSignup, openLogin } = useContext(ModalContext) as ModalContextType;
  const mutation = useMutation({
    mutationFn: (userData: UserData) => signUpUser(userData),
    onSuccess: () => {
      emailInput.resetInput();
      passwordInput.resetInput();
      closeSignup();
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
      return isNotEmpty(value) && isMinLength(value, 6);
    },
  });
  const confirmPasswordInput = UseInput({
    defaulftValue: "",
    validFunc: (value) => {
      return isEqual(value, passwordInput.value);
    },
  });
  const { checkFormValid, hasFieldsErrors } = useForm([emailInput, passwordInput, confirmPasswordInput]);

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
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
    <Modal open={isSignupOpen} onClose={closeSignup}>
      {mutation.isPending && <Loader />}
      <div className={styles.signUp}>
        <h2>{t("Welcome.key")}</h2>
        <form onSubmit={(event) => handleSignUp(event)}>
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
          <InputGroup
            label={t("ConfirmPassword.key")}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPasswordInput.value}
            onChange={confirmPasswordInput.handleInputChange}
            onBlur={confirmPasswordInput.handleInputBlur}
            error={{
              isError: confirmPasswordInput.error,
              message: t("PasswordIsnotEqual.key"),
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
              closeSignup();
              openLogin();
            }}
          >
            {t("HaveAccount.key")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default SignUp;
