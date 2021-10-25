import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Timer from './components/Timer/Timer'
import SettingsMenu from './components/SettingsMenu/SettingsMenu'
/* import Footer from './components/Footer' */

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [reset, setReset] = useState(false)

  return (
    <div id="app">
      <Navbar openSettings={() => setShowSettings(!showSettings)} hideIcons={showSettings} setReset={setReset} />
      { showSettings
        ? <SettingsMenu />
        : null
      }
      <Timer hidden={showSettings} reset={reset} setReset={setReset} />
      {/* <Footer /> */}
    </div>
  )
}

export default App