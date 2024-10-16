import React, { useEffect, useState } from "react";
import style from "./timetable.module.css";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { daysOfWeek, months } from "../../utils/displayYears";
import format from "../../utils/formatDate";
import DateDisplay from "./dateDisplay";


const CalendarView = ({ date, duration }) => {
  //console.log(date, duration);
  const [userDate, setUserDate] = useState(null);
  const [dates, setDates] = useState([]);
  const [userEndDate,setUserEndDate]=useState(null);
  const [userStartDate,setUserStartDate]=useState(null);
  const handleMonths=(name)=>{
    const date=new Date(userDate);
    const userstartdate=new Date(userStartDate);
    const userenddate=new Date(userEndDate);

    //current details of date
    const month=date.getMonth();
    const year=date.getFullYear();

    // end date of specfic user
    const e_month=userenddate.getMonth();
    const e_year=userenddate.getFullYear();
    const e_date=userenddate.getDate();

    // start date of a specific user
    const s_month=userstartdate.getMonth();
    const s_year=userstartdate.getFullYear();
    //console.log("s_month",s_month,"month",month,"e_month",e_month);
    
    switch(name){
      case "prev":
        if((month > s_month && year === s_year) || (year > s_year)){
          date.setMonth(month-1);
          setUserDate(date);
        }
        break;
      case "next":
        if((month < e_month && year === e_year) || (year < e_year)){
          date.setMonth(month+1);
          setUserDate(date);
        }
        break;
      default :
        console.log("Unknown");
    }
  }
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
    const userenddate=new Date(date);
    userenddate.setDate(userenddate.getDate() + Number(duration) -1);
    setUserDate(newDate);
    setUserEndDate(userenddate);
    setUserStartDate(newDate);
  }, [date, duration]);

  return (
    <React.Fragment>
      <div className={style.calendar_view}>
        <div className={style.calendar_view_header}>
          {/* button container for separating months */}
          <div className={style.cv_months}>
            <button disabled={userStartDate?.getMonth()===userDate?.getMonth() && userStartDate?.getFullYear()===userDate?.getFullYear()}>
              <FaAngleLeft onClick={()=>{
                handleMonths("prev");
              }}/>
            </button>
            <button disabled={userDate?.getMonth()===userEndDate?.getMonth()}>
              <FaAngleRight onClick={()=>{
                handleMonths("next");
              }}/>
            </button>
          </div>

          {/* container for display the userSelected Date */}
          <div className={style.cv_selected_date}>
            {format(new Date())}
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
                <DateDisplay key={ind} date={date} userDate={userDate} startDate={userStartDate} endDate={userEndDate} duration={duration} />
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CalendarView;
