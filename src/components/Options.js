import React from 'react'
import Soundscapes from './Soundscapes'
import { Icon } from '@iconify/react'

const Options = () => {
  
  return(
    <div id="options">
      <Soundscapes />
      <Icon id="meditation" className="icon" icon="mdi:meditation" height={35} />
      <Icon id="reset" className="icon" icon="ei:undo" height={35} />
    </div>
  )
}

export default Options