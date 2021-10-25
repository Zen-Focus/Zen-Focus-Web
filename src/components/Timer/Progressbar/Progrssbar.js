import React from 'react'

const Progressbar = () => {
  const RADIUS = 120

  return(
    <svg id="svg" width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle id="barContainer" r={RADIUS} cx="100" cy="100" fill="transparent" strokeDasharray={2*Math.PI*RADIUS} strokeDashoffset="0"></circle>
      <circle id="bar" r={RADIUS} cx="100" cy="100" fill="transparent" strokeDasharray={2*Math.PI*RADIUS} strokeDashoffset="0"></circle>
    </svg>
  )
}

export default Progressbar