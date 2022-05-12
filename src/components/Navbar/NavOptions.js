import React from 'react'
import Soundscapes from '../Soundscapes/Soundscapes'
import { Icon } from '@iconify/react'

const NavOptions = ({triggerReset, intervalCount, sessionCount, hideIcons, openMeditation, isMeditation}) => {  
  return(
    <div id="options" style={{ visibility: hideIcons ? 'hidden' : 'visible' }}>
      {isMeditation 
        ? <Icon id="close-meditation" className="icon" icon="mdi:keyboard-backspace" height={35} onClick={() => openMeditation()} />
        : <>
            <Soundscapes hideIcons={hideIcons} />
            <Icon id="meditation" className="icon" icon="mdi:meditation" height={35} onClick={() => openMeditation()} />
            <Icon id="reset" className="icon" icon="ei:undo" height={35} onClick={() => triggerReset()} />
            <p style={{ marginRight: "10px" }}>Interval: {intervalCount}</p>
            <p>Session: {sessionCount}</p>
          </>
      }
    </div>
  )
}

export default NavOptions