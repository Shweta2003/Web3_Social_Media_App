import React from 'react'
import ProfilePage from '../components/ProfilePage/ProfilePage'
import NavAfterLogin from '../components/Navbar/NavAfterLogin'

const Profile = () => {
  return (
    <>
      <NavAfterLogin/>
      <ProfilePage />
    </>
  )
}

export default Profile