import React, { useState } from 'react'
import style from "./style.module.css";
import { IoClose } from "react-icons/io5";
import Modal from './modal';
const Bookkeeper = () => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState(localStorage.getItem("bookmarkslist")?JSON.parse(localStorage.getItem("bookmarkslist")):[]);

  // handle the modal open and close
  const handleModalOpen=()=>{
    setOpen(open===true ? false :true);
  };
  const handleDeleteBookmark=(bookmark)=>{
      const leftbm=list?.filter((item,ind)=>item.id !== bookmark.id);
      localStorage.setItem("bookmarkslist",JSON.stringify(leftbm));
      setList(leftbm);
  }
 
  return (
   <React.Fragment>
     <div className={style.bookmark_container}>
      {/* button for adding the bookmark */}
      <h1 onClick={handleModalOpen}>add bookmark</h1>

      {/* Bookmarks List */}
      <div className={style.bookmarks_list}>
        {/* <div className={style.bookmark_item}>
          <div className={style.delete_bookmark_item} title='delete_bookmark'><IoClose/></div>
          <div className={style.name}>
            <img src={`https://s2.googleusercontent.com/s2/favicons?domain=www.youtube.com`} alt="Favicon" />
            <a href={`https://www.youtube.com`} target='_blank'>youtube</a>
          </div>
        </div>
        <div className={style.bookmark_item}>
        <div className={style.delete_bookmark_item} title='delete_bookmark'><IoClose/></div>
          <div className={style.name}>
            <img src={`https://s2.googleusercontent.com/s2/favicons?domain=www.youtube.com`} alt="Favicon" />
            <a href={`https://www.youtube.com`} target='_blank'>youtube</a>
          </div>
        </div>
        <div className={style.bookmark_item}>
        <div className={style.delete_bookmark_item} title='delete_bookmark'><IoClose/></div>
          <div className={style.name}>
            <img src={`https://s2.googleusercontent.com/s2/favicons?domain=www.youtube.com`} alt="Favicon" />
            <a href={`https://www.youtube.com`} target='_blank'>youtube</a>
          </div>
        </div> */}
        {
          list?.map((item,ind)=><div key={ind} className={style.bookmark_item}>
          <div className={style.delete_bookmark_item} title='delete_bookmark'><IoClose onClick={()=>{
            handleDeleteBookmark(item);
          }}/></div>
          <div className={style.name}>
            <img src={`https://s2.googleusercontent.com/s2/favicons?domain=${item.url}`} alt="Favicon" />
            <a href={`${item.url}`} target='_blank'>{item.name}</a>
          </div>
        </div>)
        }
      </div>
     </div>
     {/* Modal */}
     <Modal open={open} onClose={handleModalOpen} handleBookmarkList={setList} />
   </React.Fragment>
  )
}

export default Bookkeeper