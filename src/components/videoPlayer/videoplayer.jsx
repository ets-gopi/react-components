import React, { useEffect, useRef, useState } from 'react'
import style from "./video.module.css";
import { v1 ,v2 ,v3 } from '../../assets';
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaVolumeDown } from "react-icons/fa";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeOff } from "react-icons/fa";
import { FaExpand } from "react-icons/fa";
const VideoPlayer = () => {
  const videoRef=useRef(null);
  const playerRef=useRef(null);
  const durationRef=useRef(null);
  const currentTimeRef=useRef(null);
  const [isPlay,setIsPlay]=useState(false);
  const [progress,setProgress]=useState(0);
  const progressRangeRef=useRef(null);
  // handle the play button
  const handlePlay=()=>{
    videoRef.current.play();
    setIsPlay(!isPlay);
  };

  // handle the pause button
  const handlePause=()=>{
    videoRef.current.pause();
    setIsPlay(!isPlay);
  };

  // handle the full-screen requirement
  const handleFullScreen=()=>{
  }

  // handle the progress bar when video is loaded.
  const handleUpdateProgressBar=()=>{
    console.log("current time", videoRef.current.currentTime,"total",videoRef.current.duration);
    const val=(videoRef.current.currentTime/videoRef.current.duration) * 100;
    setProgress(val);
    //displayTime(3850)
    durationRef.current.textContent=displayTime(videoRef.current.duration);
    currentTimeRef.current.textContent=displayTime(videoRef.current.currentTime);  
  }

  // action to handle the on completion of video.
  const handleOnEnded=() => {
    setIsPlay(false);
    setProgress(0);
    videoRef.current.currentTime=0;
  }

  const displayTime=(time)=>{
    console.log("time",time);
    
    const hour = Math.floor(time/3600);
    const minute=Math.floor((time%3600)/60);
    const secs=Math.floor(time%60);
    //console.log(hour,minute,secs);
    if(hour){
      return `${hour}:${minute}:${secs}`
    }else{
      return `${minute > 9 ? minute : `0${minute}`}:${secs > 9 ? secs  : `0${secs}`}`
    }
  }

  const handleProgressRange=(e)=>{
    //console.log(progressRangeRef.current.offsetWidth,e.nativeEvent.offsetX);
    const newTime=(e.nativeEvent.offsetX/progressRangeRef.current.offsetWidth);
    //console.log(newTime);
    videoRef.current.currentTime=newTime * videoRef.current.duration;
    setProgress(newTime * 100);
    if(videoRef.current.paused){
      videoRef.current.play();
      setIsPlay(true);
    }
  }
    
  return (
    <React.Fragment>
      <div className={style.video_container}>
        <div className={style.player} ref={playerRef}>
          <video className={style.video} ref={videoRef} onEnded={handleOnEnded} onCanPlay={handleUpdateProgressBar} onTimeUpdate={handleUpdateProgressBar}>
            <source src={v3} type='video/mp4'/>
          </video>
          {/* show controls */}
          <div className={style.show_controls}>
            <div className={style.controls_container}>
              {/* progress bar */}
              <div className={style.progress_range} title='Seek' ref={progressRangeRef} onClick={handleProgressRange}>
                <div className={style.progress_bar} style={{"width":`${progress}%`}}>

                </div>
              </div>
              {/* controls group */}
              <div className={style.controls_group}>
                {/* Left Controls */}
                <div className={style.left_controls}>
                  {/* Play Controls */}
                  <div className={style.play_controls}>
                    {isPlay ? <FaPause onClick={handlePause} className={style.pause}/>: <FaPlay onClick={handlePlay} className={style.play} /> }
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
                  <div className={style.speed} title='playBack Rate'>
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
                    <span className={style.currentTime} ref={currentTimeRef}></span>/<span className={style.duration} ref={durationRef}></span>

                  </div>
                  {/* Full Screen */}
                  <div className={style.full_screen}>
                      <FaExpand onClick={handleFullScreen} />
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