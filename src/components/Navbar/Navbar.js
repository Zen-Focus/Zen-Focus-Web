import React from 'react'
import { Icon } from '@iconify/react'
import Options from './NavOptions'

import './navbar.css'

const Navbar = ({openSettings, hideIcons, setReset}) => {  
  return(
    <div id="navbar">
      { hideIcons
        ? null
        : <Options setReset={setReset} />
      }
      <Icon id="settings" className="icon" icon="fa-solid:user-clock" height={25} onClick={() => openSettings()}/>
    </div>
  )
}

export default Navbar