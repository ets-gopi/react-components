import React from "react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <React.Fragment>
      <div>
        <h1>SheyHotel</h1>
        <p>"There is only one boss. The Guest</p>
        <Link to="/hotel-management/properties">Get Started</Link>
      </div>
    </React.Fragment>
  );
};

export default GetStarted;
