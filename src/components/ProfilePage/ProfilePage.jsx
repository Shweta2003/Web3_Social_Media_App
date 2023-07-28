import React, {useContext, useEffect, useRef, useState} from 'react'
import top_back from '../../Assets/profile_top.png'
import my_pro from '../../Assets/profile.jpg'
import classes from './ProfilePage.module.css'
import '../../App.css'
import { WebVariable } from '../../App'
import { useLocation, useNavigate } from 'react-router-dom'

const ProfilePage = () => {

  const content = useContext(WebVariable);
  const state = useLocation();
  console.log(state);
  const navigate = useNavigate();
  const [my_list, set_my_list] = useState([]);

  const [userDetail, setUserDetail] = useState({
    ImgLink : my_pro,
    ImgFileName : "",
    UserName : "NewUser",
    Caption : "No Caption",
    sex : "Not Defined",
    Birthday : "Birthday",
    Followers : 0,
    email : "Email"
  })

  useEffect(() => {
    async function initialize(){
      const state = await content.OldUser();
      console.log(state)
      if(state === true){
        const result = await content.contract.current.methods.getData().call();
        for(var i = 0 ; i < result.length ; i ++){
          if(result[i].user_address === content.account.current){
              setUserDetail(
                {
                ImgLink : result[i].user_CID,
                ImgFileName : result[i].user_img_filename,
                UserName : result[i].username,
                Caption : result[i].desc,
                sex : result[i].gender,
                Birthday : result[i].DOB,
                Followers : 0,
                email : result[i].email}
              )
              break;
          }
        }
      }
    }
    initialize();
  })

  const HandleClick = () => {
    navigate('../editMyProfile')
  }

  return (
    <div className={classes.main}>
      <div className={classes.top_part}>
        <img src={top_back} alt='' className={classes.top_back} />
        <div className={classes.top_below}>
          {
            (userDetail.ImgFileName === "")?<img src={userDetail.ImgLink} alt='' className={classes.profile} />
            :<img src={`https://${userDetail.ImgLink}.ipfs.w3s.link/${userDetail.ImgFileName}`} alt='' className={classes.profile} />
          }
          
          <div className={classes.top_one}>
            <h3 className={classes.name}>{userDetail.UserName}</h3>
            <h4 className={classes.det}>{userDetail.Caption}</h4>
          </div>
            <button className={classes.btn} onClick={HandleClick}>Edit Your Profile</button>
        </div>
      </div>

      <div className={classes.bottom_part}>
        <div className={classes.m1}>
          <h1 className={classes.head}>About</h1>
          <div className={classes.break}></div>

          <p className={classes.abt}><span class="material-symbols-outlined">face</span>{userDetail.sex}</p>
          <p className={classes.abt}><span class="material-symbols-outlined">cake</span>{userDetail.Birthday}</p>
          <p className={classes.abt}><span class="material-symbols-outlined">diversity_2</span>{userDetail.Followers}</p>
          <p className={classes.abt}><span class="material-symbols-outlined">mail</span>{userDetail.email}</p>
        </div>

        <div className={classes.m2}>
        <h1 className={classes.head}>My Posts</h1>
        <div className={classes.break}></div>
        <p>My Account Number : {content.account.current}</p>
        </div>

        <div className={classes.m1}>
        <h1 className={classes.head}>Following</h1>
        <div className={classes.break}></div>
        {
          (my_list.length === 0)?<p className={classes.iu}>No Following yet</p>
          :my_list.map((e) => {
            return <button className={classes.one_fo}>
            <img src={my_pro} alt='' className={classes.iii}/>
            <p className={classes.iu}>NewUser</p>
          </button>
          })
        }
        </div>
      </div>
    </div>
  )
}

export default ProfilePage