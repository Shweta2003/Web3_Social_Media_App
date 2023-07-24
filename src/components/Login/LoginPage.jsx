import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css'
import abi from '../common/ABI'
import Web3 from 'web3';
function LoginPage() {

  const [isConnected, setIsConnected] = useState(false);
  let my;

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      alert("Please install Metamask!!");
    }
    return provider;
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {

        // connecting to metamask account
        await currentProvider.request({ method: 'eth_requestAccounts' });
        const web3a = new Web3(currentProvider);

        // getting account name
        const userAccount = await web3a.eth.getAccounts();
        const account = userAccount[0];

        // setting connection to contract
        const tempContract = await new web3a.eth.Contract(abi, "0x3576317730B03C389836edf78e6691747616269d");

        try {
          const result = await tempContract.methods.Login(account).send({ from: account});
          console.log(result);
          await setIsConnected(!isConnected);
          my = true;
          console.log("login page " + isConnected)

          // after login go to homepage
          navigate('./home',{
            state : {acc : account}
          })
    
        } catch (error) {
          alert("couldn't login!!");
          console.log(error);
        }

      }
    } catch (err) {
      console.log(err);
    }
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
          </div>
        </div>
      )}
    </div>
  );
}


export default LoginPage;
