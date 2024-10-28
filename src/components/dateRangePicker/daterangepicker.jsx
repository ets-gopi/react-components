import React from "react";
import style from "./daterange.module.css";
import { FaCaretDown } from "react-icons/fa";
const DateDisplay = ({ label }) => {
  return (
    <React.Fragment>
      <div className={style.date_display_container}>
        {/* label for date display */}
        <label htmlFor="check_in">{label}</label>
        <p>
          <FaCaretDown />
        </p>
      </div>
    </React.Fragment>
  );
};
const Daterangepicker = () => {
  return (
    <React.Fragment>
      <DateDisplay label={"Check In"} />
      <DateDisplay label={"Check Out"} />
    </React.Fragment>
  );
};

export default Daterangepicker;
