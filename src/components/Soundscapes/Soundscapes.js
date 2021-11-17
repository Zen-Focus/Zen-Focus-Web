import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'

import './soundscapes.css'

import soundData from '../../soundData.js'

const Soundscapes = () => {
  const [showSounds, setShowSounds] = useState(false)
  const [sounds, setSounds] = useState([])
  const [selectedSounds, setSelectedSounds] = useState([])
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    let sounds = soundData.map(sound => ({...sound, audio: createAudio(sound.src, sound.type)}))
    setSounds(sounds)
  }, [])

  const createAudio = (source, type) => {
    let audio = new Audio(source)
    audio.type = type
    audio.loop = true
    audio.volume = 0.5
    return audio
  }

  const muteToggle = () => {
    document.getElementById('mute').classList.toggle("active")
    selectedSounds.forEach((id) => togglePlay(id))
    setIsMuted(!isMuted)
  }

  const togglePlay = (id) => {
    let [sound] = sounds.filter(({id: soundId}) => soundId === id)
    let audio = sound.audio
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

  const controleVolume = (event, id) => {
    let [sound] = sounds.filter(({id: soundId}) => soundId === id)
    sound.audio.volume = event.target.value / 10
    setSounds([...sounds.filter(({id: soundId}) => soundId !== id),  sound])
  }

  return(
    <div>
      <Icon id="sounds" className="icon" icon="fluent:headphones-sound-wave-20-filled" height={30} onClick={() => setShowSounds(!showSounds)}/>
      <div id="soundsContainer" style={{ "visibility": showSounds ? "visible" : "hidden" }} >
        <Icon id="mute" className="sounds icon" icon="carbon:volume-mute" height={20} onClick={() => muteToggle()}/>
        <span className="sound-item">
          <Icon id="music" className="sounds icon" icon="carbon:music" height={20} onClick={() => playSound('music')}/>
          <input min="1" max="10" type="range" defaultValue="5" onChange={(event) => controleVolume(event, 'music')}/>
        </span>
        <span className="sound-item">
          <Icon id="rain" className="sounds icon" icon="carbon:rain" height={20} onClick={() => playSound('rain')}/>
          <input min="1" max="10" type="range" defaultValue="5" onChange={(event) => controleVolume(event, 'rain')}/>
        </span>
      </div>
    </div>
  )
}

export default Soundscapes