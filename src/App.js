import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Title=styled.h1
`
font-family: Karla, sans-serif;
color:white;
background: rgba(0,0,0,0.5);
cursor: pointer;
text-transform: uppercase;
font-size: 25px;
padding:20px;
text-align:center;
`

const ComponentWrapper=styled.div
`
display:flex;
flex-wrap:wrap;
gap:5px;
margin-top:5px;
`
function App() {
  return (
  <React.Fragment>
      <Title>Welcome to the App</Title>
      <ComponentWrapper>
        <Link to="/videoplayer">VideoPlayer</Link>
        <Link to="/bookkeeper">BookKeeper</Link>
        <Link to="/countdown">CountDown</Link>
        <Link to="/musicplayer">MusicPlayer</Link>
        <Link to="/hotel-management">HotelManagement</Link>

      </ComponentWrapper>
  </React.Fragment>
  );
};
export default App;
