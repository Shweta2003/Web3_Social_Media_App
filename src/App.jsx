import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Navbar from './components/Navbar/Navbar'
import {createContext, useRef } from 'react';
import ABI from './components/common/ABI'
import Web3 from 'web3';


export const WebVariable = createContext();


const App = () => {
  const isConnected = useRef(false);
  const web3 = useRef();
  const contract = useRef();
  const account = useRef();

  const makeConnection = () => {
    isConnected.current = !isConnected.current;
  }

  const NewWeb3 = async() => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const get = new Web3(window.ethereum);
    web3.current = get;

    const userAccount = await get.eth.getAccounts();
    account.current = userAccount[0];

    // setting connection to contract
    contract.current = new get.eth.Contract(ABI, "0x0335A65380158320dEC6F9b5D7d79cf7134D560C");
  }

  const OldUser = async() => {
    const result = await contract.current.methods.Get_registered().call();
    const newres = result.filter(acc => (acc === account.current))
    if(newres.length > 0){
      return true;
    }else{
      return false;
    }
  }

  return (
    <div>
      <WebVariable.Provider value={{isConnected, web3, contract, account, NewWeb3, makeConnection, OldUser}}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/editMyProfile' element={<EditProfile />} />

      </Routes>
      </WebVariable.Provider>
    </div>
  )
}

export default App