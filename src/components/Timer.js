import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'

import './timer.css'

const Countdown = ({hidden, reset, setReset}) => {
  const [minutes, setMinutes] = useState(localStorage.getItem('zenIntervalLength') || 25)
  const [timer, setTimer] = useState(null)
  const [time, setTime] = useState(minutes*60)
  const [isPaused, setIsPaused] = useState(true)
  const RADIUS = 120

  const countDown = () => {
    setTime(time => time-1)
  }

  const startTimer = () => {
    setTimer(setInterval(countDown, 1000))
  }

  const stopTimer = () => {
    clearInterval(timer)
  }

  const handleClick = () => {
    isPaused ? startTimer() : stopTimer()
    setIsPaused(!isPaused)
  }

  const showTime = () => {
    let minutes = Math.floor(time/60)
    let seconds = time%60

    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

  useEffect(() => {
    if(time <= 0){stopTimer()}
  }, [time]) //eslint-disable-line

  useEffect(() => {
    if(reset){
      stopTimer()
      setMinutes(localStorage.getItem('zenIntervalLength'))
      setTime(localStorage.getItem('zenIntervalLength')*60)
      setIsPaused(true)
      setReset(false)
    }
  }, [reset]) //eslint-disable-line

  return(
    <div id="timer" style={{ visibility: hidden ? "hidden" : "visible" }}>
      <div className="widget">
        <div id="text">{showTime()}</div>
        { isPaused
          ? <Icon id="start" className="icon timer" icon="fa-solid:play" height={21} onClick={handleClick} />
          : <Icon id="pause" className="icon timer" icon="carbon:pause-filled" height={37} onClick={handleClick} />
        }
        <svg id="svg" width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <circle id="barContainer" r={RADIUS} cx="100" cy="100" fill="transparent" strokeDasharray={2*Math.PI*RADIUS} strokeDashoffset="0"></circle>
          <circle id="bar" r={RADIUS} cx="100" cy="100" fill="transparent" strokeDasharray={2*Math.PI*RADIUS} strokeDashoffset="0"></circle>
        </svg>
      </div>
    </div>
  )
}

export default Countdown