import React, { useEffect } from "react";
import SearchComponent from "./searchComponent";
import {
  Button,
  RoomCardWrapper,
  RoomsWrapper,
} from "../../utils/styledComponents";
import { useRoom } from "../context/roomContext";
import { useAuth } from "../context/authContext";
const Rooms = () => {
  const {
    roomInfo: { roomList },
  } = useRoom();
  const { userActions } = useAuth();
  // console.log(roomList,userAddRoomsList);

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
                    <h3>{`Available Rooms : ${room.roomsLeft}`}</h3>
                  </div>
                </div>
                <div id="buttons">
                  {room.isAvailable ? (
                    <Button
                      onClick={() => {
                        const obj = {
                          roomId: room._id,
                          roomName: room.name,
                          guestsPerRoom: room.maxOccupancy,
                          roomPrice: room.pricePerNight,
                          roomQuantity: 1,
                          thumbnailImage: room.thumbnailImage,
                          bedType: room.BedType,
                          roomType: room.roomType,
                          beds_count: room.numberOfBeds,
                          roomsLeft: room.roomsLeft,
                        };
                        userActions.handleUserSelectedRoom(obj);
                      }}
                    >
                      Add Room
                    </Button>
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
