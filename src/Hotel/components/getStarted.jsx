import React from "react";
import { Link } from "react-router-dom";
import { GetStartedWrapper } from "../../utils/styledComponents";

const GetStarted = () => {
  return (
    <React.Fragment>
      <GetStartedWrapper>
        <h1>SheyHotel</h1>
        <p>"There is only one boss. The Guest</p>
        <Link to="/hotel-management/properties">Get Started</Link>
      </GetStartedWrapper>
    </React.Fragment>
  );
};

export default GetStarted;
