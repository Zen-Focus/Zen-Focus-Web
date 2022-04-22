import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Timer from './components/Timer/Timer'
import SettingsMenu from './components/SettingsMenu/SettingsMenu'
import Footer from './components/Footer/Footer'

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [reset, setReset] = useState(false)
  const [skip, setSkip] = useState()
  const [intervalCount, setIntervalCount] = useState(0)
  const [sessionCount, setSessionCount] = useState(1)

  const triggerReset = () => setReset(reset => !reset)
  const triggerSkip = () => {
    setSkip(true)
  }

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
        triggerReset={triggerReset} 
        intervalCount={intervalCount} 
        sessionCount={sessionCount}
      />
      { showSettings
        ? <SettingsMenu />
        : null
      }
      <Timer hidden={showSettings} reset={reset} setIntervalCount={setIntervalCount} intervalCount={intervalCount} skip={skip} setSkip={setSkip}/>
      <Footer hidden={showSettings} triggerSkip={triggerSkip} />
    </div>
  )
}

export default App