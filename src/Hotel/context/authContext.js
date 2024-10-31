import React, { createContext, useContext, useState } from "react";

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
  const handleRegister = () => {};
  const handleLogin = () => {};
  const handleLogout = () => {};
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
