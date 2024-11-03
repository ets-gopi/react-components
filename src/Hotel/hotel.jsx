import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  HotelBodyWrapper,
  HotelHeaderWrapper,
  HotelWrapper,
  Button,
} from "../utils/styledComponents";
import { useAuth } from "./context/authContext";

const Hotel = () => {
  const { userInfo, userActions } = useAuth();
  //console.log(userInfo);

  return (
    <React.Fragment>
      <HotelWrapper>
        <HotelHeaderWrapper>
          {userInfo.isloggedIn ? (
            <Link to="/hotel-management/get-started" id="title">
              SheyHotel
            </Link>
          ) : (
            <h2>SheyHotel</h2>
          )}
          {userInfo.isloggedIn ? (
            <Button
              onClick={() => {
                userActions.handleLogout();
              }}
            >
              Logout
            </Button>
          ) : (
            <div>
              <Link id="register-link" className="register-link" to="register">
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
    </React.Fragment>
  );
};

export default Hotel;
