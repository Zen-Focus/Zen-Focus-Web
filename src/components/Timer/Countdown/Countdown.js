import React from 'react'
import { Icon } from '@iconify/react'

const Countdown = ({showTime, isPaused, startStop}) => {
  return(
    <div id="countdown">
      <div id="text">{showTime()}</div>
      { isPaused
        ? <Icon id="start" className="icon timer" icon="fa-solid:play" height={21} onClick={startStop} />
        : <Icon id="pause" className="icon timer" icon="carbon:pause-filled" height={37} onClick={startStop} />
      }
    </div>
  )
}

export default Countdown