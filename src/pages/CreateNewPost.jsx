import React from 'react'
import NavAfterLogin from '../components/Navbar/NavAfterLogin'
import AddNewPost from '../components/NewPost/AddNewPost'

const CreateNewPost = () => {
    return (
      <>
        <NavAfterLogin/>
        <AddNewPost/>
      </>
    )
  }
  
  export default CreateNewPost