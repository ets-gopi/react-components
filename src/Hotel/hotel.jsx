import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  HotelBodyWrapper,
  HotelHeaderWrapper,
  HotelWrapper,
} from "../utils/styledComponents";

const Hotel = () => {
  return (
    <React.Fragment>
      <HotelWrapper>
        <HotelHeaderWrapper>
          <h2>SheyHotels</h2>
          <div>
            <Link id="register-link" className="register-link" to="register">
              register
            </Link>
            <Link id="login-link" className="login-link" to="login">
              login
            </Link>
          </div>
        </HotelHeaderWrapper>
        <HotelBodyWrapper>
          <Outlet />
        </HotelBodyWrapper>
      </HotelWrapper>
    </React.Fragment>
  );
};

export default Hotel;
