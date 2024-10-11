import React from 'react'
import {a1,a2,a3,a4,a1_img,a2_img,a3_img,a4_img} from "../../assets";
import style from "./style.module.css";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
const audioFiles=[a1,a2,a3,a4];
const audioImages=[a1_img,a2_img,a3_img,a4_img];

const Musicplayer = () => {
  return (
    <React.Fragment>
        <div className={style.music_container}>
            <div className={style.music_player_container}>
                {/* img container */}
                <div className={style.image_container}>
                    <img src={a1_img} alt="" />
                </div>
                {/* Title of the Song */}
                <h2 className={style.title}>Title goes here...</h2>
                {/* Artisit of the song. */}
                <p className={style.artisit}>Artist goes here...</p>
                {/* audio element */}
                {/* <audio src={a1}></audio> */}
                {/* progress Bar for audio duration. */}
                <div className={style.controls}>
                    <div className={style.duration_wrapper}>
                        <span className={style.currentTime}>00:00</span>
                        <span className={style.duration}>2:05</span>
                    </div>
                    <div className={style.progressRange} title='Seek'>
                        <div className={style.progressBar}></div>
                    </div>

                </div>
                {/* play controls */}
                <div className={style.play_controls}>
                    <button className={style.button} title='Previous' id='prev'><FaBackward/></button>
                    <button className={style.main_button}  title='Play'><FaPlayCircle/></button>
                    <button className={style.button}  title='Next' id='next'><FaForward/></button>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Musicplayer