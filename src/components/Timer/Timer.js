import React, { useState, useEffect } from 'react'
import Countdown from './Countdown/Countdown'
import Progressbar from './Progressbar/Progrssbar'
import BreakMenu from './BreakMenu/BreakMenu'

import './timer.css'

const Timer = ({ hidden, reset, setIntervalCount, intervalCount, skip, setSkip, openMeditation }) => {
  const [timer, setTimer] = useState(null)
  const [time, setTime] = useState((localStorage.getItem('zenIntervalLength') || 25) * 60)
  const [intervalTime, setIntervalTime] = useState((localStorage.getItem('zenIntervalLength') || 25) * 60)
  const [isPaused, setIsPaused] = useState(true)
  const [isBreak, setIsBreak] = useState(false)
  const [startInterval, setStartInterval] = useState(false)
  const [showBreakTimer, setShowBreakTimer] = useState(true)
  const [currentInterval, setCurrentInterval] = useState('zenIntervalLength')
  const [sound, setSound] = useState()

  const startBreak = () => {
    setShowBreakTimer(true)
    setIsPaused(false)
    setStartInterval(true)
  }

  const countDown = () => {
    setTime(time => time - 1)
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
    setStartInterval(true)
  }

  const showTime = () => {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60

    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

  useEffect(() => {
    if (!localStorage.getItem('zenInhaleHold')) {
      localStorage.setItem('zenIntervalLength', 25)
      localStorage.setItem('zenShortBreak', 5)
      localStorage.setItem('zenLongBreak', 20)
      localStorage.setItem('zenInhalation', 4)
      localStorage.setItem('zenExhalation', 4)
      localStorage.setItem('zenInhaleHold', 4)
      localStorage.setItem('zenExhaleHold', 4)
    }

    let audio = new Audio('https://github.com/Schlenges/uploads/blob/main/zapsplat_multimedia_notification_alert_prompt_bright_chime_ping_001_42408.mp3?raw=true')
    audio.type = 'audio/mpeg'
    audio.volume = 0.2
    setSound(audio)
  }, [])

  useEffect(() => {
    if (time <= 0) {
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

    if (isBreak === false) {
      setIntervalCount(intervalCount => intervalCount + 1)
      interval = 'zenIntervalLength'
    } else {
      setShowBreakTimer(false)
      interval = intervalCount < 4
        ? 'zenShortBreak'
        : 'zenLongBreak'
    }

    setCurrentInterval(interval)
  }, [isBreak]) //eslint-disable-line

  useEffect(() => {
    if (!showBreakTimer && isBreak) {
      return
    }

    let intervalTime = localStorage.getItem(currentInterval)
    setIntervalTime(intervalTime)

    stopTimer()
    setTime(intervalTime * 60)

    isBreak
      ? setTimeout(() => startTimer(), 500)
      : setIsPaused(true)

  }, [reset]) //eslint-disable-line

  useEffect(() => {
    if (skip) {
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
    setIntervalTime(intervalTime)
    setTime(intervalTime * 60)
  }, [currentInterval])

  useEffect(() => {
    if (showBreakTimer && isBreak) {
      startTimer()
    }
  }, [showBreakTimer]) //eslint-disable-line

  return (
    <div id="timer" className="timer-container" style={{ visibility: hidden ? "hidden" : "visible" }}>
      <div className="widget">
        {!showBreakTimer && isBreak
          ? <BreakMenu startBreak={startBreak} openMeditation={openMeditation}/>
          : <Countdown showTime={showTime} isPaused={isPaused} startStop={startStop} isBreak={isBreak} />
        }
        <Progressbar
          initial={intervalTime}
          time={time}
          isPaused={isPaused}
          startInterval={startInterval}
          setStartInterval={setStartInterval}
          reset={reset}
          skip={skip}
          isBreak={isBreak}
        />
      </div>
    </div>
  )
}

export default Timer