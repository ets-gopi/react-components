import React, { useEffect, useRef, useState } from 'react'
import style from "./bookkeeper.module.css";
import { IoCloseSharp } from "react-icons/io5";
const Modal = ({open,onClose,handleBookmarkList}) => {
  
  const [formdata, setFormdata] = useState({websiteName:"",websiteUrl:""});
  const websiteNameRef=useRef(null);
  const handleSubmit=(e)=>{
    e.preventDefault();
    const {websiteName,websiteUrl}=formdata;
    // console.log(websiteName,websiteUrl);
    
    if(!websiteName && !websiteUrl){
      return alert("Please Provide the both fields.")
    }else if(!websiteUrl){
      return alert("Please Provide the url for the bookmark.")
    }else if(!websiteName){
      return alert("Please Provide the name for the bookmark.")
    }else{
      console.log(websiteName,websiteUrl);
      let url=websiteUrl;
      const regexurlpattern=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

      if(!url.includes("http://","https://")){
        url=`https://${url}`
      }
      if(!regexurlpattern.test(url)){
        alert("Please Provide the valid web url.");
        return;
      }
      console.log(websiteName,url);
      const bookmarkslist=localStorage.getItem("bookmarkslist");
      if(!bookmarkslist){
        localStorage.setItem("bookmarkslist",JSON.stringify([{id:Date.now(),name:websiteName,url}]));
        handleBookmarkList([{id:Date.now(),name:websiteName,url}])
      }else{
        localStorage.setItem("bookmarkslist",JSON.stringify([...JSON.parse(bookmarkslist),{id:Date.now(),name:websiteName,url}]));
        handleBookmarkList([...JSON.parse(bookmarkslist),{id:Date.now(),name:websiteName,url}])
      };
      setFormdata({websiteName:"",websiteUrl:""});
      onClose(); 
    }


  }
  useEffect(()=>{
    if(open && websiteNameRef.current){
      websiteNameRef.current.focus();
    }
  },[open]);


   // handle the formdata.
   const handleformadata=(e)=>{
    switch(e.target.name){
      case "name":
        setFormdata({
          ...formdata,
          websiteName:e.target.value
        });
        break;
      case "url":
        setFormdata({
        ...formdata,
        websiteUrl:e.target.value
      });
        break;
      default:
        setFormdata(formdata);
    }

   }
  if(!open){
    return null
  }
 
  return (<React.Fragment>
    <div className={style.modal_overlay} onClick={onClose}>
      <div className={style.modal_dialog} onClick={(event)=>{event.stopPropagation();}}>
        {/* Modal Header Container*/}
        <div className={style.modal_header}>
          <h5>Add Bookmark</h5>
          <span><IoCloseSharp onClick={onClose}/></span>
        </div>
        {/* Modal Content Container */}
        <div className={style.modal_content}>
          <form className={style.bookmark_form} onSubmit={handleSubmit}>
            <div className={style.input_group}>
              <label htmlFor="name">Website Name</label>
              <input type="text" name="name" id="name" value={formdata.websiteName} ref={websiteNameRef} onChange={handleformadata}/>
            </div>
            <div className={style.input_group}>
              <label htmlFor="url">Website Url</label>
              <input type="text" name="url" id="url" value={formdata.websiteUrl} onChange={handleformadata}/>
            </div>
            <input type="submit" value="Save" />
          </form>
        </div>

      </div>
    </div>
  </React.Fragment>
  )
}

export default Modal