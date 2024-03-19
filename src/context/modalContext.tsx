import { createContext, useState } from "react";

export type ModalContextType = {
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  isLogoutOpen: boolean;
  isOrderConfirmOpen: boolean;

  closeLogin: () => void;
  openLogin: () => void;

  closeSignup: () => void;
  openSignup: () => void;

  closeLogout: () => void;
  openLogout: () => void;

  closeOrderConfirm: () => void;
  openOrderConfirm: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isOrderConfirmOpen, setisOrderConfirmOpen] = useState(false);
  const closeLogin = () => {
    setIsLoginOpen(false);
  };
  const openLogin = () => {
    setIsLoginOpen(true);
  };

  const closeSignup = () => {
    setIsSignupOpen(false);
  };
  const openSignup = () => {
    setIsSignupOpen(true);
  };

  const closeLogout = () => {
    setIsLogoutOpen(false);
  };
  const openLogout = () => {
    setIsLogoutOpen(true);
  };

  const closeOrderConfirm = () => {
    setisOrderConfirmOpen(false);
  };
  const openOrderConfirm = () => {
    setisOrderConfirmOpen(true);
  };

  const ModalCtx = {
    isLoginOpen,
    isSignupOpen,
    isLogoutOpen,
    isOrderConfirmOpen,
    closeLogin,
    openLogin,
    closeSignup,
    openSignup,
    closeLogout,
    openLogout,
    closeOrderConfirm,
    openOrderConfirm,
  };
  return <ModalContext.Provider value={ModalCtx}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
