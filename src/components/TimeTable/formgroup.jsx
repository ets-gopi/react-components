import style from "./timetable.module.css";
import React from "react";
const FormGroup=({label,type,name,handleTT,value})=>{
    return (<React.Fragment>
         <div className={`${style.input_group}`}>
            <div className={`${style.input_group_item1}`}>
                <label htmlFor={name}>{label}</label>
            </div>
            <div className={`${style.input_group_item2}`}>
                <input type={type} name={name} id={name} placeholder={`${name==="duration"? "enter days":""}`} onChange={(e)=>{
                    handleTT(e);
                }} value={value}/>
            </div>
        </div>
    </React.Fragment>)
};
export default FormGroup;