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

const Timer = ({hidden, reset, setIntervalCount, intervalCount, skip, setSkip}) => {
  const [timer, setTimer] = useState(null)
  const [time, setTime] = useState((localStorage.getItem('zenIntervalLength') || 25)*60)
  const [isPaused, setIsPaused] = useState(true)
  const [isBreak, setIsBreak] = useState(false)
  const [showBreakTimer, setShowBreakTimer] = useState(true)
  const [currentInterval, setCurrentInterval] = useState('zenIntervalLength')
  const [sound, setSound] = useState()

  console.log('current: ', currentInterval, 'isBreak: ', isBreak, 'time: ', time)
  
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
    if(!localStorage.getItem('zenIntervalLength')){
      localStorage.setItem('zenIntervalLength', 25)
      localStorage.setItem('zenShortBreak', 5)
      localStorage.setItem('zenLongBreak', 20)
      localStorage.setItem('zenInhalation', 4)
      localStorage.setItem('zenExhalation', 4)
      localStorage.setItem('zenHold', 4)
    }

    let audio = new Audio('https://github.com/Schlenges/uploads/blob/main/parrot.m4a?raw=true')
    audio.type = 'audio/wav'
    setSound(audio)
  }, [])

  useEffect(() => {
    if(time <= 0){
      stopTimer()
      sound.play()

      setTimeout(() => {
        setIsPaused(true)
        setIsBreak(!isBreak)
      }, 1000)
    }
  }, [time]) //eslint-disable-line

  useEffect(() => {
    let interval

    if(isBreak === false){
      setIntervalCount(intervalCount => intervalCount + 1)
      interval = 'zenIntervalLength'
    } else{
      setShowBreakTimer(false) 
      interval = intervalCount < 4 
        ? 'zenShortBreak'
        : 'zenLongBreak'
    }

    setCurrentInterval(interval)
  }, [isBreak]) //eslint-disable-line

  useEffect(() => {
    let intervalTime = localStorage.getItem(currentInterval)
    stopTimer()
    setTime(intervalTime*60)
    setIsPaused(true)
    if(isBreak){
      startTimer()
    }
  }, [reset]) //eslint-disable-line

  useEffect(() => {
    if(skip){  
      stopTimer()
      setIsPaused(true)

      currentInterval !== 'zenIntervalLength'
        ? setIsBreak(false)
        : setIsBreak(true)

      setSkip(false)
    }
  }, [skip]) //eslint-disable-line

  useEffect(() => {
    let intervalTime = localStorage.getItem(currentInterval) || 25
    setTime(intervalTime*60)
  }, [currentInterval])

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