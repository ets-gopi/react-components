import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const defaultUserInfo = {
  isloggedIn: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  userAddRoomsList: [],
  count: 0,
};

// create a auth context.
const AuthContext = createContext({
  userInfo: defaultUserInfo,
  userActions: {
    handleRegister: () => {},
    handleLogin: () => {},
    handleLogout: () => {},
    handleUserSelectedRoom: () => {},
    handleQuantity: () => {},
    handleRemoveRoom: () => {},
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
  const handleUserSelectedRoom = (selectedRoom) => {
    //console.log(selectedRoom, "selectedRoom");
    const isFound = userToken.userAddRoomsList.find(
      (room, ind) => room.roomId === selectedRoom.roomId
    );
    if (!isFound) {
      setUserToken({
        ...userToken,
        userAddRoomsList: [...userToken.userAddRoomsList, selectedRoom],
        count: userToken.count + 1,
      });
    } else {
      toast.warn(`${isFound.roomName} is already exist.`);
    }
  };

  const handleRemoveRoom = (id) => {
    const remainingRooms = userToken.userAddRoomsList.filter(
      (room, ind) => room.roomId !== id
    );
    setUserToken({
      ...userToken,
      userAddRoomsList: remainingRooms,
      count: userToken.count - 1,
    });
  };
  const handleQuantity = (txt) => {
    switch (txt) {
      case "inc":
        break;
      case "dec":
        break;

      default:
        break;
    }
  };

  // useEffect(() => {
  //   if (userToken.isloggedIn) {
  //     navigate("/hotel-management/get-started");
  //   } else {
  //     navigate("/hotel-management");
  //   }
  // }, [userToken.isloggedIn]);
  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{
          userInfo: userToken,
          userActions: {
            handleLogin,
            handleRegister,
            handleLogout,
            handleUserSelectedRoom,
            handleQuantity,
            handleRemoveRoom,
          },
        }}
      >
        {children}
      </AuthContext.Provider>
    </React.Fragment>
  );
};
