import React, {useState} from 'react'
import Web3 from 'web3';

import { useLocation } from 'react-router-dom';

const Home = () => {

  const location = useLocation;
  console.log(location)
  return (
    <div>Home connected to : 
    </div>
  )
}

export default Home