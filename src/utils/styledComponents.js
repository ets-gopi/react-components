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

// const Button = styled.button`
//   border: none;
//   padding: 10px 15px;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
//   font-size: 16px;
//   border-radius: 5px;
//   margin-right: 5px;
//   cursor: pointer;
//   color: aliceblue;
//   background-color: #b08e54;
// `;

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
  background-color: #b08e54;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a07a46; /* Darker shade on hover */
  }

  &:disabled {
    background-color: #ccc; /* Lighter color when disabled */
    cursor: not-allowed;
  }
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
  padding: 60px;
  // @media (max-width: 1080px) {
  //   padding: 40px;
  // }
`;
// propertyCard wrapper.
const PropertyCardWrapper = styled.div`
  border: 2px solid #000;
  border-radius: 10px;
  position: relative;
  display: flex;
  margin-bottom: 20px;
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
    padding: 10px;
    #name_container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      p {
        font-size: 30px;
      }
      label {
        font-size: 12px;
        position: relative;
        top: -9px;
        left: 5px;
      }
    }
    #description {
      font-size: 20px;
      margin-bottom: 10px;
    }
    #amenties,
    #contactInfo {
      margin-bottom: 10px;
      p {
        font-size: 18px;
      }

      ul {
        list-style-type: none;
      }
      li {
        display: inline-block;
        text-align: center;
        font-size: 16px;
        margin: 5px;
      }
      li::before {
        content: "";
        display: inline-block;
        width: 5px;
        height: 5px;
        border: 1px solid #fff;
        margin-right: 5px;
        background: #fff;
      }
    }
    #view_rooms {
      text-align: end;
      a {
        border: 1px solid #b08e54;
      }
      a:hover {
        background: #b08e54;
      }
    }
  }
  &:hover {
    border: 2px solid #b08e54;
    //box-shadow: 0 8px 16px 0 #b08e54, 0 6px 20px 0 #b08e54;
  }
  @media (max-width: 780px) {
  }
`;

// search component wrapper.
const SearchWrapper = styled.div`
  // border: 1px solid pink;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  background-color: #3b1c32;
  border-radius: 10px;
  width: 85%;
  position: relative;
  margin: auto;

  div {
    // border: 2px solid green;
    flex-basis: 25%;
    label {
      display: block;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    input {
      width: 90%;
      padding: 10px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 5px;
      outline: none;
    }

    input[type="date"] {
      cursor: pointer;
    }
    input[type="submit"] {
      cursor: pointer;
    }

    // input[type="number"] {
    //   -moz-appearance: textfield;
    // }

    // input[type="number"]::-webkit-outer-spin-button,
    // input[type="number"]::-webkit-inner-spin-button {
    //   -webkit-appearance: none;
    //   margin: 0;
    // }
  }
  #searchButton {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const RoomsWrapper = styled.div`
  //border: 1px solid red;
`;

const RoomCardWrapper = styled.div`
  border: 2px solid #000;
  border-radius: 10px;
  position: relative;
  display: flex;
  width: 85%;
  margin: 20px auto;
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
    padding: 10px;
    #name_container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      p {
        font-size: 30px;
      }
      label {
        font-size: 12px;
        position: relative;
        top: -9px;
        left: 5px;
      }
    }
    #description {
      font-size: 19px;
      margin-bottom: 10px;
    }
    #roomInfo {
      // border: 1px solid pink;
      display: flex;
      margin-bottom: 5px;

      #amenties {
        flex-basis: 50%;
        margin-bottom: 10px;
        p {
          font-size: 18px;
        }

        ul {
          list-style-type: none;
        }
        li {
          display: inline-block;
          text-align: center;
          font-size: 16px;
          margin: 5px;
        }
        li::before {
          content: "";
          display: inline-block;
          width: 5px;
          height: 5px;
          border: 1px solid #fff;
          margin-right: 5px;
          background: #fff;
        }
      }
      #capacity {
        flex-basis: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        #max {
          font-size: 23px;
        }
        div span {
          font-size: 20px;
        }
        div h2 {
          font-size: 30px;
        }
      }
    }
    #buttons {
      text-align: end;
    }
  }
  &:hover {
    border: 2px solid #b08e54;
    //box-shadow: 0 8px 16px 0 #b08e54, 0 6px 20px 0 #b08e54;
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
  SearchWrapper,
  RoomsWrapper,
  RoomCardWrapper,
};
