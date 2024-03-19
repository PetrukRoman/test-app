import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Login from "../../components/Login/Login";
import Logout from "../../components/Logout/Logout";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import Loader from "../../components/Loader/Loader";
import SignUp from "../../components/SignUp/SignUp";

const Root = () => {
  const { initializing } = useContext(AuthContext) as AuthContextType;
  if (initializing) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>

      {/* Modals */}
      <Login />
      <Logout />
      <SignUp />
    </>
  );
};

export default Root;
