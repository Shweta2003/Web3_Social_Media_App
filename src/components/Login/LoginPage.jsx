import React, { useState } from 'react';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';

function LoginPage({ onLogin }) {
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState('');

  const navigate = useNavigate();

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log('Please install Metamask');
    }
    return provider;
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        // Convert the balance from Wei to Ether (ETH)
        const balanceInEther = web3.utils.fromWei(ethBalance, 'ether');
        setEthBalance(balanceInEther);
        setIsConnected(true);
        console.log('onConnect LoginPage');
        onLogin(); // Call the onLogin callback to set isLoggedIn state in App.js
        //navigate('/home'); // Navigate to the home page after login
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <div className="app">
      <div>
        {!isConnected && (
          <div>
            <button onClick={onConnect}>Login</button>
          </div>
        )}
      </div>
      {isConnected && (
        <div>
          <div>
            <h2> You are connected to metamask.</h2>
            <div>
              Balance: {ethBalance} ETH
            </div>
          </div>
          <div>
            <button onClick={onDisconnect}>Disconnect</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
