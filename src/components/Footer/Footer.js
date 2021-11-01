import React from 'react'
import { Icon } from '@iconify/react'

import './footer.css'

const Footer = () => {

  return(
    <div id="footer">
      {/* <Icon id="reset" className="icon" icon="ei:undo" color="#ffffff" height={35} /> */}
      <Icon id="skipBtn" className="icon" icon="bi:skip-end" height="30" />
    </div>
  )
}

export default Footer