import React, { useEffect, useState } from 'react'
import { miniclockv6 } from '../../assets';
import style from "./style.module.css";
import { countdownFormat ,countdownDateTimeFormat} from '../../utils/formatDate';
let timer;

const CountDown = () => {
    const isCInfo=localStorage.getItem("countdown") ? true: false;    
    const [countdown,setCountdown]=useState({days:0,hours:0,minutes:0,seconds:0});
    const [isCountdownFormHidden,setIsCountdownFormHidden]=useState(isCInfo || false);
    const [isCountdownHidden,setIsCountdownHidden]=useState(isCInfo ? false : true);
    const [isCountdownCompletedHidden,setIsCountdownCompletedHidden]=useState(true);
    const [userSelectInfo,setUserSelectInfo]=useState(isCInfo ? JSON.parse(localStorage.getItem("countdown")):{title:"",date:""});
    const handleCountdown=(e)=>{
        e.preventDefault();
        const {title,date}=userSelectInfo;
        if(!title || !date){
            return alert("fields are required.")
        }
        // store the data into local storage.
        localStorage.setItem("countdown",JSON.stringify(userSelectInfo));
        setIsCountdownFormHidden(true);
        setIsCountdownHidden(false);
        //setUserSelectInfo({title:"",date:""});
    }
    const handleUserSelectedInfo=(e)=>{
        switch(e.target.name){
            case "title":
                setUserSelectInfo({
                    ...userSelectInfo,
                    title:e.target.value
                });
                break;
            case "date-picker":
                setUserSelectInfo({
                    ...userSelectInfo,
                    date:e.target.value
                });
                break;
                
            default :
            setUserSelectInfo(userSelectInfo);
        }
    };
    const calculateTime=(timeInMilliSecs)=>{
        const secs=timeInMilliSecs/1000;
        const days=Math.floor(secs/86400);
        const hours=Math.floor( (secs%86400 ) / 3600);
        const minutes = Math.floor(((secs%86400 ) % 3600) / 60);
        const seconds=Math.floor(((secs%86400 ) % 3600) % 60);
        return {days,hours,minutes,seconds}
    }
    useEffect(()=>{
        
        if(!isCountdownHidden && userSelectInfo.date){
            console.log(userSelectInfo);   
            timer=setInterval(()=>{
                const userD=new Date(userSelectInfo.date);
                const difference=(new Date(userD.getFullYear(),userD.getMonth(),userD.getDate(),userD.getHours(),userD.getMinutes())-new Date());
                //console.log(difference);
                
                 if(difference <=0){
                    clearInterval(timer);
                    setIsCountdownFormHidden(true);
                    setIsCountdownHidden(true);
                    setIsCountdownCompletedHidden(false);
                    setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                    return;
                 }
                const res=calculateTime(difference);
                setCountdown(res);
            },1000);    
        }
        return ()=>{clearInterval(timer)}
    },[isCountdownHidden,userSelectInfo])


    const handleReset=()=>{
        clearInterval(timer);
        localStorage.removeItem("countdown");
        setUserSelectInfo({title:"",date:""});
        setIsCountdownHidden(true);
        setIsCountdownFormHidden(false);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
       
    }
    const handleNewCountdown=()=>{
        clearInterval(timer);
        localStorage.removeItem("countdown");
        setUserSelectInfo({title:"",date:""});
        setIsCountdownHidden(true);
        setIsCountdownFormHidden(false);
        setIsCountdownCompletedHidden(true);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

                <div className={style.input_container} id={style.input_container} hidden={isCountdownFormHidden}>
                    <h1>Create a Custom Countdown!</h1>
                    <form className={style.form} id={style.countdownForm} onSubmit={handleCountdown}>
                        <div className={style.input_group}>
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" name="title" placeholder='What are you counting down to ?' value={userSelectInfo.title} onChange={handleUserSelectedInfo}/>
                        </div>
                        <div>
                            <label htmlFor="date-picker">Select a Date</label>
                            <input type="datetime-local" id="date-picker" name="date-picker" min={countdownDateTimeFormat(new Date())} value={userSelectInfo.date} onChange={handleUserSelectedInfo}/>
                        </div>
                        <input type="submit" value="Submit" />
                    </form>
                </div>

                {/* countdown container */}
                <div className={style.countdown_container} id={style.countdown_container} hidden={isCountdownHidden}>
                    <h2>{userSelectInfo.title}</h2>
                    <ul>
                        <li><span>{countdown.days}</span>Days</li>
                        <li><span>{countdown.hours}</span>Hours</li>
                        <li><span>{countdown.minutes}</span>Minutes</li>
                        <li><span>{countdown.seconds}</span>Seconds</li>
                    </ul>
                    <button id={style.countdown_button} onClick={handleReset}>Reset</button>
                </div>

                {/* completed countdown */}
                <div className={style.completed_container} id={style.completed_container} hidden={isCountdownCompletedHidden}>
                    <h2 className={style.completed_title}>Countdown Completed!</h2>
                    <h2 id={style.completed_info}>Countdown Finished on {userSelectInfo.date}</h2>
                    <button id={style.completed_button} onClick={handleNewCountdown}>New Countdown</button>
                </div>
            </div>

        </div>
  </React.Fragment>
  )
}

export default CountDown;