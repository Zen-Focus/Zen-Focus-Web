import React from 'react'
import './progressbar.css'

const Progressbar = ({ time, initial, isPaused, breakAnimation }) => {
  const RADIUS = 120
  const circumference = 2 * Math.PI * RADIUS

  let sec = 100 / (initial * 60)

  const percent = React.useRef(100)

  const draw = (val) => {
    var circle = document.querySelector('#svg #bar')

    if (val < 0) { val = 0 }
    if (val > 100) { val = 100 }

    var pct = ((100 - val) / 100) * circumference

    circle.style.strokeDashoffset = pct
  }

  React.useEffect(() => {
    var circle = document.querySelector('#svg #bar')

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        circle.style.transition = 'stroke-dashoffset 0s linear'
      } else {
        circle.style.transition = 'stroke-dashoffset 1s linear'
      }
    })
  }, [])

  React.useEffect(() => {
    if (!isPaused) {
      percent.current = percent.current - sec
      draw(percent.current)
    }
  }, [isPaused, time]) //eslint-disable-line

  React.useEffect(() => {
    if(time === 0){
      percent.current = 100
      draw(percent.current)
      console.log(isPaused)
    }
  })

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