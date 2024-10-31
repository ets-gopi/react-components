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
};
