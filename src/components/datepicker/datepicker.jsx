import React, { useState } from 'react'
import "./style.css";
import format from '../../utils/formatDate';
const Datepicker = () => {
    const [currentDtae,setCurrentDate]=useState(new Date());
  return (<React.Fragment>
 <div>
    <div className='main'>
        {/* header */}
        <div className='header'>
            <span className='header_text'>select Date</span>
            <div className='selected_date'>
                <h4>{format(currentDtae)}</h4>
            </div>
        </div>
        {/* selecting the year and month */}
        <div>   
        </div>
    </div>

</div>
  </React.Fragment>
   
  )
}
export default Datepicker
