import React, { useState, useEffect } from 'react'
import './navbar.css'
import { Icon } from '@iconify/react'

const Navbar = () => {
  /* const [isPlaying, setIsPlaying] = useState(false) */
  const [rain, setRain] = useState()
  const [music, setMusic] = useState()
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    let rainSound = new Audio('https://github.com/Schlenges/uploads/blob/main/rain.wav?raw=true')
    rainSound.type = 'audio/wav'
    rainSound.loop = true

    let music = new Audio('https://www.gstatic.com/semantris/arcade_music.mp3')
    music.type = 'audio/mpeg'
    music.loop = true
    
    setRain(rainSound)
    setMusic(music)
  }, [])

  const playSound = (id) => {
    let audio

    switch(id) {
      case 'music':
        audio = music
        break
      case 'rain':
        audio = rain
        break
      default:
        break
    }

    let classes = document.getElementById(id).classList
    let isPlaying = classes.contains("active")

    if(isPlaying){
      audio.pause()
      classes.remove("active")
    } else{
      audio.play()
      classes.add("active")
    }
  }

  return(
    <div id="navbar">
      <Icon id="sounds" className="icon" icon="fluent:headphones-sound-wave-20-filled" height={30} onClick={() => setShowMenu(!showMenu)}/>
      <div id="soundsContainer" style={{ "visibility": showMenu ? "visible" : "hidden" }} >
        <Icon id="music" className="sounds icon" icon="carbon:music" height={20} onClick={() => playSound('music')}/>
        <Icon id="rain" className="sounds icon" icon="carbon:rain" height={20} onClick={() => playSound('rain')}/>
      </div>
      <Icon id="meditation" className="icon" icon="mdi:meditation" height={35} />
      <Icon id="reset" className="icon" icon="ei:undo" height={35} />
      <Icon id="settings" className="icon" icon="fa-solid:user-clock" height={25} />
    </div>
  )
}

export default Navbar