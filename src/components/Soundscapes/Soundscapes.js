import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import SoundOption from './SoundOption'
import './soundscapes.css'

import soundData from '../../soundData.js'

const Soundscapes = ({ hideIcons }) => {
  const [showSounds, setShowSounds] = useState(false)
  const [sounds, setSounds] = useState({})
  const [selectedSounds, setSelectedSounds] = useState([])
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    Object.values(soundData).forEach(sound => sound['audio'] = createAudio(sound.id, sound.src, sound.type))
    setSounds(soundData)
  }, []) //eslint-disable-line

  useEffect(() => {
    if (hideIcons) {
      setShowSounds(false)
    }
  }, [hideIcons])

  const createAudio = (id, source, type) => {
    let audio = new Audio(source)
    audio.type = type
    audio.loop = true
    audio.volume = 0.5
    audio.onplaying = () => document.getElementById(id).classList.add('active')
    audio.onpause = () => document.getElementById(id).classList.remove('active')
    return audio
  }

  const muteToggle = () => {
    document.getElementById('mute').classList.toggle("active")
    selectedSounds.forEach((id) => {
      if (Object.values(sounds).filter(({ id: soundId }) => soundId === id)[0].audio.volume > 0) {
        togglePlay(id)

      } else {
        toggleSelect(id)
      }
    })
    setIsMuted(!isMuted)
  }

  const toggleSound = (id) => {
    if (!isMuted) {
      togglePlay(id)
      toggleSelect(id)
    }
  }

  const togglePlay = (id) => {
    let [sound] = Object.values(sounds).filter(({ id: soundId }) => soundId === id)
    let audio = sound.audio

    audio.paused
      ? audio.play()
      : audio.pause()
  }

  const toggleSelect = (id) => {
    setSelectedSounds((selectedSounds) =>
      selectedSounds.includes(id)
        ? selectedSounds.filter((sound) => sound !== id)
        : [...selectedSounds, id]
    )
  }

  const controlVolume = (vol, id) => {
    let [sound] = Object.values(sounds).filter(({ id: soundId }) => soundId === id)
    let value = Number(vol)
    sound.audio.volume = value / 10

    if (value > 0 && sound.audio.paused) {
      toggleSound(id)
    }

    if (value === 0 && !sound.audio.paused) {
      toggleSound(id)
    }

    setSounds(sounds)
  }

  return (
    <div>
      <Icon id="sounds" className="icon" icon="fluent:headphones-sound-wave-20-filled" height={30} onClick={() => setShowSounds(!showSounds)} />
      <div id="soundsContainer" style={{ "visibility": showSounds ? "visible" : "hidden" }} >
        <Icon id="mute" className="sounds icon" icon="carbon:volume-mute" height={20} onClick={() => muteToggle()} />
        {Object.values(sounds).map((sound) =>
          <SoundOption key={sound.id} sound={sound} toggleSound={toggleSound} controlVolume={controlVolume} isMuted={isMuted} />
        )}
      </div>
    </div>
  )
}

export default Soundscapes