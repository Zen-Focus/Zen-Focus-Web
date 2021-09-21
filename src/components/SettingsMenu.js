import React from 'react'
import './settingsMenu.css'

const Option = ({label, value}) => <p className="optionsText">{label} <span className="optionsValue">{value}</span></p>

const SettingsMenu = () => {

  return(
    <div id="settingsMenu">
      <h2 className="heading">Pomodoro</h2>
      <Option label="Session Length:" value={`${25} min`} />
      <Option label="Short Break Length:" value={`${5} min`} />
      <Option label="Long Break Length:" value={`${15} min`} />
      <br/>
      <h2 className="heading">Box Breathing</h2>
      <Option label="Inhalation:" value={`${4} s`} />
      <Option label="Exhalation:" value={`${4} s`} />
      <Option label="Hold:" value={`${4} s`} />
    </div>
  )
}

export default SettingsMenu