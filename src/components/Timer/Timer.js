import React, { useState, useEffect } from 'react'
import Countdown from './Countdown/Countdown'
import Progressbar from './Progressbar/Progrssbar'

import './timer.css'

const Timer = ({hidden, reset, setReset}) => {
  const [minutes, setMinutes] = useState(localStorage.getItem('zenIntervalLength') || 25)
  const [timer, setTimer] = useState(null)
  const [time, setTime] = useState(minutes*60)
  const [isPaused, setIsPaused] = useState(true)
  
  const countDown = () => {
    setTime(time => time-1)
  }

  const startTimer = () => {
    setTimer(setInterval(countDown, 1000))
  }

  const stopTimer = () => {
    clearInterval(timer)
  }

  const startStop = () => {
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
        <Countdown showTime={showTime} isPaused={isPaused} startStop={startStop} />
        <Progressbar />
      </div>
    </div>
  )
}

export default Timer