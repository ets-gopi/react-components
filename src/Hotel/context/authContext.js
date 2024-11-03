import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const defaultUserInfo = {
  isloggedIn: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

// create a auth context.
const AuthContext = createContext({
  userInfo: defaultUserInfo,
  userActions: {
    handleRegister: () => {},
    handleLogin: () => {},
    handleLogout: () => {},
  },
});

// create custom hook foe authcontext.
export const useAuth = () => useContext(AuthContext);
// create a auth provider component.
export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(defaultUserInfo);
  const navigate = useNavigate();
  const handleRegister = () => {};
  const handleLogin = async (logindata) => {
    const response = await axios.post(
      "http://localhost:5000/v1/api/auth/login",
      { email: logindata[0].value, password: logindata[1].value }
    );
    const {
      data: { status, message, accessToken },
    } = response;
    if (status) {
      localStorage.setItem("token", JSON.stringify(accessToken));
      setUserToken({
        ...userToken,
        isloggedIn: true,
        token: accessToken,
      });
      toast.success(message);
      navigate("get-started");
    } else {
      console.log(status, message);
      toast.error(message);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserToken({
      ...userToken,
      isloggedIn: false,
      token: null,
    });
    toast.success("Ok");
    navigate("/hotel-management");
  };
  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{
          userInfo: userToken,
          userActions: { handleLogin, handleRegister, handleLogout },
        }}
      >
        {children}
      </AuthContext.Provider>
    </React.Fragment>
  );
};
