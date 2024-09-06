import React, { useState } from 'react'
import "./style.css";
import format from '../../utils/formatDate';
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
const Datepicker = () => {
    const [currentDtae,setCurrentDate]=useState(new Date());
    const [toggleYearButton,setToggleYearButton]=useState(false)
  return (<React.Fragment>
 <div>
    <div className='main'>
        {/* date-picker header */}
        <div className='date_picker_header'>
            <span className='date_picker_header_text'>select Date</span>
            <div className='date_picker_header_selected_date'>
                <h4>{format(currentDtae)}</h4>
            </div>
        </div>
        {/* date-picker navigation container*/}
        <div style={{position:"relative"}}>
        <div className='date_picker_navigation_bar'>
            <div className='selecting_year_month'>
                <span className="month">September</span>
                <span className="year"> 2024</span>
                <span>{toggleYearButton ?<FaCaretUp onClick={()=>{setToggleYearButton(!toggleYearButton)
                }}/>:<FaCaretDown onClick={()=>{setToggleYearButton(!toggleYearButton)
                }}/>}</span> 
            </div>   
            <div className='selecting_month'>
                <FaAngleLeft onClick={()=>{
                    console.log("checking the left angled button");
                    
                }}/><FaAngleRight className='right_angled_icon' onClick={()=>{
                    console.log("checking the right angled button");
                    
                }}/>
            </div>
        </div>
        {
        toggleYearButton ? <div className='display_year_container'>
                    checking
                </div>:null
        }
         <div style={{position:"absolute",top:"25px",color:"#fff"}}>wjhdjhdkhdk</div>
        </div>
       

        

    </div>

</div>
  </React.Fragment>
   
  )
}
export default Datepicker
