import React from 'react'
import { Icon } from '@iconify/react'

import './footer.css'

const Footer = ({ hidden, triggerSkip }) => {
  return (
    <div id="footer" style={{ visibility: hidden ? "hidden" : "visible" }}>
      <Icon id="skipBtn" className="icon" icon="bi:skip-end" height="30" onClick={() => triggerSkip()} />
    </div>
  )
}

export default Footer