import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import './settingsMenu.css'

const Option = ({ label, unit, setState, value, range }) => (
  <p className="optionsText">
    {label}
    <span className="optionsValue">
      <input
        min={range[0]} max={range[1]}
        type="range"
        value={value}
        onChange={(e) => setState(e.target.value)}
      />
      <span className="menu-input-value">{value}</span> {unit}
    </span>
  </p>
)

const InputOption = ({ label, unit, setState, value, range }) => (
  <p className="optionsText">
    {label}
    <span className="optionsValue">
      <input
        min={range[0]} max={range[1]}
        type="text"
        value={value}
        onChange={(e) => setState(e.target.value)}
        pattern="[0-9]+"
      />
      {unit}
    </span>
  </p>
)

const SettingsMenu = () => {
  const [intervalLength, setIntervalLength] = useState(localStorage.getItem('zenIntervalLength'))
  const [shortBreak, setShortBreak] = useState(localStorage.getItem('zenShortBreak'))
  const [longBreak, setLongBreak] = useState(localStorage.getItem('zenLongBreak'))
  const [inhalation, setInhalation] = useState(localStorage.getItem('zenInhalation'))
  const [exhalation, setExhalation] = useState(localStorage.getItem('zenExhalation'))
  const [inhaleHold, setInhaleHold] = useState(localStorage.getItem('zenInhaleHold'))
  const [exhaleHold, setExhaleHold] = useState(localStorage.getItem('zenExhaleHold'))
  const timerRange = [1, 90]
  const meditationRange = [1, 30]

  useEffect(() => {
    localStorage.setItem('zenIntervalLength', intervalLength)
    localStorage.setItem('zenShortBreak', shortBreak)
    localStorage.setItem('zenLongBreak', longBreak)
    localStorage.setItem('zenInhalation', inhalation)
    localStorage.setItem('zenExhalation', exhalation)
    localStorage.setItem('zenInhaleHold', inhaleHold)
    localStorage.setItem('zenExhaleHold', exhaleHold)

  }, [intervalLength, shortBreak, longBreak, inhalation, exhalation, inhaleHold, exhaleHold]) //eslint-disable-line

  return (
    <div id="settingsMenu">
      <h2 className="heading">Pomodoro</h2>
      <InputOption label="Interval Length:" unit={'min'} value={intervalLength} setState={setIntervalLength} range={timerRange} />
      <InputOption label="Short Break Length:" unit={'min'} value={shortBreak} setState={setShortBreak} range={timerRange} />
      <InputOption label="Long Break Length:" unit={'min'} value={longBreak} setState={setLongBreak} range={timerRange} />
      <br />
      <h2 className="heading">Breathing Meditation</h2>
      <InputOption label="Inhalation:" unit={'sec'} value={inhalation} setState={setInhalation} range={meditationRange} />
      <InputOption label="Exhalation:" unit={'sec'} value={exhalation} setState={setExhalation} range={meditationRange} />
      <InputOption label="Inhale Hold:" unit={'sec'} value={inhaleHold} setState={setInhaleHold} range={[0, 30]} />
      <InputOption label="Exhale Hold:" unit={'sec'} value={exhaleHold} setState={setExhaleHold} range={[0, 30]} />

      <div id="settings-footer">
        <a href="https://github.com/Zen-Focus/Zen-Focus-Web" target="_blank" rel="noopener noreferrer" className="settings-link">
          <Icon id="github" className="icon" icon="fa-brands:github-square" height={20} />
          <span className="settings-link-text">Repository</span>
        </a>
        <a href="https://ko-fi.com/mhanki" target="_blank" rel="noopener noreferrer" className="settings-link">
          <Icon id="ko-fi" className="icon" icon="simple-icons:kofi" height={22} />
          <span className="settings-link-text">Support on Ko-Fi</span>
        </a>
      </div>
    </div>
  )
}

export default SettingsMenu