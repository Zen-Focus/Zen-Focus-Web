import React from 'react'

import './meditation.css'

const Meditation = ({ inhale, exhale, hold}) => {
  const RADIUS = {
    initial: 120,
    expanded: 220
  }

  const [radius, setRadius] = React.useState(RADIUS.initial)

  const addAnimation = (element, name, duration, newRadius) => {
    element.style.animationDuration = `${duration}s`
    element.style.animationName = name
    setRadius(newRadius)
  }

  React.useEffect(() => {
    const meditationSvg = document.querySelector('#meditation-display #bar')

    addAnimation(meditationSvg, 'inhale', inhale, RADIUS.expanded)

    meditationSvg.addEventListener("animationend", () => {
      meditationSvg.style.animationName
        ? setTimeout(() => {
            addAnimation(meditationSvg, 'exhale', exhale, RADIUS.initial)
          }, hold * 1000)
        : addAnimation(meditationSvg, 'inhale', inhale, RADIUS.expanded)
    }); 

  }, []) //eslint-disable-line

  return (
    <div className="timer-container" id="meditation-display">
      <div className="widget">
        <svg id="svg" width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <circle
            id="bar"
            r={radius}
            cx="100"
            cy="100"
            fill="transparent"
          >
          </circle>
        </svg>
      </div>
    </div>
  )
}

export default Meditation