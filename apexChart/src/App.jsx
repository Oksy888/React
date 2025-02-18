import React, { Component } from 'react'
import AppexChart from './components/ApexChart'
import * as authorState from '../response.json'

const App = () => {
  const { videoRised, states } = authorState

  return (
    <div className="mixed-chart">
      <AppexChart states={states} videoRised={videoRised} />
    </div>
  )
}

export default App
