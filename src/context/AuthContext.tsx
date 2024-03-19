import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";

export type AuthContextType = {
  userId: string | null;
  initializing: boolean;
  token: string | null;
  logOut: () => void;
};
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initializing, setInitializing] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const id = user.uid;

        user.getIdToken().then((idToken) => {
          if (idToken) {
            setToken(idToken);
          }
        });

        setUserId(id);
      } else {
        setUserId(null);
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  const logOut = () => {
    setUserId(null);
    setToken(null);
  };

  const AuthCtx = {
    userId,
    initializing,
    token,
    logOut,
  };

  return <AuthContext.Provider value={AuthCtx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
