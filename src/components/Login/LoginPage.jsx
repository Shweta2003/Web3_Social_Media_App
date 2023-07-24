import { useState, useEffect } from 'react';
import classes from './Login.module.css'
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

  const [isConnected, setIsConnected] = useState(localStorage.getItem('isConnected') === 'true');
  const [ethBalance, setEthBalance] = useState("");

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Please install Metamask");
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
        localStorage.setItem('isConnected', 'true'); // Store isConnected in local storage
        navigate('/home'); // Redirect to the home page
      }
    } catch (err) {
      console.log(err);
    }
  }

  const onDisconnect = () => {
    setIsConnected(false);
    localStorage.setItem('isConnected', 'false'); // Store isConnected in local storage
  }



  return (
    <div className="app">
      <div>
        {!isConnected && (
          <div>
            <button onClick={onConnect}>
              Login
            </button>
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
            <button onClick={onDisconnect}>
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;





// import { useState, useEffect } from 'react';
// import classes from './Login.module.css'
// import Web3 from 'web3';

// function LoginPage() {

//   const [isConnected, setIsConnected] = useState(false);
//   const [ethBalance, setEthBalance] = useState("");

//   const detectCurrentProvider = () => {
//     let provider;
//     if (window.ethereum) {
//       provider = window.ethereum;
//     } else if (window.web3) {
//       provider = window.web3.currentProvider;
//     } else {
//       console.log("Please install Metamask");
//     }
//     return provider;
//   };

//   const onConnect = async () => {
//     try {
//       const currentProvider = detectCurrentProvider();
//       if (currentProvider) {
//         await currentProvider.request({ method: 'eth_requestAccounts' });
//         const web3 = new Web3(currentProvider);
//         const userAccount = await web3.eth.getAccounts();
//         const account = userAccount[0];
//         let ethBalance = await web3.eth.getBalance(account);
//         // Convert the balance from Wei to Ether (ETH)
//         const balanceInEther = web3.utils.fromWei(ethBalance, 'ether');
//         setEthBalance(balanceInEther);
//         setIsConnected(true);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   const onDisconnect = () => {
//     setIsConnected(false);
//   }



//   return (
//     <div className="app">
//       <div>
//         {!isConnected && (
//           <div>
//             <button onClick={onConnect}>
//               Login
//             </button>
//           </div>
//         )}
//       </div>
//       {isConnected && (
//         <div>
//           <div>
//             <h2> You are connected to metamask.</h2>
//             <div>
//               Balance: {ethBalance} ETH
//             </div>
//           </div>
//           <div>
//             <button onClick={onDisconnect}>
//               Disconnect
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LoginPage;
