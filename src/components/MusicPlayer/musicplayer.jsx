import React, { useEffect, useRef, useState } from "react";
import { a1, a2, a3, a4, a1_img, a2_img, a3_img, a4_img } from "../../assets";
import style from "./music.module.css";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import { FaForward } from "react-icons/fa";

const musicInfo = [
  {
    title: "Electric Chill Machine",
    artist: "Jacinto Design",
    audio: a1,
    image: a1_img,
  },
  {
    title: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
    audio: a2,
    image: a2_img,
  },
  {
    title: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
    audio: a3,
    image: a3_img,
  },
  {
    title: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
    audio: a4,
    image: a4_img,
  },
];
console.log(musicInfo);

const Musicplayer = () => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const [togglePlay, setTogglePlay] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [duration, setDuration] = useState("");
  const [currentDuration, setCurrentDuration] = useState("");
  const [progress, setProgress] = useState(0);
  // handle the play button
  const handlePlay = () => {
    audioRef.current.play();
    setTogglePlay(true);
  };

  // handle the pause button
  const handlePause = () => {
    audioRef.current.pause();
    setTogglePlay(false);
  };

  const handleAudioIndex = (info) => {
    switch (info) {
      case "prev":
        setCurrentAudioIndex((prev) =>
          prev === 0 ? musicInfo.length - 1 : prev - 1
        );
        setProgress(0);
        setTogglePlay(true);
        break;
      case "next":
        setCurrentAudioIndex((prev) =>
          prev === musicInfo.length - 1 ? 0 : prev + 1
        );
        setProgress(0);
        setTogglePlay(true);
        break;

      default:
        break;
    }
  };
  const handleDuration = () => {
    console.log("duration", audioRef.current.duration);
    const minutes = Math.floor(audioRef.current.duration / 60);
    const seconds = Math.floor(audioRef.current.duration % 60);
    setDuration(
      `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    );
  };
  const handleProgress = () => {
    //console.log(audioRef.current.currentTime);
    const val =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    const minutes = Math.floor(audioRef.current.currentTime / 60);
    const seconds = Math.floor(audioRef.current.currentTime % 60);
    setCurrentDuration(
      `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    );
    setProgress(val);
  };
  const handleOnEnded = () => {
    setCurrentDuration("");
    setTogglePlay(true);
    setProgress(0);
    audioRef.current.currentTime = 0;
    setCurrentAudioIndex((prev) =>
      prev === musicInfo.length - 1 ? 0 : prev + 1
    );
  };

  const handleProgressRange = (e) => {
    const userSelectedprogress =
      e.nativeEvent.offsetX / progressBarRef.current.offsetWidth;
    audioRef.current.currentTime =
      userSelectedprogress * audioRef.current.duration;
    setProgress(userSelectedprogress * 100);
    if (audioRef.current.paused) {
      audioRef.current.play();
      setTogglePlay(true);
    }
  };

  useEffect(() => {
    if (togglePlay && audioRef.current) {
      audioRef.current.play();
    }
  }, [togglePlay, currentAudioIndex]);

  return (
    <React.Fragment>
      <div className={style.music_container}>
        <div className={style.music_player_container}>
          {/* img container */}
          <div className={style.image_container}>
            <img src={musicInfo[currentAudioIndex].image} alt="" />
          </div>
          {/* Title of the Song */}
          <h2 className={style.title}>{musicInfo[currentAudioIndex].title}</h2>
          {/* Artisit of the song. */}
          <p className={style.artisit}>{musicInfo[currentAudioIndex].artist}</p>
          {/* audio element */}
          <audio
            src={musicInfo[currentAudioIndex].audio}
            ref={audioRef}
            onLoadedMetadata={handleDuration}
            onTimeUpdate={handleProgress}
            onEnded={handleOnEnded}
          ></audio>
          {/* progress Bar for audio duration. */}
          <div className={style.controls}>
            <div className={style.duration_wrapper}>
              <span className={style.currentTime}>
                {currentDuration ? currentDuration : "00:00"}
              </span>
              <span className={style.duration}>
                {duration ? duration : "00:00"}
              </span>
            </div>
            <div
              className={style.progressRange}
              title="Seek"
              ref={progressBarRef}
              onClick={handleProgressRange}
            >
              <div
                className={style.progressBar}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          {/* play controls */}
          <div className={style.play_controls}>
            <button
              className={style.button}
              title="Previous"
              id="prev"
              onClick={() => {
                handleAudioIndex("prev");
              }}
            >
              <FaBackward />
            </button>
            <button
              className={style.main_button}
              title={togglePlay ? "Pause" : "Play"}
            >
              {togglePlay ? (
                <FaPauseCircle onClick={handlePause} />
              ) : (
                <FaPlayCircle onClick={handlePlay} />
              )}
            </button>
            <button
              className={style.button}
              title="Next"
              id="next"
              onClick={() => {
                handleAudioIndex("next");
              }}
            >
              <FaForward />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Musicplayer;
