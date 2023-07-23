import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'

import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <div>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/home' element={<HomePage />}/>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/edit' element={<EditProfile />}/>

    </Routes>
    </div>
  )
}

export default App