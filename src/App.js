import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Timer from './components/Timer'
import SettingsMenu from './components/SettingsMenu'
/* import Footer from './components/Footer' */

function App() {
  const [openSettings, setOpenSettings] = useState(false)

  return (
    <div id="app">
      <Navbar openSettings={() => setOpenSettings(!openSettings)} hideIcons={openSettings} />
      { openSettings
        ? <SettingsMenu />
        : <Timer />
      }
      {/* <Footer /> */}
    </div>
  )
}

export default App