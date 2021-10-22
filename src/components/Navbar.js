import React from 'react'
import { Icon } from '@iconify/react'
import Options from './Options'

import './navbar.css'

const Navbar = ({openSettings, hideIcons}) => {  
  return(
    <div id="navbar">
      { hideIcons
        ? null
        : <Options />
      }
      <Icon id="settings" className="icon" icon="fa-solid:user-clock" height={25} onClick={() => openSettings()}/>
    </div>
  )
}

export default Navbar