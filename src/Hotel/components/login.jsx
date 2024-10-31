import React, { useState } from "react";
import { InputSubmit, LoginFormWrapper } from "../../utils/styledComponents";
import { loginData } from "../../utils/formdata";
import Input from "./FormComponents/input";

const Login = () => {
  const [logindata, setlogindata] = useState(loginData);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleFields = (e) => {
    const { value, id } = e.target;
    // console.log(value,id);
    const data = JSON.parse(JSON.stringify(logindata));
    const fieldObj = data.find((obj, ind) => obj.id === id);
    //console.log(fieldObj);
    fieldObj.value = value;
    setlogindata(data);
  };
  return (
    <React.Fragment>
      <LoginFormWrapper>
        <form id="loginForm" onSubmit={handleSubmit}>
          {logindata.map((form, ind) => {
            switch (form.tag) {
              case "input":
                return (
                  <Input key={form.field} {...form} onChange={handleFields} />
                );
              default:
                break;
            }
          })}
          <InputSubmit type="submit" value="login" />
        </form>
      </LoginFormWrapper>
    </React.Fragment>
  );
};

export default Login;
