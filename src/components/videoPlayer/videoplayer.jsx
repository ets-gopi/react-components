import React, { useEffect, useRef, useState } from 'react'
import style from "./video.module.css";
import { v1 ,v2 ,v3 ,v5} from '../../assets';
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaVolumeDown } from "react-icons/fa";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeOff } from "react-icons/fa";
import { FaExpand } from "react-icons/fa";
let prevVolume=null,fullscreen=false;
  /* View in fullscreen */
  function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }
const VideoPlayer = () => {
  const videoRef=useRef(null);
  const playerRef=useRef(null);
  const durationRef=useRef(null);
  const currentTimeRef=useRef(null);
  const [isPlay,setIsPlay]=useState(false);
  const [volume,setVolume]=useState(null);
  const [progress,setProgress]=useState(0);
  const progressRangeRef=useRef(null);
  const volumeRangeRef=useRef(null);
  const [volumeProgress,setVolumeProgress]=useState(100);  
  const [isMuted,setIsMuted]=useState(false);
  const [playBackRate,setPlayBackRate]=useState(1.0);
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
  if(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement){
    closeFullscreen()
  }else{
  openFullscreen(playerRef.current)
  }
  }

  // handle the progress bar when video is loaded.
  const handleUpdateProgressBar=()=>{
    //console.log("current time", videoRef.current.currentTime,"total",videoRef.current.duration);
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
  const handleVolumeProgress=(e)=>{
    //console.log(e.nativeEvent.offsetX,volumeRangeRef.current.offsetWidth,videoRef.current.volume);
    let volume =e.nativeEvent.offsetX /volumeRangeRef.current.offsetWidth;
    
    if(volume < 0.1){
      volume=0;
    }
    if(volume>0.9){
      volume=1
    }
    videoRef.current.volume=volume;
    setVolumeProgress(volume*100);
    setVolume(volume);
    prevVolume=volume;
    setIsMuted(false);
  }
  const toggleVolume =(e)=>{   
    if(videoRef.current.volume){
      setVolume(videoRef.current.volume)
      prevVolume=videoRef.current.volume;
      videoRef.current.volume=0;
      setVolumeProgress(0);
      setIsMuted(true);
    }else{
      if(videoRef.current.volume===0 && prevVolume===0){
        videoRef.current.volume=1;
        prevVolume=videoRef.current.volume;
        setVolume(1);
        setVolumeProgress(100);
      }else{
        setVolume(prevVolume)
        videoRef.current.volume=prevVolume;
        setVolumeProgress(prevVolume*100);
        
      }
      setIsMuted(false);
    }    
  }

  const handlePlayBackRate=(e)=>{
    console.log(e.target.value);
    setPlayBackRate(parseFloat(e.target.value));
    videoRef.current.playbackRate = parseFloat(e.target.value);
    

  }

  //console.log(prevVolume);


    
  return (
    <React.Fragment>
      <div className={style.video_container}>
        <div className={style.player} ref={playerRef}>
          <video className={style.video} ref={videoRef} onClick={()=>{
            if(isPlay){
              videoRef.current.pause();
            }else{
              videoRef.current.play();
            }
            setIsPlay(!isPlay)
          }} onEnded={handleOnEnded} onCanPlay={()=>{
            handleUpdateProgressBar();
            setVolume(videoRef.current.volume);
            prevVolume=videoRef.current.volume;
          }} onTimeUpdate={handleUpdateProgressBar}>
            <source src={v5} type='video/mp4'/>
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
                    <div className={style.volume_icon}  >
                      {
                        volume >= 0.7  && (isMuted ? <span onClick={toggleVolume} id='muted'><FaVolumeMute /></span> : <span onClick={toggleVolume} id='volume-up'><FaVolumeUp /></span>)
                      }
                      {
                        volume > 0 && volume < 0.7  && (isMuted ? <span onClick={toggleVolume} id='muted'><FaVolumeMute /></span>: <span  onClick={toggleVolume}  id='volume-down' ><FaVolumeDown /></span>)
                      }
                      {
                        volume === 0  && (isMuted ? <span onClick={toggleVolume} id='muted'><FaVolumeMute /></span>: <span id='volume-off' onClick={toggleVolume}><FaVolumeOff/></span>)
                      }
                    </div>
                    <div className={style.volume_range} title='Change Volume' ref={volumeRangeRef} onClick={handleVolumeProgress}>
                      <div className={style.volume_bar} style={{"width":`${volumeProgress}%`}}>

                      </div>
                    </div>

                  </div>

                </div>
                {/* Right Controls */}
                <div className={style.right_controls}>
                  {/* Control Speed */}
                  <div className={style.speed} title='playBack Rate'>
                    <select name="speed" id="speed" onChange={handlePlayBackRate} value={playBackRate}>
                      <option value={0.5}>0.5x</option>
                      <option value={1.0}>1.0x</option>
                      <option value={2.0}>2.0x</option>
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