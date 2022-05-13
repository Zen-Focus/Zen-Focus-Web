import React from 'react'
import { Icon } from '@iconify/react'

import './breakMenu.css'

const BreakMenu = ({ startBreak, openMeditation }) => {
  const [showMenu, setShowMenu] = React.useState(false)

  const startMeditation = () => {
    startBreak()
    openMeditation()
  }

  return (
    <div id="break-menu">
      {showMenu
        ? <div id="break-menu-options">
            <p id="break-menu-text">Choose One:</p>
            <Icon id="meditationIcon" className="icon" icon="mdi:meditation" height="50" onClick={() => startMeditation() } />
            <Icon id="clockIcon" className="icon" icon="bi:clock-history" height="35" onClick={() => startBreak() } />
          </div>
        : <span id="break-menu-dialogue">
            <p id="break-menu-text">Ready for a break?</p>
            <Icon className="icon" icon="ci:check" height="45" onClick={() => setShowMenu(true)} />
          </span>
      }
    </div>
  )
}

export default BreakMenu