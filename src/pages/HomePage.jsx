import React from 'react'
import Home from '../components/Home/Home'
import NavAfterLogin from '../components/Navbar/NavAfterLogin'

const HomePage = () => {
  return (
    <>
      <NavAfterLogin />
      <Home />
    </>
  )
}

export default HomePage