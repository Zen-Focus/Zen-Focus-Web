import React from 'react'
import './progressbar.css'

const Progressbar = ({ time, initial, isPaused, startInterval, setStartInterval, reset, skip, isBreak }) => {
  const RADIUS = 120
  const circumference = 2 * Math.PI * RADIUS
  const percent = React.useRef(100)
  const percentPerSecond = 100 / (initial * 60)
  const timeDiff = React.useRef()

  const draw = (val) => {
    const svgCircle = document.querySelector('#svg #bar')

    if (val < 0) { val = 0 }
    if (val > 100) { val = 100 }

    var pct = ((100 - val) / 100) * circumference

    svgCircle.style.strokeDashoffset = pct
  }

  React.useEffect(() => {
    const svgCircle = document.querySelector('#svg #bar')

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        svgCircle.style.transition = 'stroke-dashoffset 0s linear'
      } else {
        svgCircle.style.transition = 'stroke-dashoffset 1s linear'
      }
    })
  }, [])

  React.useEffect(() => {
    const svgCircle = document.querySelector('#svg #bar')

    if (startInterval) {
      svgCircle.style.transition = 'stroke-dashoffset 1s linear'
      percent.current = percent.current - percentPerSecond
      draw(percent.current)
    }
  }, [time, startInterval]) //eslint-disable-line

  React.useEffect(() => {
    const svgCircle = document.querySelector('#svg #bar')

    if (isPaused) {
      let offset = getComputedStyle(svgCircle).strokeDashoffset
      svgCircle.style.strokeDashoffset = offset

      let actualPercent = 100 - ((100 * offset.split('px')[0]) / circumference)
      let percentDiff = Math.abs(percent.current - actualPercent)
      timeDiff.current = (1 / percentPerSecond) * percentDiff
    } else {
      if (timeDiff.current) {
        svgCircle.style.transitionDuration = `${timeDiff.current}s`
        draw(percent.current)
        document.querySelector('#svg #bar').style.transitionDuration = `1s`
      }
    }
  }, [isPaused]) //eslint-disable-line

  React.useEffect(() => {
    if (time === 0) {
      percent.current = 100
      draw(percent.current)
      setStartInterval(false)
    }
  })

  React.useEffect(() => {
    const svgCircle = document.querySelector('#svg #bar')
    percent.current = 100
    svgCircle.style.transition = 'stroke-dashoffset 0s linear'
    svgCircle.style.strokeDashoffset = '0px'
    setStartInterval(false)
  }, [reset, skip]) // eslint-disable-line

  React.useEffect(() => {
    const svgCircle = document.querySelector('#svg #bar')
    if (isBreak && !isPaused) {
      setTimeout(() => {
        svgCircle.style.transition = 'stroke-dashoffset 1s linear'
        setStartInterval(true)
      }, 500)
    }
  }, [reset]) // eslint-disable-line

  return (
    <svg id="svg" width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle
        id="barContainer"
        r={RADIUS}
        cx="100"
        cy="100"
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset="0">
      </circle>
      <circle
        id="bar"
        r={RADIUS}
        cx="100"
        cy="100"
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset="0">
      </circle>
    </svg>
  )
}

export default Progressbar