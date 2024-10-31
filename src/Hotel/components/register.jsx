import React, { useState } from "react";
import { InputSubmit, RegisterFormWrapper } from "../../utils/styledComponents";
import { data } from "../../utils/formdata";
import Input from "./FormComponents/input";
const Register = () => {
  const [registerFormdata, setregisterFormdata] = useState(data);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleFields = (e) => {
    const { value, id } = e.target;
    // console.log(value,id);
    const data = JSON.parse(JSON.stringify(registerFormdata));
    const fieldObj = data.find((obj, ind) => obj.id === id);
    //console.log(fieldObj);
    fieldObj.value = value;
    setregisterFormdata(data);
  };
  return (
    <React.Fragment>
      <RegisterFormWrapper>
        <form id="registerForm" onSubmit={handleSubmit}>
          {registerFormdata.map((form, ind) => {
            switch (form.tag) {
              case "input":
                return (
                  <Input key={form.field} {...form} onChange={handleFields} />
                );
              default:
                break;
            }
          })}
          <InputSubmit type="submit" value="register" />
        </form>
      </RegisterFormWrapper>
    </React.Fragment>
  );
};

export default Register;
