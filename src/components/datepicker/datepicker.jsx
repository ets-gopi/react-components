import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import "./style.css";
import format from "../../utils/formatDate";
import years, { months, daysOfWeek } from "../../utils/displayYears";
import DisplayYears from "./displayYears";

const Datepicker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [toggleYearButton, setToggleYearButton] = useState(false);
  const [userSelectedYear, setUserSelectedYear] = useState(null);
  console.log("years", years, months);
  useEffect(() => {
    if (userSelectedYear !== null) {
         // Create a new date instance instead of mutating the current date
      const newDate = new Date(currentDate);
      newDate.setFullYear(userSelectedYear);
      setCurrentDate(newDate);
    }
  }, [userSelectedYear]);

  return (
    <React.Fragment>
      <div>
        <div className="main">
          {/* date-picker header */}
          <div className="date_picker_header">
            <span className="date_picker_header_text">select Date</span>
            <div className="date_picker_header_selected_date">
              <h4>{format(currentDate)}</h4>
            </div>
          </div>
          {/* date-picker navigation container*/}
          <div style={{ position: "relative" }}>
            <div className="date_picker_navigation_bar">
              <div className="selecting_year_month">
                <span className="month">{months[currentDate?.getMonth()]}</span>
                <span className="year">
                  {userSelectedYear
                    ? userSelectedYear
                    : currentDate?.getFullYear()}
                </span>
                <span>
                  {toggleYearButton ? (
                    <FaCaretUp
                      onClick={() => {
                        setToggleYearButton(!toggleYearButton);
                      }}
                    />
                  ) : (
                    <FaCaretDown
                      onClick={() => {
                        setToggleYearButton(!toggleYearButton);
                      }}
                    />
                  )}
                </span>
              </div>
              <div className="selecting_month">
                <FaAngleLeft
                  onClick={() => {
                    console.log("checking the left angled button");
                  }}
                />
                <FaAngleRight
                  className="right_angled_icon"
                  onClick={() => {
                    console.log("checking the right angled button");
                  }}
                />
              </div>
            </div>
            {toggleYearButton ? (
              <DisplayYears
                selected_year={
                  userSelectedYear
                    ? userSelectedYear
                    : currentDate.getFullYear()
                }
                onHandleYear={setUserSelectedYear}
                onHandleToggleButton={setToggleYearButton}
              />
            ) : null}
            <div
              style={{
                position: "absolute",
                top: "50px",
                color: "#fff",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {daysOfWeek.map((week, ind) => {
                return <span key={ind}>{week[0]}</span>;
              })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Datepicker;
