import React from 'react'
import './navbar.css'
import { Icon } from '@iconify/react'

const Navbar = () => {

  return(
    <div id="navbar">
      <Icon id="sounds" className="icon" icon="fluent:headphones-sound-wave-20-filled" color="#ffffff" height={30} />
      <Icon id="meditation" className="icon" icon="mdi:meditation" color="#ffffff" height={35} />
      <Icon id="reset" className="icon" icon="ei:undo" color="#ffffff" height={35} />
      <Icon id="settings" className="icon" icon="fa-solid:user-clock" color="#ffffff" height={25} />
    </div>
  )
}

export default Navbar