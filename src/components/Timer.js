import React, { useState } from 'react'
import './timer.css'
import { Icon } from '@iconify/react'

const Timer = () => {
  const [isPaused, setIsPaused] = useState(true)

  const handleClick = () => setIsPaused(!isPaused)

  return(
    <div className="widget">
      <div id="text">15:00</div>
      { isPaused
        ? <Icon id="start" className="icon timer" icon="fa-solid:play" color="#ffffff" height={21} onClick={handleClick} />
        : <Icon id="pause" className="icon timer" icon="carbon:pause-filled" color="#ffffff" height={30} onClick={handleClick} />
      }
      <svg id="svg" width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle id="barContainer" r="90" cx="100" cy="100" fill="transparent" strokeDasharray="565.48" strokeDashoffset="0"></circle>
        <circle id="bar" r="90" cx="100" cy="100" fill="transparent" strokeDasharray="565.48" strokeDashoffset="0"></circle>
      </svg>
    </div>
  )
}

export default Timer