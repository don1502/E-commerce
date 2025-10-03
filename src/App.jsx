import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import AboutView from './components/AboutView'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
        <Navbar />
        <Home />
        <AboutView />

    </div>
  )
}

export default App;