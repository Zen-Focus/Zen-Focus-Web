import React from 'react'
import { Icon } from '@iconify/react'
import NavOptions from './NavOptions'

import './navbar.css'

const Navbar = ({ openSettings, hideIcons, isMeditation, triggerReset, intervalCount, sessionCount, openMeditation }) => {
  return (
    <div id="navbar" style={{ visibility: isMeditation ? 'hidden' : 'visible' }}>
      <NavOptions
        triggerReset={triggerReset}
        intervalCount={intervalCount}
        sessionCount={sessionCount}
        hideIcons={hideIcons}
        openMeditation={openMeditation}
        isMeditation={isMeditation}
      />
      <Icon
        id="settings"
        className="icon"
        icon="fa-solid:user-clock"
        height={25}
        onClick={() => openSettings()}
      />
    </div>
  )
}

export default Navbar