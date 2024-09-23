import React, { useEffect, useState } from 'react'
import style from "./timetable.module.css";
const DateDisplay = ({date,userDate,startDate,endDate}) => {
    const [progress,setProgress]=useState(10);
    console.log(date,userDate,startDate,endDate);
    const s_month=new Date(startDate).getMonth();
    const s_date=new Date(startDate).getDate();
    const s_year=new Date(startDate).getFullYear();

    const e_month=new Date(endDate).getMonth();
    const e_date=new Date(endDate).getDate();
    const e_year=new Date(endDate).getFullYear();

    const this_month=new Date(userDate).getMonth();
    const this_date=new Date(userDate).getDate();
    const this_year=new Date(userDate).getFullYear();

    // current Date Info
    const today=new Date();
    const today_month = today.getMonth();
    const today_date= today.getDate();
    const today_year = today.getFullYear();


    const isDisabled= (this_month === s_month && date < this_date && this_year===s_year) || (this_month===e_month && date > e_date && this_year === e_year);

    // get the startDate and endDate for the user duration
    const start_date=this_month===s_month && date === s_date && this_year===s_year;
    const end_date=this_month===e_month && date === e_date && this_year===e_year;

    const isCurrentDate= date === today_date && this_month === today_month && this_year === today_year;
    
    // buttonClass
    let buttonClass = style.enabled;
    if(start_date){
        buttonClass=style.startDate;
    }else if(end_date){
        buttonClass=style.endDate;
    }else if(isDisabled){
        buttonClass=style.disabled;
    }else if(isCurrentDate){
        buttonClass=style.currentDate;
    }
    useEffect(()=>{
        
    })
    
  return (
    <React.Fragment>
        <button className={buttonClass}
        disabled={isDisabled}>
            {date}
            {isCurrentDate && (
                    <div className={style.progressBar}>
                        <div
                            className={style.progress}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}
        </button>
    </React.Fragment>
  )
}

export default DateDisplay;