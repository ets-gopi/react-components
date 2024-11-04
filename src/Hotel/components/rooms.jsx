import React from "react";
import SearchComponent from "./searchComponent";
import {
  Button,
  RoomCardWrapper,
  RoomsWrapper,
} from "../../utils/styledComponents";
import { a4_img } from "../../assets";
const Rooms = () => {
  return (
    <React.Fragment>
      <RoomsWrapper>
        <SearchComponent />
        <RoomCardWrapper>
          <div id="image_container">
            <img src={a4_img} alt="" />
          </div>
          <div id="content_container">
            <div id="name_container">
              <div>
                <p>{"Deluxe Suite"}</p>
                <label>{""}</label>
              </div>
              <div>
                <div>{}</div>
              </div>
            </div>
            <div id="description">
              {
                "A luxurious suite with ocean views, a spacious living area, and modern amenities."
              }
            </div>
            <div id="roomInfo">
              <div id="amenties">
                <p>Amenties</p>
                <ul>
                  <li>Free WiFi</li>
                  <li> Air Conditioning</li>
                  <li> Flat-screen TV</li>
                  <li> Flat-screen TV</li>
                </ul>
              </div>
              <div id="capacity">
                <p id="max">{"Max-capacity of 7"}</p>
                <div>
                  <span>Room price</span>
                  <h2>&#8377;7200/N</h2>
                </div>
                <h3>{"Available Rooms : 3"}</h3>
              </div>
            </div>
            <div id="buttons">
              <Button>Add Room</Button>
            </div>
          </div>
        </RoomCardWrapper>
        <RoomCardWrapper>
          <div id="image_container">
            <img src={a4_img} alt="" />
          </div>
          <div id="content_container">
            <div id="name_container">
              <div>
                <p>{"Deluxe Suite"}</p>
                <label>{""}</label>
              </div>
              <div>
                <div>{}</div>
              </div>
            </div>
            <div id="description">
              {
                "A luxurious suite with ocean views, a spacious living area, and modern amenities."
              }
            </div>
            <div id="roomInfo">
              <div id="amenties">
                <p>Amenties</p>
                <ul>
                  <li>Free WiFi</li>
                  <li> Air Conditioning</li>
                  <li> Flat-screen TV</li>
                  <li> Flat-screen TV</li>
                </ul>
              </div>
              <div id="capacity">
                <p id="max">{"Max-capacity of 7"}</p>
                <div>
                  <span>Room price</span>
                  <h2>&#8377;7200/N</h2>
                </div>
                <h3>{"Available Rooms : 3"}</h3>
              </div>
            </div>
            <div id="buttons">
              <Button>Add Room</Button>
            </div>
          </div>
        </RoomCardWrapper>
      </RoomsWrapper>
    </React.Fragment>
  );
};

export default Rooms;
