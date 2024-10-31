import styled from "styled-components";

const HotelWrapper = styled.div`
  //   border: 2px solid green;
  background-color: #050f10;
  min-height: 100vh;
  color: #b08e54;
`;
const HotelHeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  /* border: 1px solid white; */
  align-items: center;
  padding: 15px;
  #title {
    font-size: 25px;
    color: #b08e54;
    font-weight: bold;
  }
`;
const HotelBodyWrapper = styled.div`
  //   border: 1px solid blue;
  position: relative;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  border: none;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
  color: aliceblue;
`;

// register components styles
const RegisterFormWrapper = styled.div`
  //   border: 1px solid red;
  width: 500px;
  margin: auto;
`;

// input group
const InputGroup = styled.div`
  margin-bottom: 15px;
  label {
    font-size: 18px;
  }
  input {
    margin-top: 5px;
  }
`;

// input submit tag
const InputSubmit = styled.input.attrs({ type: "submit" })`
  border: none;
  text-transform: uppercase;
  background-color: #b08e54;
  color: #fff;
  cursor: pointer;
  outline: none;
  border-radius: 5px;
  padding: 10px 20px;
`;
const LoginFormWrapper = styled.div`
  //   border: 1px solid red;
  width: 500px;
  margin: auto;
`;

// get-started component wrapper.
const GetStartedWrapper = styled.div`
  // border: 1px solid red;
  padding-top: 150px;
  text-align: center;
  h1 {
    font-size: 130px;
    margin-bottom: 10px;
    @media (max-width: 768px) {
      font-size: 80px; /* Smaller font size on smaller screens */
    }
  }
  p {
    margin-bottom: 10px;
  }
  a {
    border: 1px solid #b08e54;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    padding-top: 80px; /* Reduce padding on smaller screens */
  }
  @media (max-width: 480px) {
    padding-top: 50px; /* Further reduce padding for extra small screens */
    h1 {
      font-size: 40px; /* Even smaller font size on very small screens */
    }
  }
`;
// property wrapper
const PropertyWrapper = styled.div`
  // border: 1px solid red;
  position: relative;
  padding: 50px;
`;
// propertyCard wrapper.
const PropertyCardWrapper = styled.div`
  border: 2px solid #000;
  border-radius: 10px;
  position: relative;
  display: flex;
  margin-bottom: 10px;
  #image_container {
    // border: 1px solid green;
    flex-basis: 25%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
  #content_container {
    // border: 1px solid pink;
    flex-basis: 75%;
  }
  &:hover {
    border: 2px solid #b08e54;
  }
`;
export {
  StyledInput,
  HotelHeaderWrapper,
  HotelWrapper,
  HotelBodyWrapper,
  Button,
  RegisterFormWrapper,
  LoginFormWrapper,
  InputGroup,
  InputSubmit,
  GetStartedWrapper,
  PropertyWrapper,
  PropertyCardWrapper,
};
