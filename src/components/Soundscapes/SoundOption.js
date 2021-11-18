import React from "react"
import { Icon } from '@iconify/react'

const SoundOption = ({sound, toggleSound, controlVolume}) => {
  return(
    <span className="sound-item">
      <Icon id={sound.id} className="sounds icon" icon={sound.icon} height={20} onClick={() => toggleSound(sound.id)}/>
      <input 
        min="0" max="10" 
        type="range" 
        defaultValue="5" 
        onChange={(event) => controlVolume(event, sound.id)} 
        onClick={(event) => controlVolume(event, sound.id)}
      />
    </span>
  )
}

export default SoundOption