import React from "react"
import { Icon } from '@iconify/react'

const SoundOption = ({sound, playSound, controleVolume}) => {
  return(
    <span className="sound-item">
      <Icon id={sound.id} className="sounds icon" icon={sound.icon} height={20} onClick={() => playSound(sound.id)}/>
      <input min="1" max="10" type="range" defaultValue="5" onChange={(event) => controleVolume(event, sound.id)}/>
    </span>
  )
}

export default SoundOption