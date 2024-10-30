import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
const HotelWrapper = styled.div`
  background-color: #050f10;
  min-height: 100vh;
  color: #b08e54;
`;
const HotelHeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  /* border: 1px solid white; */
  align-items: center;
  padding: 15px;
`;
const Button = styled.button`
  border: none;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
  color: aliceblue;
`;
const Hotel = () => {
  return (
    <React.Fragment>
      <HotelWrapper>
        <HotelHeaderWrapper>
          <h2>SheyHotels</h2>
          <div>
            <Link id="register-link" className="register-link" to="register">register</Link>
            <Link id="login-link" className="login-link"to="login">login</Link>
          </div>
        </HotelHeaderWrapper>
        <Outlet />
      </HotelWrapper>
    </React.Fragment>
  );
};

export default Hotel;
