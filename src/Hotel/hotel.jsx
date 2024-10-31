import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  HotelBodyWrapper,
  HotelHeaderWrapper,
  HotelWrapper,
} from "../utils/styledComponents";
import { AuthProvider, useAuth } from "./context/authContext";

const Hotel = () => {
  const { userInfo} = useAuth();
  //console.log(userInfo);

  return (
    <React.Fragment>
      <AuthProvider>
        <HotelWrapper>
          <HotelHeaderWrapper>
            <h2>SheyHotels</h2>
            {!userInfo.isloggedIn && (
              <div>
                <Link
                  id="register-link"
                  className="register-link"
                  to="register"
                >
                  register
                </Link>
                <Link id="login-link" className="login-link" to="login">
                  login
                </Link>
              </div>
            )}
          </HotelHeaderWrapper>
          <HotelBodyWrapper>
            <Outlet />
          </HotelBodyWrapper>
        </HotelWrapper>
      </AuthProvider>
    </React.Fragment>
  );
};

export default Hotel;
