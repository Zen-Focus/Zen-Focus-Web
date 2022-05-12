import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Timer from './components/Timer/Timer'
import Meditation from './components/Meditation/Meditation'
import SettingsMenu from './components/SettingsMenu/SettingsMenu'
import Footer from './components/Footer/Footer'

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [showMeditation, setShowMeditation] = useState(false)
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
        openMeditation={() => setShowMeditation(!showMeditation)}
        hideIcons={showSettings}
        isMeditation={showMeditation}
        triggerReset={triggerReset} 
        intervalCount={intervalCount} 
        sessionCount={sessionCount}
      />
      { showSettings
        ? <SettingsMenu />
        : null
      }
      { showMeditation
        ? <Meditation inhale={4} exhale={4} hold={4} />
        : null
      }
      <Timer hidden={showSettings || showMeditation} reset={reset} setIntervalCount={setIntervalCount} intervalCount={intervalCount} skip={skip} setSkip={setSkip}/>
      <Footer hidden={showSettings || showMeditation} triggerSkip={triggerSkip} />
    </div>
  )
}

export default App