import React from 'react'
import { Icon } from '@iconify/react'
import NavOptions from './NavOptions'

import './navbar.css'

const Navbar = ({openSettings, hideIcons, triggerReset, intervalCount, sessionCount}) => {  
  return(
    <div id="navbar">
      { hideIcons
        ? null
        : <NavOptions triggerReset={triggerReset} intervalCount={intervalCount} sessionCount={sessionCount} />
      }
      <Icon id="settings" className="icon" icon="fa-solid:user-clock" height={25} onClick={() => openSettings()}/>
    </div>
  )
}

export default Navbar