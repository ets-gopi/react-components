import React from 'react'
import style from "./video.module.css";
import { v1 } from '../../assets';
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaVolumeDown } from "react-icons/fa";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeOff } from "react-icons/fa";
import { FaExpand } from "react-icons/fa";
const VideoPlayer = () => {
  return (
    <React.Fragment>
      <div className={style.video_container}>
        <div className={style.player}>
          <video className={style.video}>
            <source src={v1} type='video/mp4'/>
          </video>
          {/* show controls */}
          <div className={style.show_controls}>
            <div className={style.controls_container}>
              {/* progress bar */}
              <div className={style.progress_range} title='Seek'>
                <div className={style.progress_bar}>

                </div>
              </div>
              {/* controls group */}
              <div className={style.controls_group}>
                {/* Left Controls */}
                <div className={style.left_controls}>
                  {/* Play Controls */}
                  <div className={style.play_controls}>
                    <FaPlay/> 
                  </div>
                  {/* Volume Controls */}
                  <div className={style.volume_controls}>
                    <div className={style.volume_icon}>
                      <FaVolumeUp/>
                    </div>
                    <div className={style.volume_range} title='Change Volume'>
                      <div className={style.volume_bar}>

                      </div>
                    </div>

                  </div>

                </div>
                {/* Right Controls */}
                <div className={style.right_controls}>
                  {/* Control Speed */}
                  <div className={style.speed}>
                    <select name="speed" id="speed">
                      <option value="0.5x">0.5x</option>
                      <option value="0.75x">0.75x</option>
                      <option value="1.0x">1.0x</option>
                      <option value="1.5x">1.5x</option>
                      <option value="2.0x">2.0x</option>
                    </select>
                  </div>
                  {/* Time */}
                  <div className={style.time}>
                    00:00/00:00
                  </div>
                  {/* Full Screen */}
                  <div className={style.full_screen}>
                      <FaExpand/>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </React.Fragment>
  )
}

export default VideoPlayer