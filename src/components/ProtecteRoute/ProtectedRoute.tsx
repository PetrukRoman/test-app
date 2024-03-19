import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext) as AuthContextType;

  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
