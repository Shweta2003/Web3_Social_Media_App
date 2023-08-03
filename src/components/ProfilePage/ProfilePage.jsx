import React, { useContext, useEffect, useRef, useState } from 'react'
import top_back from '../../Assets/profile_top.png'
import my_pro from '../../Assets/profile.jpg'
import classes from './ProfilePage.module.css'
import '../../App.css'
import { WebVariable } from '../../App'
import { useLocation, useNavigate, Link } from 'react-router-dom'

const ProfilePage = () => {

  const content = useContext(WebVariable);
  const location = useLocation()
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [my_list, set_my_list] = useState([]);
  const [addPost, allowAddPost] = useState(false);

  const [userDetail, setUserDetail] = useState({
    ImgLink: my_pro,
    ImgFileName: "",
    UserName: "NewUser",
    Caption: "No Caption",
    sex: "Not Defined",
    Birthday: "Birthday",
    Followers: 0,
    email: "Email"
  })

  useEffect(() => {
    async function initialize() {
      const result = await content.contract.current.methods.getData().call();
      setAllData(result);
      for (var i = 0; i < result.length; i++) {
        if (result[i].user_address === location.state.from) {
          setUserDetail(
            {
              ...userDetail,
              ImgLink: result[i].user_CID,
              ImgFileName: result[i].user_img_filename,
              UserName: result[i].username,
              Caption: result[i].desc,
              sex: result[i].gender,
              Birthday: result[i].DOB,
              email: result[i].email
            }
          )
          break;
        }
      }

    }
    initialize();
  })

  useEffect(() => {
    async function Myfun() {
      const state = await content.OldUser();
      if (state === true) {
        const result = await content.contract.current.methods.return_follow().call();
        const res1 = result.filter(foo => foo.follower === location.state.from);
        set_my_list(res1);
        allowAddPost(true);
        const res2 = result.filter(foo => foo.account_following === location.state.from);
        setUserDetail({ ...userDetail, Followers: res2.length })
      }
    }
    Myfun();
  }, [])

  const HandleClick = () => {
    navigate('../editMyProfile')
  }

  const newPostClick = () => {
    navigate('../createNewPost')
  }

  return (
    <div className={classes.main}>
      <div className={classes.top_part}>
        <img src={top_back} alt='' className={classes.top_back} />
        <div className={classes.top_below}>
          {
            (userDetail.ImgFileName === "") ? <img src={userDetail.ImgLink} alt='' className={classes.profile} />
              : <img src={`https://${userDetail.ImgLink}.ipfs.w3s.link/${userDetail.ImgFileName}`} alt='' className={classes.profile} />
          }

          <div className={classes.top_one}>
            <h3 className={classes.name}>{userDetail.UserName}</h3>
            <h4 className={classes.det}>{userDetail.Caption}</h4>
          </div>
          {
            (location.state.from === content.account.current) ? <button className={classes.btn} onClick={HandleClick}>Edit Your Profile</button>
              : console.log()
          }

          {
            (addPost === true) ?
              (location.state.from === content.account.current) ? <button className={classes.btn1} onClick={newPostClick}>Create a New Post</button>
                : console.log()
              : console.log("first register to add post")
          }
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
            (my_list.length === 0) ? <p className={classes.iu1}>No Following yet</p>
              : my_list.map((e) => {
                const value = allData.filter(foo => foo.user_address === e.account_following);
                return <Link to={`../profile/${value[0].user_address}`} state={{ from: `${value[0].user_address}` }} className={classes.one_fo}>
                  <img src={`https://${value[0].user_CID}.ipfs.w3s.link/${value[0].user_img_filename}`} alt='' className={classes.iii} />
                  <p className={classes.iu}>{value[0].username}</p>
                </Link>
              })
          }
        </div>
      </div>
    </div>
  )
}

export default ProfilePage