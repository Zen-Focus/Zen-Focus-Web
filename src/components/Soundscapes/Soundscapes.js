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
    Object.values(soundData).forEach(sound => sound['audio'] = createAudio(sound.id, sound.src, sound.type))
    setSounds(soundData)
  }, []) //eslint-disable-line

  const createAudio = (id, source, type) => {
    let audio = new Audio(source)
    audio.type = type
    audio.loop = true
    audio.volume = 0.5
    audio.addEventListener('playing', () => play(id))
    audio.addEventListener('pause', () => pause(id))
    return audio
  }

  const play = (id) => {
    document.getElementById(id).classList.add('active')
    toggleSelect(id)
  }

  const pause = (id) => {
    document.getElementById(id).classList.remove('active')
    toggleSelect(id)
  }

  const muteToggle = () => {
    document.getElementById('mute').classList.toggle("active")
    selectedSounds.forEach((id) => toggleMute(id))
    setIsMuted(!isMuted)
  }

  const toggleMute = (id) => {
    let [sound] = Object.values(sounds).filter(({id: soundId}) => soundId === id)
    let audio = sound.audio

    audio.muted = !audio.muted

    document.getElementById(id).classList.toggle('active')
  }

  const togglePlay = (id) => {
    let [sound] = Object.values(sounds).filter(({id: soundId}) => soundId === id)
    let audio = sound.audio

    audio.paused ? audio.play() : audio.pause()
  }

  const toggleSelect = (id) => {
    if(!isMuted){
      setSelectedSounds((selectedSounds) => 
        selectedSounds.includes(id)
          ? selectedSounds.filter((sound) => sound !== id)
          : [...selectedSounds, id]
      )
    }
  }

  const toggleSound = (id) => {
    if(!isMuted){
      togglePlay(id)
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
          <SoundOption key={sound.id} sound={sound} toggleSound={toggleSound} controleVolume={controleVolume} />
        )}
      </div>
    </div>
  )
}

export default Soundscapes