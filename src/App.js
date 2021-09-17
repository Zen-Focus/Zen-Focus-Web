import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Timer from './components/Timer'
import Footer from './components/Footer'

function App() {
  return (
    <div id="app">
      <Navbar />
      <Timer />
      <Footer />
    </div>
  )
}

export default App