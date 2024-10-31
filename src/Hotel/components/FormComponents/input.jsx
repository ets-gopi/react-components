import React from "react";
import { InputGroup, StyledInput } from "../../../utils/styledComponents";

const Input = (props) => {
  //console.log(props);

  return (
    <React.Fragment>
      <InputGroup>
        <label htmlFor={props.id}>{props.label}</label>
        <StyledInput
          id={props.id}
          name={props.name}
          value={props.value}
          type={props.type}
          onChange={props.onChange}
        />
      </InputGroup>
    </React.Fragment>
  );
};

export default Input;
