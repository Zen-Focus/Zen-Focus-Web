import React from 'react'
import { Icon } from '@iconify/react'
import NavOptions from './NavOptions'

import './navbar.css'

const Navbar = ({ openSettings, hideIcons, isMeditation, triggerReset, intervalCount, sessionCount, openMeditation }) => {
  return (
    <div id="navbar" >
      {isMeditation &&
        <Icon id="close-meditation" className="icon" icon="mdi:keyboard-backspace" height={35} onClick={() => openMeditation()} />
      }
      <NavOptions
        triggerReset={triggerReset}
        intervalCount={intervalCount}
        sessionCount={sessionCount}
        hideIcons={hideIcons || isMeditation}
        openMeditation={openMeditation}
      />
      <Icon
        id="settings"
        className="icon"
        icon="fa-solid:user-clock"
        height={25}
        onClick={() => openSettings()}
        style={{ visibility: isMeditation ? 'hidden' : 'visible' }}
      />
    </div>
  )
}

export default Navbar