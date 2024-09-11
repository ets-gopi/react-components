import React, { useEffect, useRef } from 'react'
import "./style.css"
const TimeTable = () => {
    const buttonContainerRef=useRef(null);
    useEffect(()=>{
        console.log(window.getComputedStyle(buttonContainerRef.current).height);
        
    },[])
  return (
    <React.Fragment>
        <div className='time-table-container' >
            {/* Button for creating the time table */}
            <div className="button-container" ref={buttonContainerRef}>
                <button className='create-button'>create</button>
            </div>
            {/* Group container */}
            <div className="group-container">
                {/* Displaying the tasks */}
                <div className="display-tasks">
                    
                </div>
                {/* Displaying the time table */}
                <div className="time-table">

                </div>
            </div>
        </div>
       
    </React.Fragment>
  )
}

export default TimeTable;