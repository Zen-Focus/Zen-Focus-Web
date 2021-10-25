import React, { useState, useEffect } from 'react'
import Countdown from './Countdown/Countdown'
import Progressbar from './Progressbar/Progrssbar'
import { Icon } from '@iconify/react'

import './timer.css'

const BreakOptions = ({setShowBreakTimer}) => {
  return(
    <div id="breakOptions">
      <Icon id="meditationIcon" className="icon" icon="mdi:meditation" height="70" />
      <span style={{ fontSize: "1.5em" }}>or</span>
      <Icon id="clockIcon" className="icon" icon="bi:clock-history" height="45" onClick={() => setShowBreakTimer(true)} />
    </div>
  )
}

const Timer = ({hidden, reset, setReset, setIntervalCount, intervalCount}) => {
  const [minutes, setMinutes] = useState(localStorage.getItem('zenIntervalLength') || 25)
  const [timer, setTimer] = useState(null)
  const [time, setTime] = useState(minutes*60)
  const [isPaused, setIsPaused] = useState(true)
  const [isBreak, setIsBreak] = useState(false)
  const [showBreakTimer, setShowBreakTimer] = useState(true)
  
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

  // Timer
  useEffect(() => {
    if(time <= 0){
      stopTimer()
      
      setTimeout(() => {
        setIsPaused(true)
        setIsBreak(!isBreak)
        setShowBreakTimer(false)
      }, 1000)
    }
  }, [time]) //eslint-disable-line

  useEffect(() => {
    if(isBreak === false){
      setIntervalCount(intervalCount => intervalCount + 1)
    }
  }, [isBreak]) //eslint-disable-line

  useEffect(() => {
    if(reset){
      stopTimer()
      setTime(minutes*60)
      setIsPaused(true)
      setReset(false)
      if(isBreak){
        startTimer()
      }
    }
  }, [reset]) //eslint-disable-line

  useEffect(() => {
    let timerInterval

    if(isBreak){
      timerInterval = intervalCount < 4 
        ? localStorage.getItem('zenShortBreak') 
        : localStorage.getItem('zenLongBreak')
    } else{
      timerInterval = localStorage.getItem('zenIntervalLength')
    }

    setMinutes(timerInterval)
    setTime(timerInterval*60)
  }, [intervalCount, isBreak])

  useEffect(() => {
    if(showBreakTimer && isBreak) {
      startTimer()
    }
  }, [showBreakTimer]) //eslint-disable-line

  return(
    <div id="timer" style={{ visibility: hidden ? "hidden" : "visible" }}>
      <div className="widget">
        {!showBreakTimer && isBreak
          ? <BreakOptions setShowBreakTimer={setShowBreakTimer} />
          : <Countdown showTime={showTime} isPaused={isPaused} startStop={startStop} isBreak={isBreak} />
        }
        <Progressbar />
      </div>
    </div>
  )
}

export default Timer