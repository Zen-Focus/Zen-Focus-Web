import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Timer from './components/Timer'
import SettingsMenu from './components/SettingsMenu'
/* import Footer from './components/Footer' */

function App() {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div id="app">
      <Navbar openSettings={() => setShowSettings(!showSettings)} hideIcons={showSettings} />
      { showSettings
        ? <SettingsMenu />
        : null
      }
      <Timer hidden={showSettings} />
      {/* <Footer /> */}
    </div>
  )
}

export default App