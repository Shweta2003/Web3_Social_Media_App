import React, { useState } from 'react'
import profile from '../../Assets/profile.jpg'
import abi from '../common/ABI'
import Web3 from 'web3'
import classes from './ProfilePage.module.css'

const EditProfilePage = (props) => {

  // web3 connection
  const [web3, setWeb3] = useState(null);
  const [contract, setcontract] = useState(null);

  async function initializeWeb3() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const tempWeb3 = new Web3(window.ethereum);
        setWeb3(tempWeb3);
        const tempContract = new tempWeb3.eth.Contract(abi, "0xc1EF376e2B5c0bA6A90566d137F8880B575E7cc3");
        setcontract(tempContract);
        console.log(contract);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("MetaMask extension not detected");
    }
  }

  const handleSubmit = () => {

  }
  return (
    <div className={classes.main}>
      <form onSubmit={handleSubmit}>

      </form>
    </div>
  )
}

export default EditProfilePage