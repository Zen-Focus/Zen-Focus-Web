import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Timer from './components/Timer/Timer'
import SettingsMenu from './components/SettingsMenu/SettingsMenu'
/* import Footer from './components/Footer' */

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [reset, setReset] = useState(false)
  const [intervalCount, setIntervalCount] = useState(0)
  const [sessionCount, setSessionCount] = useState(1)

  useEffect(() => {
    if(intervalCount >= 5){
      setIntervalCount(1)
      setSessionCount(sessionCount+1)
    }
  }, [intervalCount]) // eslint-disable-line

  return (
    <div id="app">
      <Navbar 
        openSettings={() => setShowSettings(!showSettings)} 
        hideIcons={showSettings} 
        setReset={setReset} 
        intervalCount={intervalCount} 
        sessionCount={sessionCount}
      />
      { showSettings
        ? <SettingsMenu />
        : null
      }
      <Timer hidden={showSettings} reset={reset} setReset={setReset} setIntervalCount={setIntervalCount} intervalCount={intervalCount} />
      {/* <Footer /> */}
    </div>
  )
}

export default App