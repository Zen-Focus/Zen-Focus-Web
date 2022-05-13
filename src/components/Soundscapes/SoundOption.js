import React, { useState } from "react"
import { Icon } from '@iconify/react'

const SoundOption = ({ sound, toggleSound, controlVolume, isMuted }) => {
  const [volume, setVolume] = useState(5)

  const handleClick = (id) => {
    if (sound.audio.volume === 0 && !isMuted) {
      sound.audio.volume = 0.1
    }
    toggleSound(id)
  }

  const handleChange = (val) => {
    setVolume(val)
    controlVolume(val, sound.id)
  }

  React.useEffect(() => {
    setVolume(sound.audio.volume * 10)
  }, [sound.audio.volume])

  return (
    <span className="sound-item">
      <Icon id={sound.id} className="sounds icon" icon={sound.icon} height={20} onClick={() => handleClick(sound.id)} />
      <input
        min="0" max="10"
        type="range"
        value={volume}
        onChange={(event) => handleChange(event.target.value)}
        onClick={() => controlVolume(volume, sound.id)}
      />
    </span>
  )
}

export default SoundOption