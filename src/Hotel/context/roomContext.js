import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./authContext";

const defaultRoomInfo = {
  roomList: [],
  propertyInfoById: {},
};

// create a auth context.
const RoomContext = createContext({
  roomInfo: defaultRoomInfo,
  roomActions: {
    handleGetRoomList: () => {},
    handleGetPropertyById: () => {},
  },
});

// create custom hook foe authcontext.
export const useRoom = () => useContext(RoomContext);
// create a auth provider component.
export const RoomProvider = ({ children }) => {
  const [roomInfo, setRoomInfo] = useState(defaultRoomInfo);
  const { userInfo } = useAuth();
  const handleGetRoomList = async () => {
    const response = await axios.post(
      "http://localhost:5000/v1/api/rooms/property/:propertyId/search-rooms",
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const {
      data: { status, message, data },
    } = response;
    if (status) {
      setRoomInfo({
        ...roomInfo,
        roomList: data,
      });
      toast.success(message);
    } else {
      console.log(status, message);
      toast.error(message);
    }
  };
  const handleGetPropertyById = () => {
    //localStorage.removeItem("token");
    // setUserToken({
    //   ...userToken,
    //   isloggedIn: false,
    //   token: null,
    // });
    // toast.success("Ok");
    // navigate("/hotel-management");
  };
  return (
    <React.Fragment>
      <RoomContext.Provider
        value={{
          roomInfo: roomInfo,
          roomActions: { handleGetRoomList, handleGetPropertyById },
        }}
      >
        {children}
      </RoomContext.Provider>
    </React.Fragment>
  );
};