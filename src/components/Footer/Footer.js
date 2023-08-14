import React from 'react'
import { Icon } from '@iconify/react'

import './footer.css'

const Footer = ({ hidden, triggerSkip, additionTime=5, timeAddition }) => {
  return (
    <div id="footer" style={{ visibility: hidden ? "hidden" : "visible" }}>
      <span>
        <Icon id="add-time" className="icon" icon="bi:plus-circle-dotted" height="30" onClick={() => timeAddition()} />
        {additionTime} minutes
      </span>
      <Icon id="skipBtn" className="icon" icon="bi:skip-end" height="30" onClick={() => triggerSkip()} />
    </div>
  )
}

export default Footer