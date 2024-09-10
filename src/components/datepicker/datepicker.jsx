import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import "./style.css";
import format from "../../utils/formatDate";
import years, { months, daysOfWeek } from "../../utils/displayYears";
import DisplayYears from "./displayYears";
import DisplayDates from "./displayDates";

const Datepicker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [toggleYearButton, setToggleYearButton] = useState(false);
  const [userDate,setUserDate]=useState(null);
  const [userSelectedYear, setUserSelectedYear] = useState(null);
  const [userSelectedDate, setUserSelectedDate] = useState(null);
  useEffect(() => {
    if (userSelectedYear !== null) {
      // Create a new date instance instead of mutating the current date
      const newDate = new Date(userDate ? userDate :currentDate);
      newDate.setFullYear(userSelectedYear);
      setUserDate(newDate);
    }  
  }, [userSelectedYear]);
  useEffect(() => {
    if (userSelectedDate !== null) {
      // Create a new date instance instead of mutating the current date
      const newDate = new Date(userDate ? userDate : currentDate);
      newDate.setDate(userSelectedDate);
      setUserDate(newDate);
    }  
  }, [userSelectedDate]);
  return (
    <React.Fragment>
      <div>
        <div className="main">
          {/* date-picker header */}
          <div className="date_picker_header">
            <span className="date_picker_header_text">select Date</span>
            <div className="date_picker_header_selected_date">
              <h4>{format(userDate ? userDate : currentDate)}</h4>
            </div>
          </div>
          {/* date-picker navigation container*/}
          <div style={{ position: "relative" }}>
            <div className="date_picker_navigation_bar">
              <div className="selecting_year_month">
                <span className="month">{months[userDate?userDate.getMonth():currentDate?.getMonth()]}</span>
                <span className="year">
                  {userDate?userDate.getFullYear():currentDate?.getFullYear()}
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
              {
                toggleYearButton ? null : (<div className="selecting_month">
                  <button className="month_button" onClick={() => {
                      console.log("checking the left angled button");
                      const newDate=new Date(userDate ? userDate : currentDate)
                      const month=newDate.getMonth();
                      if(month===0){
                        const year=newDate.getFullYear();
                        newDate.setFullYear(year-1);
                        newDate.setMonth(11);
                      }else{
                        newDate.setMonth(month-1);
                      }
                      
                      setUserDate(newDate)

                    }} disabled={userDate?.getMonth()===0 && userDate?.getFullYear()===2000}>
                  <FaAngleLeft/>
                  </button>
                 <button className="month_button right_angled_icon"
                    onClick={() => {
                      console.log("checking the right angled button");
                      const newDate=new Date(userDate ? userDate : currentDate)
                      const month=newDate.getMonth();
                      if(month===11){
                        const year=newDate.getFullYear();
                        newDate.setFullYear(year+1);
                        newDate.setMonth(0);
                      }else{
                        newDate.setMonth(month+1);
                      }
                      setUserDate(newDate)

                    }} disabled={userDate?.getMonth()===11 && userDate?.getFullYear()===2099}>
                 <FaAngleRight />
                 </button>
                </div>)
              }
            </div>
            {toggleYearButton ? (
              <DisplayYears
                selected_year = {userDate?userDate.getFullYear():currentDate?.getFullYear()}
                current_year={currentDate.getFullYear()}
                onHandleYear={setUserSelectedYear}
                onHandleToggleButton={setToggleYearButton}
              />
            ) : null}
            <div
              className="daysOfWeek"
            >
              {daysOfWeek.map((week, ind) => {
                return <span key={ind}>{week[0]}</span>;
              })}
            </div>
            <div
              style={{
                position: "absolute",
                top: "100px",
                color: "#fff",
                width: "100%",
              }}
            >
              <DisplayDates current_date={currentDate.getDate()}  date={userDate ? userDate : currentDate} onHandleDate={setUserSelectedDate}/>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Datepicker;
