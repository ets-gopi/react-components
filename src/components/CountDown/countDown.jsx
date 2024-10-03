import React from 'react'
import { miniclockv6 } from '../../assets';
import style from "./style.module.css";
import { countdownFormat } from '../../utils/formatDate';
const CountDown = () => {
    const handleCountdown=(e)=>{
        e.preventDefault();
    }
  return (<React.Fragment>
        <div className={style.countDown_container}>
            {/* video player for background */}
            <video autoPlay={true} muted loop className={style.video_background}>
                <source src={miniclockv6} type='video/mp4'/>
            </video>
            {/* video overlay */}
            <div className={style.video_overlay}></div>
            {/* content */}
            <div className={style.content_container}>

                <div className={style.input_container} id={style.input_container} hidden={false}>
                    <h1>Create a Custom Countdown!</h1>
                    <form className={style.form} id={style.countdownForm} onSubmit={handleCountdown}>
                        <div className={style.input_group}>
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" name="title" placeholder='What are you counting down to ?'/>
                        </div>
                        <div>
                            <label htmlFor="date-picker">Select a Date</label>
                            <input type="date" id="date-picker" name="date-picker" min={countdownFormat(new Date())}/>
                        </div>
                        <input type="submit" value="Submit" />
                    </form>
                </div>

                {/* countdown container */}
                <div className={style.countdown_container} id={style.countdown_container} hidden={true}>
                    <h2>Title goes here..</h2>
                    <ul>
                        <li><span>3</span>Days</li>
                        <li><span>13</span>Hours</li>
                        <li><span>34</span>Minutes</li>
                        <li><span>45</span>Seconds</li>
                    </ul>
                    <button id={style.countdown_button}>Reset</button>
                </div>

                {/* completed countdown */}
                <div className={style.completed_container} id={style.completed_container} hidden={true}>
                    <h2 className={style.completed_title}>Countdown Completed!</h2>
                    <h2 id={style.completed_info}>Countdown Finished on 05-05-2024</h2>
                    <button id={style.completed_button}>New Countdown</button>
                </div>
            </div>

        </div>
  </React.Fragment>
  )
}

export default CountDown;