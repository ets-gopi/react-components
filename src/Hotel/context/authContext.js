import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { countdownFormat } from "../../utils/formatDate";
const currentDatePlusOneDay = new Date();
currentDatePlusOneDay.setDate(currentDatePlusOneDay.getDate() + 1);
const defaultUserInfo = {
  isloggedIn: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  userAddRoomsList: [],
  count: 0,
  propertyId: null,
  name: null,
  email: null,
  cartInfo: [],
  userSearchDetails: {},
  guestDetails: {},
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
    handleSetCountByProperty: () => {},
    handleBookingPayload: () => {},
    handleUserSearchDetails: () => {},
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
      `${process.env.REACT_APP_API_URL}v1/api/auth/login`,
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
    const isFound = userToken.cartInfo.find(
      (room, ind) => room.roomId === selectedRoom.roomId
    );
    if (!isFound) {
      // setUserToken({
      //   ...userToken,
      //   userAddRoomsList: [...userToken.userAddRoomsList, selectedRoom],
      //   count: userToken.count + 1,
      // });
      handleUserSearchDetails({
        cartInfo: [...userToken.cartInfo, selectedRoom],
        count: userToken.count + 1,
      });
      toast.success(`${selectedRoom.roomName} added to cart.`);
    } else {
      toast.warn(`${isFound.roomName} is already exist.`);
    }
  };

  const handleRemoveRoom = (id) => {
    const remainingRooms = userToken.cartInfo.filter(
      (room, ind) => room.roomId !== id
    );
    const deleteRoom = userToken.cartInfo.find(
      (room, ind) => room.roomId === id
    );
    // setUserToken({
    //   ...userToken,
    //   userAddRoomsList: remainingRooms,
    //   count: userToken.count - deleteRoom.roomQuantity,
    // });
    handleUserSearchDetails({
      cartInfo: remainingRooms,
      count: userToken.count - deleteRoom.roomQuantity,
    });
  };

  const handleQuantity = (txt, id) => {
    switch (txt) {
      case "inc":
        console.log(id, userToken);
        const incCartRoomsInfo = userToken.cartInfo.map((room, ind) => {
          if (room.roomId === id && room.roomQuantity < room.roomsLeft) {
            room.roomQuantity = room.roomQuantity + 1;
          }
          return room;
        });
        // setUserToken({
        //   ...userToken,
        //   userAddRoomsList: incCartRoomsInfo,
        //   count: userToken.count + 1,
        // });
        handleUserSearchDetails({
          cartInfo: incCartRoomsInfo,
          count: userToken.count + 1,
        });

        break;
      case "dec":
        console.log(id, userToken);
        const decCartRoomsInfo = userToken.cartInfo.map((room, ind) => {
          if (
            room.roomId === id &&
            room.roomQuantity > 1 &&
            room.roomQuantity <= room.roomsLeft
          ) {
            room.roomQuantity = room.roomQuantity - 1;
          }
          return room;
        });
        // setUserToken({
        //   ...userToken,
        //   userAddRoomsList: decCartRoomsInfo,
        //   count: userToken.count - 1,
        // });
        handleUserSearchDetails({
          cartInfo: decCartRoomsInfo,
          count: userToken.count - 1,
        });
        break;

      default:
        break;
    }
  };

  const handleSetCountByProperty = (propertyInfo) => {
    console.log("propertyId", propertyInfo);
    const details = userToken.userSearchDetails;
    console.log(details);
    handleUserSearchDetails({
      userSearchDetails: { ...details, ...propertyInfo },
      count: 0,
      cartInfo: [],
    });
    // setUserToken((prev) => {
    //   return {
    //     ...prev,
    //     userAddRoomsList: [],
    //     count: 0,
    //   };
    // });
  };

  const handleBookingPayload = async (bookingPayload) => {
    console.log(bookingPayload);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}v1/api/bookings/property/${userToken.userSearchDetails.propertyId}/create-booking/`,
        { ...bookingPayload },
        {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGetUserDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}v1/api/auth/get-session-data`,
        {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const {
        data: { status, message, data },
      } = response;
      if (status) {
        setUserToken((prev) => {
          return {
            ...prev,
            userSearchDetails: data?.userSearchDetails,
            guestDetails: data?.guestDetails,
            cartInfo: data?.cartInfo,
            count: data?.count,
          };
        });
        toast.success(message);
      } else {
        setUserToken((prev) => {
          return {
            ...prev,
            userSearchDetails: data?.userSearchDetails,
            guestDetails: data?.guestDetails,
            cartInfo: data?.cartInfo,
            count: data?.count,
          };
        });
        toast.error(message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUserSearchDetails = async (obj) => {
    console.log("obj", obj);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}v1/api/auth/manipulate-session-data`,
        { ...obj },
        {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const {
        data: { status, message },
      } = response;
      if (status) {
        toast.success(message);
        setUserToken((prev) => {
          return {
            ...prev,
            ...obj,
          };
        });
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (userToken.isloggedIn && userToken.token) {
      handleGetUserDetails();
    }
  }, [userToken.token, userToken.isloggedIn]);
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
            handleSetCountByProperty,
            handleBookingPayload,
            handleUserSearchDetails,
            handleGetUserDetails,
          },
        }}
      >
        {children}
      </AuthContext.Provider>
    </React.Fragment>
  );
};
