import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import SoundOption from './SoundOption'
import './soundscapes.css'

import soundData from '../../soundData.js'

const Soundscapes = () => {
  const [showSounds, setShowSounds] = useState(false)
  const [sounds, setSounds] = useState({})
  const [selectedSounds, setSelectedSounds] = useState([])
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    Object.values(soundData).forEach(sound => sound['audio'] = createAudio(sound.src, sound.type))
    setSounds(soundData)
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
    let [sound] = Object.values(sounds).filter(({id: soundId}) => soundId === id)
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
    let [sound] = Object.values(sounds).filter(({id: soundId}) => soundId === id)
    sound.audio.volume = event.target.value / 10
    setSounds(sounds)
  }

  return(
    <div>
      <Icon id="sounds" className="icon" icon="fluent:headphones-sound-wave-20-filled" height={30} onClick={() => setShowSounds(!showSounds)}/>
      <div id="soundsContainer" style={{ "visibility": showSounds ? "visible" : "hidden" }} >
        <Icon id="mute" className="sounds icon" icon="carbon:volume-mute" height={20} onClick={() => muteToggle()}/>
        {Object.values(sounds).map((sound) => 
          <SoundOption key={sound.id} sound={sound} playSound={playSound} controleVolume={controleVolume} />
        )}
      </div>
    </div>
  )
}

export default Soundscapes