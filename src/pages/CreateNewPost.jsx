import React from 'react'
import NewPost from '../components/NewPost/NewPost'
import NavAfterLogin from '../components/Navbar/NavAfterLogin'

const CreateNewPost = () => {
    return (
      <>
        <NavAfterLogin/>
        <NewPost/>
      </>
    )
  }
  
  export default CreateNewPost