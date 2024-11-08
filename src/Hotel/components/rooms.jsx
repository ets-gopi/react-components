import React, { useEffect } from "react";
import SearchComponent from "./searchComponent";
import {
  Button,
  RoomCardWrapper,
  RoomsWrapper,
} from "../../utils/styledComponents";
import { a4_img } from "../../assets";
import { useRoom } from "../context/roomContext";
const Rooms = () => {
  const {
    roomInfo: { roomList },
  } = useRoom();
  console.log(roomList);

  return (
    <React.Fragment>
      <RoomsWrapper>
        <SearchComponent />
        {roomList.length > 0 &&
          roomList.map((room, ind) => (
            <RoomCardWrapper key={room._id}>
              <div id="image_container">
                <img src={room.thumbnailImage} alt="" />
              </div>
              <div id="content_container">
                <div id="name_container">
                  <div>
                    <p>{room.name}</p>
                    <label>{`${room.roomType}/${room.BedType}`}</label>
                  </div>
                  <div>
                    <div
                      style={{
                        color: `${room.isAvailable ? "green" : "red"}`,
                      }}
                    >
                      {room.isAvailable ? "Active" : "InActive"}
                    </div>
                  </div>
                </div>
                <div id="description">{room.description}</div>
                <div id="roomInfo">
                  <div id="amenties">
                    <p>Amenties</p>
                    <ul>
                      {room.amenities.length > 0 &&
                        room.amenities.map((am, ind) => (
                          <li key={ind}>{am}</li>
                        ))}
                    </ul>
                  </div>
                  <div id="capacity">
                    <p id="max">{`Max-capacity of ${room.maxOccupancy}`}</p>
                    <div>
                      <span>Room price</span>
                      <h2>&#8377;{room.pricePerNight}/N</h2>
                    </div>
                    <h3>{`Available Rooms : ${room.quantityAvailable}`}</h3>
                  </div>
                </div>
                <div id="buttons">
                  {room.isAvailable ? (
                    <Button>Add Room</Button>
                  ) : (
                    <Button
                      disabled
                      style={{
                        background: "#000",
                        border: "1px solid #b08e54",
                      }}
                    >
                      Add Room
                    </Button>
                  )}
                </div>
              </div>
            </RoomCardWrapper>
          ))}
      </RoomsWrapper>
    </React.Fragment>
  );
};

export default Rooms;
