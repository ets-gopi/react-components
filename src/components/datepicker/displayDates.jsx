import React, { useEffect } from 'react'
import './style.css'
const DisplayDates = ({date}) => {
    useEffect(()=>{
        //console.log("display Dates",date);
        const month=date.getMonth();
        const year=date.getFullYear();
        const currentdate=date.getDate();
        console.log(year,month,currentdate);

        // get the firstDay and endDate of the month.
        const firstDay=new Date(year,month,1).getDay();
        const endDate=new Date(year,month+1,0).getDate();
        console.log(firstDay,endDate);

        // clear the pervious days
        const calendarDays=document.getElementById("calendar-days");
        calendarDays.innerHTML="";

        // add spaces to the calendar-days if the first day of the month does not starts from sunday
        for(let week=0;week<firstDay;week++){
            const emptyCell=document.createElement("span");
            calendarDays.appendChild(emptyCell);
        }
        // then add the dates to the calendar-days
        for(let date=1;date<=endDate;date++){
            const dayCell=document.createElement("span");
            dayCell.innerText=date;
            if(date===currentdate){
                dayCell.classList.add("selected");
            }
            calendarDays.appendChild(dayCell);
        }
        
           
    },[date])
    
  return (
    <React.Fragment>
        <div id='calendar-days'>
        </div>
    </React.Fragment>
  )
}

export default DisplayDates