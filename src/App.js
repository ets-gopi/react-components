import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Title = styled.h1`
  font-family: Karla, sans-serif;
  color: white;
  background: #0c134f;
  text-transform: uppercase;
  font-size: 25px;
  text-align: center;
  height: 15%;
  padding: 30px 0;
`;

const Wrapper = styled.div`
  height: 85%;
  background: #1d267d;
  padding: 10px;
`;
const ComponentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;
function App() {
  return (
    <React.Fragment>
      <Title>Welcome to the World of React Components.</Title>
      <Wrapper>
        <ComponentWrapper>
          <Link to="/videoplayer" id="videoplayer" className="videoplayer">
            VideoPlayer
          </Link>
          <Link to="/bookkeeper" id="bookkeeper" className="bookkeeper">
            BookKeeper
          </Link>
          <Link to="/countdown" id="countdown" className="countdown">
            CountDown
          </Link>
          <Link to="/musicplayer" id="musicplayer" className="musicplayer">
            MusicPlayer
          </Link>
          <Link
            to="/hotel-management"
            id="hotel-management"
            className="hotel-management"
          >
            HotelManagement
          </Link>
        </ComponentWrapper>
      </Wrapper>
    </React.Fragment>
  );
}
export default App;
