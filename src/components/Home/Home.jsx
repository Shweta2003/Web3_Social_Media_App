import React, {useState} from 'react'
import Web3 from 'web3';

import { useLocation } from 'react-router-dom';

const Home = () => {

  const location = useLocation();
  const address = location.state.acc;
  return (
    <div>Home connected to : {address}
    </div>
  )
}

export default Home