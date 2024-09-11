import React from 'react'
import "./style.css"
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
      <div className='video-container'>
        <div className='player'>
          <video className='video'>
            <source src={v1} type='video/mp4'/>
          </video>
          {/* show controls */}
          <div className='show-controls'>
            <div className="controls-container">
              {/* progress bar */}
              <div className='progress-range' title='Seek'>
                <div className="progress-bar">

                </div>

              </div>
              {/* controls group */}
              <div className="controls-group">
                {/* Left Controls */}
                <div className="left-controls">
                  {/* Play Controls */}
                  <div className="play-controls">
<FaPlay onClick={()=>{
  console.log("asas");
  
}}/>
                  </div>
                  {/* Volume Controls */}
                  <div className='volume-controls'>
                    <div className="volume-icon"></div>
                    <div className="volume-range" title='Change Volume'>
                      <div className="volume-bar">

                      </div>
                    </div>

                  </div>

                </div>
                {/* Right Controls */}
                <div className="right-controls">
                  {/* Control Speed */}
                  <div className="speed">

                  </div>
                  {/* Time */}
                  <div className="time">

                  </div>
                  {/* Full Screen */}
                  <div className="full-screen">

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