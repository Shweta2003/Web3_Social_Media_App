import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { WebVariable } from '../../App'
import classes from './Login.module.css'
import im from '../../Assets/try.jpg';


function LoginPage() {

  const navigate = useNavigate(); // Initialize the useNavigate hook

    const content = useContext(WebVariable);

    const connect_btn = async() => {
        if(window.ethereum){
            try {
                await content.NewWeb3();
                console.log(content.web3.current);
                console.log(content.account.current);
                console.log(content.contract.current);

                // login function
                const result = await content.contract.current.methods.Login(content.account.current).send({ from: content.account.current });
                await content.makeConnection();
                console.log(result);
                console.log(content.isConnected.current)

                // after login go to homepage
                navigate('./home');

              } catch (error) {
                console.log(error);
              }
        }
        else{
            alert("First install Metamask")
        }
    }

  return (
    <div className={classes.app}>
        <img src={im} alt='' className={classes.image}/>
        <div className={classes.bang}><h2 className={classes.head}>Connect Your Wallet to Login</h2>
        <button onClick={connect_btn} className={classes.my_btn}>
          Connect to Metamask
        </button></div>
    </div>
  );
}


export default LoginPage;
