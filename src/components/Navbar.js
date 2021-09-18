import React, { useState, useEffect } from 'react'
import './navbar.css'
import { Icon } from '@iconify/react'

const Navbar = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState()

  useEffect(() => {
    let rainSound = new Audio('https://github.com/Schlenges/uploads/blob/main/rain.wav?raw=true')
    rainSound.type = 'audio/wav'
    rainSound.loop = true
    setAudio(rainSound)
  }, [])

  const playSound = () => {
    isPlaying ? audio.pause() : audio.play()

    setIsPlaying(!isPlaying)
  }

  return(
    <div id="navbar">
      <Icon id="sounds" className="icon" icon="fluent:headphones-sound-wave-20-filled" height={30} onClick={playSound}/>
      <Icon id="meditation" className="icon" icon="mdi:meditation" height={35} />
      <Icon id="reset" className="icon" icon="ei:undo" height={35} />
      <Icon id="settings" className="icon" icon="fa-solid:user-clock" height={25} />
    </div>
  )
}

export default Navbar