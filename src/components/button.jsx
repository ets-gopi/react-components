import React from 'react'
import "./style.css"
const Button = ({children,type,style,onClick}) => {
  return (
    <React.Fragment>
        <button className="button" style={{...style}} type={type} onClick={onClick}>{children}</button>
    </React.Fragment>
  )
}

export default Button;