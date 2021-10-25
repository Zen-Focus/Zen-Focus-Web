import React from 'react'
import Soundscapes from '../Soundscapes/Soundscapes'
import { Icon } from '@iconify/react'

const NavOptions = ({setReset, intervalCount}) => {

  const reset = () => {
    setReset(true)
  }
  
  return(
    <div id="options">
      <Soundscapes />
      <Icon id="meditation" className="icon" icon="mdi:meditation" height={35} />
      <Icon id="reset" className="icon" icon="ei:undo" height={35} onClick={reset} />
      <p>Interval: {intervalCount}</p>
    </div>
  )
}

export default NavOptions