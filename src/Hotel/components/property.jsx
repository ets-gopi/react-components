import React from "react";
import {
  PropertyCardWrapper,
  PropertyWrapper,
} from "../../utils/styledComponents";
import { a4_img } from "../../assets";
import { Link } from "react-router-dom";
const Property = () => {
  return (
    <React.Fragment>
      <PropertyWrapper>
        {/* <div>Properties</div> */}
        <PropertyCardWrapper>
          <div id="image_container">
            <img src={a4_img} alt="" />
          </div>
          <div id="content_container">
            <div id="name_container">
              <p>Serenity Hills Hotel</p>
              <label>321 Tranquil Road,Munnar,Kerala,India,685612.</label>
            </div>
            <div id="description">
              A peaceful retreat surrounded by tea gardens, ideal for relaxation
              and nature walks.
            </div>
            <div id="amenties">
              <p>Amenties</p>
              <ul>
                <li>spa</li>
                <li>tea garden tours</li>
                <li>restaurant</li>
                <li>free wifi</li>
              </ul>
            </div>
            <div id="contactInfo">
              <p>ContactInfo</p>
              <ul>
                <li>09087654321</li>
                <li>info@serenityhillshotel.com</li>
                <li>https://serenityhillshotel.com</li>
              </ul>
            </div>
            <div id="view_rooms">
              <Link to="/hotel-management/properties/:propertyId/rooms">
                View Rooms
              </Link>
            </div>
          </div>
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
