import React from 'react'
import style from "./modal.module.css";
import { IoCloseSharp } from "react-icons/io5";
const Modal = ({show,children,onHide}) => {
    if(!show){
        return null;
    }
  return (<React.Fragment>
    <div className={`${style.modal_overlay}`} onClick={onHide}>
        <div className={`${style.modal_dialog}`} onClick={(event)=>{event.stopPropagation();}}>
            {children}  
        </div>
    </div>
    
  </React.Fragment>
  )
}
Modal.Header=({closeButton,children,onHide})=>{
    return <React.Fragment>
        <div className={`${style.modal_header}`}>
            {children}
            {
                closeButton && <IoCloseSharp onClick={onHide} style={{cursor:"pointer"}}/>
            }
            
        </div>
    </React.Fragment>
}
Modal.Title=({children})=>{
    return <React.Fragment>
        <h2 className={`${style.modal_title}`}>{children}</h2>
    </React.Fragment>
}
Modal.Body=({children})=>{
    return <React.Fragment>
        <div className={`${style.modal_body}`}>
            {children}   
        </div>
    </React.Fragment>
}
Modal.Footer=({children})=>{
    return <React.Fragment>
        <div className={`${style.modal_footer}`}>
            {children}   
        </div>
    </React.Fragment>
}

export default Modal;
