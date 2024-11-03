import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./authContext";

const defaultPropertyInfo = {
  propertyList: [],
  propertyInfoById: {},
};

// create a auth context.
const PropertyContext = createContext({
  propertyInfo: defaultPropertyInfo,
  propertyActions: {
    handleGetPropertyList: () => {},
    handleGetPropertyById: () => {},
  },
});

// create custom hook foe authcontext.
export const useProperty = () => useContext(PropertyContext);
// create a auth provider component.
export const PropertyProvider = ({ children }) => {
  const [propertyInfo, setPropertyInfo] = useState(defaultPropertyInfo);
  const { userInfo } = useAuth();
  const handleGetPropertyList = async () => {
    const response = await axios.get(
      "http://localhost:5000/v1/api/properties/",
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
      setPropertyInfo({
        ...propertyInfo,
        propertyList: data,
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
  useEffect(() => {
    const fetchPropertyList = async () => {
      await handleGetPropertyList();
    };
    fetchPropertyList();
  }, []);
  return (
    <React.Fragment>
      <PropertyContext.Provider
        value={{
          propertyInfo: propertyInfo,
          propertyActions: { handleGetPropertyList, handleGetPropertyById },
        }}
      >
        {children}
      </PropertyContext.Provider>
    </React.Fragment>
  );
};
