import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'

const Options = () => {
  const [sounds, setSounds] = useState([])
  const [selectedSounds, setSelectedSounds] = useState([])
  const [isMuted, setIsMuted] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    let rainSound = new Audio('https://github.com/Schlenges/uploads/blob/main/rain.wav?raw=true')
    rainSound.type = 'audio/wav'
    rainSound.loop = true

    let music = new Audio('https://www.gstatic.com/semantris/arcade_music.mp3')
    music.type = 'audio/mpeg'
    music.loop = true
    
    setSounds([
      ["rain", rainSound],
      ["music", music]
    ])
  }, [])

  const muteToggle = () => {
    document.getElementById('mute').classList.toggle("active")
    selectedSounds.forEach((id) => togglePlay(id))
    setIsMuted(!isMuted)
  }

  const togglePlay = (id) => {
    let audio = sounds.filter(([soundId]) => soundId === id)[0][1]
    let classList = document.getElementById(id).classList
    let isPlaying = classList.contains("active")

    isPlaying ? audio.pause() : audio.play()
    classList.toggle("active")
  }

  const playSound = (id) => {
    if(!isMuted){
      togglePlay(id)
      selectedSounds.includes(id) 
        ? setSelectedSounds(selectedSounds.filter((sound) => sound !== id)) 
        : setSelectedSounds([...selectedSounds, id])
    }
  }

  return(
    <div id="options">
      <Icon id="sounds" className="icon" icon="fluent:headphones-sound-wave-20-filled" height={30} onClick={() => setShowMenu(!showMenu)}/>
      <div id="soundsContainer" style={{ "visibility": showMenu ? "visible" : "hidden" }} >
        <Icon id="mute" className="sounds icon" icon="carbon:volume-mute" height={20} onClick={() => muteToggle()}/>
        <Icon id="music" className="sounds icon" icon="carbon:music" height={20} onClick={() => playSound('music')}/>
        <Icon id="rain" className="sounds icon" icon="carbon:rain" height={20} onClick={() => playSound('rain')}/>
      </div>
      <Icon id="meditation" className="icon" icon="mdi:meditation" height={35} />
      <Icon id="reset" className="icon" icon="ei:undo" height={35} />
    </div>
  )
}

export default Options