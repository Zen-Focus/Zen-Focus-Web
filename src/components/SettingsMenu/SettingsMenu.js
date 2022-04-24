import React, { useState, useEffect } from 'react'
import './settingsMenu.css'

const Option = ({label, unit, setState, value}) => (
  <p className="optionsText">
    {label} 
    <span className="optionsValue">
    <input 
        min="1" max="60" 
        type="range" 
        value={value}
        onChange={(e) => setState(e.target.value)}
      />
      {/* <input type="number" min="1" max="60" className="valueInput" value={value} onChange={(e) => setState(e.target.value)}/> */}
      <span className="menu-input-value">{value}</span> {unit}
    </span>
  </p>
)

const SettingsMenu = () => {
  const [intervalLength, setIntervalLength] = useState(localStorage.getItem('zenIntervalLength'))
  const [shortBreak, setShortBreak] = useState(localStorage.getItem('zenShortBreak'))
  const [longBreak, setLongBreak] = useState(localStorage.getItem('zenLongBreak'))
  /* const [inhalation, setInhalation] = useState(localStorage.getItem('zenInhalation'))
  const [exhalation, setExhalation] = useState(localStorage.getItem('zenExhalation'))
  const [hold, setHold] = useState(localStorage.getItem('zenHold')) */

  useEffect(() => {
    localStorage.setItem('zenIntervalLength', intervalLength)
    localStorage.setItem('zenShortBreak', shortBreak)
    localStorage.setItem('zenLongBreak', longBreak)
    /* localStorage.setItem('zenInhalation', inhalation)
    localStorage.setItem('zenExhalation', exhalation)
    localStorage.setItem('zenHold', hold) */

  }, [intervalLength, shortBreak, longBreak/* , inhalation, exhalation, hold */]) //eslint-disable-line

  return(
    <div id="settingsMenu">
      <h2 className="heading">Pomodoro</h2>
      <Option label="Interval Length:" unit={'min'} value={intervalLength} setState={setIntervalLength}/>
      <Option label="Short Break Length:" unit={'min'} value={shortBreak} setState={setShortBreak} />
      <Option label="Long Break Length:" unit={'min'} value={longBreak} setState={setLongBreak} />
      <br/>
      {/* <h2 className="heading">Box Breathing</h2>
      <Option label="Inhalation:" unit={'s'} value={inhalation} setState={setInhalation} />
      <Option label="Exhalation:" unit={'s'} value={exhalation} setState={setExhalation} />
      <Option label="Hold:" unit={'s'} value={hold} setState={setHold} /> */}
    </div>
  )
}

export default SettingsMenu