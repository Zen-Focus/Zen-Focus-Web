import React from 'react'
import { Icon } from '@iconify/react'
import NavOptions from './NavOptions'

import './navbar.css'

const Navbar = ({openSettings, hideIcons, setReset, intervalCount}) => {  
  return(
    <div id="navbar">
      { hideIcons
        ? null
        : <NavOptions setReset={setReset} intervalCount={intervalCount} />
      }
      <Icon id="settings" className="icon" icon="fa-solid:user-clock" height={25} onClick={() => openSettings()}/>
    </div>
  )
}

export default Navbar