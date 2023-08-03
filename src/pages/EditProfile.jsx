import React from 'react'
import EditMe from '../components/ProfilePage/EditMe'
import NavAfterLogin from '../components/Navbar/NavAfterLogin'

const EditProfile = () => {
  return (
    <>
      <NavAfterLogin/>
      <EditMe/>
    </>
  )
}

export default EditProfile