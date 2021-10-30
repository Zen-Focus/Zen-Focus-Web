import React from 'react'
import Soundscapes from '../Soundscapes/Soundscapes'
import { Icon } from '@iconify/react'

const NavOptions = ({triggerReset, intervalCount, sessionCount}) => {  
  return(
    <div id="options">
      <Soundscapes />
      <Icon id="meditation" className="icon" icon="mdi:meditation" height={35} />
      <Icon id="reset" className="icon" icon="ei:undo" height={35} onClick={() => triggerReset()} />
      <p style={{ marginRight: "10px" }}>Interval: {intervalCount}</p>
      <p>Session: {sessionCount}</p>
    </div>
  )
}

export default NavOptions