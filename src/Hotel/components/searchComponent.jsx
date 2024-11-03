import React, { useState } from "react";
import { Button, SearchWrapper } from "../../utils/styledComponents";
import { countdownFormat } from "../../utils/formatDate";
import { useParams } from "react-router-dom";
const SearchComponent = () => {
  const { propertyId } = useParams();
  const [searchData, setSearchData] = useState({
    checkIn: countdownFormat(new Date()),
    checkOut: "",
    totalGuests: 2,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { checkIn, checkOut, totalGuests } = searchData;
    console.log(checkIn, checkOut, totalGuests, propertyId);
  };
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
