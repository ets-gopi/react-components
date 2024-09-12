import React, {useState } from 'react';
import style from "./timetable.module.css";
import Button from '../button';
import Modal from '../modal/modal';
const FormGroup=({label,type,name})=>{
    return (<React.Fragment>
         <div className={`${style.input_group}`}>
            <div className={`${style.input_group_item1}`}>
                <label htmlFor={name}>{label}</label>
            </div>
            <div className={`${style.input_group_item2}`}>
                <input type={type} name={name} id={name} placeholder={`${name==="duration"? "enter days":""}`}/>
            </div>
        </div>
    </React.Fragment>)
}
const TimeTable = () => {
    const [isModal,setIsModal]=useState(false);
    const handleShow=()=>{
        setIsModal(true);
    }
    const handleClose=()=>{
        setIsModal(false);
    }
  return (
    <React.Fragment>
        <div className={`${style.time_table_container}`} >
            {/* Button for creating the time table */}
            <div className={`${style.button_container}`}>
                <button className={`${style.create_button}`} onClick={handleShow}>create</button>
            </div>
            {/* Group container */}
            <div className={`${style.group_container}`}>
                {/* Displaying the tasks */}
                <div className={`${style.display_tasks}`}>
                    
                </div>
                {/* Displaying the time table */}
                <div className={`${style.time_table}`}>

                </div>
            </div>
        </div>
        <Modal show={isModal} onHide={handleClose}>
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title>TimeTable</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div>
                    <FormGroup type={"date"} name={"start-date"} label={"StartDate"}/>
                    <FormGroup type={"text"} name={"purpose"} label={"Purpose"}/>
                    <FormGroup type={"number"} name={"duration"} label={"Duration"}/>
                </div>   
            </Modal.Body>
            <Modal.Footer>
                <Button type={"button"} style={{backgroundColor:"#5C636A",color:"white",marginRight:"5px"}} onClick={handleClose}>close</Button>
                <Button type={"button"} style={{backgroundColor:"#0B5ED7",color:"white"}}>create</Button>
            </Modal.Footer>
        </Modal>
    </React.Fragment>
  )
}

export default TimeTable;