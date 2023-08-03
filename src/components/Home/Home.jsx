import React, { useState, useContext, useEffect, useRef } from 'react'
import classes from './Home.module.css'
import { WebVariable } from '../../App';
import { Link } from 'react-router-dom';

const Home = () => {

  const content = useContext(WebVariable);
  const [list_of_users, setList] = useState([]);
  const [list_of_, setList_of] = useState([]); 
  const [addText, setAddText] = useState("No text");

  const Check_to_follow = (acc_) => {
    if(acc_ === content.account.current){
      return true;
    }
    for(var i = 0 ; i < list_of_.length ; i ++){
      if(list_of_[i].follower === content.account.current && list_of_[i].account_following === acc_){
        return true;
      }
    }
    return false;

  }

  useEffect(() => {
    async function initialize() {
      const result = await content.contract.current.methods.getData().call();
      setList(result);
    }
    initialize();
  },[])

  useEffect(() => {
    async function fun1(){
      const result2 = await content.contract.current.methods.return_follow().call();
      setList_of(result2);
    }
    fun1();
  },[])

  useEffect(() => {
    async function initialize() {
      const state = await content.OldUser();
      if (state === true) {
        setAddText("There is text");
      }}
    initialize();
    },[])

  const HandleFollow = async(account) => {
    const result = await content.contract.current.methods.Follow(content.account.current, account).send({ from: content.account.current });
    alert("Follow Success!!")
    console.log(result);
  }

  return (
    <div className={classes.main}>
      <div className={classes.c2}>
        <h1 className={classes.head}>All Posts</h1>
        <div className={classes.break}>
          {addText}
        </div>

      </div>

      <div className={classes.c1}>
        <h1 className={classes.head}>Other Users</h1>
        <div className={classes.break}></div>
        {
          list_of_users.map((e) => {
            return <div className={classes.user_comp}>
              <Link to={`../profile/${e.user_address} `} state={{ from: `${e.user_address}` }}>
              <img src={`https://${e.user_CID}.ipfs.w3s.link/${e.user_img_filename}`} alt='' className={classes.prof_img} /></Link>
              <Link to={`../profile/${e.user_address} `} state={{ from: `${e.user_address}` }} className={classes.p2}><h3 className={classes.p}>{e.username}</h3></Link>
              
              {
                (Check_to_follow(e.user_address) === true)?<button className={classes.following}>Following</button>
                :<button className={classes.follow} onClick={() => HandleFollow(e.user_address)}>Follow</button>
              }
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Home