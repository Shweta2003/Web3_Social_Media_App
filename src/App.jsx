import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/home' element={<HomePage />}/>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/edit' element={<EditProfile />}/>

    </Routes>
  )
}

export default App