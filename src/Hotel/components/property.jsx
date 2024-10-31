import React from "react";
import {
  PropertyCardWrapper,
  PropertyWrapper,
} from "../../utils/styledComponents";
import { a4_img } from "../../assets";
const Property = () => {
  return (
    <React.Fragment>
      <PropertyWrapper>
        {/* <div>Properties</div> */}
        <PropertyCardWrapper>
          <div id="image_container">
            <img src={a4_img} alt="" />
          </div>
          <div id="content_container"></div>
        </PropertyCardWrapper>
        <PropertyCardWrapper>
          <div id="image_container">
            <img src={a4_img} alt="" />
          </div>
          <div id="content_container"></div>
        </PropertyCardWrapper>
      </PropertyWrapper>
    </React.Fragment>
  );
};

export default Property;
