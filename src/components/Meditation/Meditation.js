import React from 'react'

import './meditation.css'

const Meditation = ({ inhale, exhale, inhaleHold, exhaleHold}) => {
  const RADIUS = {
    initial: 120,
    expanded: 220
  }

  if (window.matchMedia('(max-device-width: 600px)').matches || window.innerWidth <= 600){
    RADIUS.expanded = 180
  }

  const [radius, setRadius] = React.useState(RADIUS.initial)

  const addAnimation = (element, name, duration, newRadius) => {
    element.style.animationDuration = `${duration}s`
    element.style.animationName = name
    setRadius(newRadius)
  }

  React.useEffect(() => {
    const meditationSvg = document.querySelector('#meditation-circle-bar')
    const label = document.querySelector('#breath-label p')

    const animationHandler = () => {
      meditationSvg.style.animationName === "inhale"
        ? holdAnimation(exhaleAnimation, inhaleHold)
        : exhaleHold > 0
          ? holdAnimation(inhaleAnimation, exhaleHold)
          : inhaleAnimation()
    }

    function inhaleAnimation(){
      label.innerText = 'Breathe In'
      addAnimation(meditationSvg, 'inhale', inhale, RADIUS.expanded)
    }

    function exhaleAnimation(){
      label.innerText = 'Breathe Out'
      addAnimation(meditationSvg, 'exhale', exhale, RADIUS.initial)
    }

    function holdAnimation(callback, hold){
      label.innerText = 'Hold'

      setTimeout(() => {
        callback()
      }, hold * 1000)
    }

    inhaleAnimation()

    meditationSvg.addEventListener("animationend", animationHandler); 

    return () => {
      meditationSvg.removeEventListener("animationend", animationHandler); 
    }

  }, []) //eslint-disable-line

  return (
    <div className="timer-container" id="meditation-display">
      <div className="widget">
        <div id="breath-label">
          <p>Breathe In</p>
        </div>
        <svg id="meditation-svg" width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <circle
            id="meditation-circle-bar"
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