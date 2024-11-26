import React, { useEffect, useState } from "react";
import { Button, SearchWrapper } from "../../utils/styledComponents";
import { countdownFormat } from "../../utils/formatDate";
import { useParams } from "react-router-dom";
import { useRoom } from "../context/roomContext";
import { useAuth } from "../context/authContext";
const SearchComponent = () => {
  const { propertyId } = useParams();
  const { roomActions } = useRoom();
  const { userInfo, userActions } = useAuth();
  const [searchData, setSearchData] = useState(userInfo.userSearchDetails);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { checkIn, checkOut, totalGuests } = searchData;
    await userActions.handleUserSearchDetails({
      userSearchDetails: {
        ...searchData,
        checkIn,
        checkOut,
        totalGuests,
        propertyId: propertyId,
      },
    });
  };
  useEffect(() => {
    const fetchRoomsInfo = async () => {
      if (searchData.checkIn && searchData.checkOut && searchData.propertyId) {
        const { checkIn, checkOut } = searchData;
        await roomActions.handleGetRoomList({
          checkIn,
          checkOut,
          propertyId: propertyId,
        });
      }
    };
    fetchRoomsInfo();
  }, [searchData]);
  
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <SearchWrapper>
          <div>
            <label htmlFor="checkIn">CheckIn</label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={searchData.checkIn}
              min={countdownFormat(new Date())}
              onChange={(e) => {
                setSearchData({
                  ...searchData,
                  checkIn: e.target.value,
                });
              }}
              required
            />
          </div>
          <div>
            <label htmlFor="checkOut">CheckOut</label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={searchData.checkOut}
              onChange={(e) => {
                setSearchData({
                  ...searchData,
                  checkOut: e.target.value,
                });
              }}
              min={countdownFormat(new Date(searchData.checkIn))}
              required
            />
          </div>
          <div>
            <label htmlFor="totalGuests">totalGuests</label>
            <input
              type="number"
              id="totalGuests"
              name="totalGuests"
              value={searchData.totalGuests}
              onChange={(e) => {
                setSearchData({
                  ...searchData,
                  totalGuests: e.target.value,
                });
              }}
              min={0}
              max={15}
              required
            />
          </div>
          <div id="searchButton">
            <input type="submit" value="SearchRooms" />
          </div>
        </SearchWrapper>
      </form>
    </React.Fragment>
  );
};

export default SearchComponent;
