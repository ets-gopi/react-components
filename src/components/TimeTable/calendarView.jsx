import React, { useEffect, useState } from "react";
import style from "./timetable.module.css";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { daysOfWeek, months } from "../../utils/displayYears";
const CalendarView = ({ date, duration }) => {
  console.log(date, duration);
  const [userDate, setUserDate] = useState(null);
  const [dates, setDates] = useState([]);
  useEffect(() => {
    if (userDate !== null) {
      const year = new Date(userDate).getFullYear();
      const month = new Date(userDate).getMonth();
      const date = new Date(userDate).getDate();
      // get the firstDay of the week
      const firstDay = new Date(year, month, 1).getDay();
      // get the last Date of the month
      const endDate = new Date(year, month + 1, 0).getDate();
      console.log(year, month, date, firstDay, endDate);
      let da = [];
      for (let week = 0; week < firstDay; week++) {
        da.push("");
      }
      // dates displaying
      for (let day = 1; day <= endDate; day++) {
        da.push(day);
      }
      setDates(da);
    }
  }, [userDate]);
  useEffect(() => {
    const newDate = new Date(date);
    setUserDate(newDate);
  }, [date, duration]);

  return (
    <React.Fragment>
      <div className={style.calendar_view}>
        <div className={style.calendar_view_header}>
          {/* button container for separating months */}
          <div className={style.cv_months}>
            <button>
              <FaAngleLeft />
            </button>
            <button>
              <FaAngleRight />
            </button>
          </div>
          {/* container for displaying the month and year */}
          <div className={style.cv_year_month}>
            <strong>
              {months[userDate?.getMonth()]} {userDate?.getFullYear()}
            </strong>
          </div>
        </div>
        {/* calendaer veiw Display */}
        <div className={style.calendar_view_display}>
          {/* Days of the Week */}
          <div className={style.cv_days_of_week}>
            {daysOfWeek.map((name, ind) => {
              return <button key={ind}>{name[0]}</button>;
            })}
          </div>
          {/* Dates of the month */}
          <div className={style.cv_dates_of_month}>
            {dates?.map((date, ind) => {
              return (
                <button
                  key={ind}
                  className={`${
                    date === new Date(userDate).getDate() ? style.selected : ""
                  }`}
                >
                  {date}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CalendarView;
