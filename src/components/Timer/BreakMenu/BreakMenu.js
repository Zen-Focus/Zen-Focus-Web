import React from 'react'
import { Icon } from '@iconify/react'

import './breakMenu.css'

const BreakMenu = ({ startBreak }) => {
  return (
    <div id="break-menu">
      {/* <Icon id="meditationIcon" className="icon" icon="mdi:meditation" height="70" />
      <span style={{ fontSize: "1.5em" }}>or</span>
      <Icon id="clockIcon" className="icon" icon="bi:clock-history" height="45" onClick={() => setShowBreakTimer(true)} /> */}
      <p id="break-text">Ready for a break?</p>
      <Icon id="clockIcon" className="icon" icon="ci:check" height="45" onClick={() => startBreak()} />
    </div>
  )
}

export default BreakMenu