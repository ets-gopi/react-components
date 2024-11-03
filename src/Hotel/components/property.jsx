import React from "react";
import {
  Button,
  PropertyCardWrapper,
  PropertyWrapper,
} from "../../utils/styledComponents";
import { Link } from "react-router-dom";
import { useProperty } from "../context/propertyContext";
const Property = () => {
  const { propertyInfo } = useProperty();
  console.log(propertyInfo);

  return (
    <React.Fragment>
      <PropertyWrapper>
        {/* <div>Properties</div> */}
        {propertyInfo.propertyList?.map((property, ind) => {
          return (
            <PropertyCardWrapper key={property.id}>
              <div id="image_container">
                <img src={property.thumbnailImage} alt="" />
              </div>
              <div id="content_container">
                <div id="name_container">
                  <div>
                    <p>{property.name}</p>
                    <label>{`${property.location?.address}, ${property.location?.city}, ${property.location?.state}, ${property.location?.country}, ${property.location?.postalCode}`}</label>
                  </div>
                  <div>
                    <div
                      style={{
                        color: `${
                          property.availabilityStatus ? "green" : "red"
                        }`,
                      }}
                    >
                      {property.availabilityStatus ? "Active" : "InActive"}
                    </div>
                  </div>
                </div>
                <div id="description">{property.description}</div>
                <div id="amenties">
                  <p>Amenties</p>
                  <ul>
                    {property.amenities?.map((am, ind) => {
                      return <li key={ind}>{am}</li>;
                    })}
                  </ul>
                </div>
                <div id="contactInfo">
                  <p>ContactInfo</p>
                  <ul>
                    <li>{property.contactInfo.phone}</li>
                    <li>{property.contactInfo.email}</li>
                    <li>{property.contactInfo.website}</li>
                  </ul>
                </div>
                <div id="view_rooms">
                  {property.availabilityStatus ? (
                    <Link
                      to={`/hotel-management/properties/${property.id}/rooms`}
                    >
                      View Rooms
                    </Link>
                  ) : (
                    <Button
                      disabled
                      style={{
                        background: "#000",
                        border: "1px solid #b08e54",
                      }}
                    >
                      View Rooms
                    </Button>
                  )}
                </div>
              </div>
            </PropertyCardWrapper>
          );
        })}
      </PropertyWrapper>
    </React.Fragment>
  );
};

export default Property;
