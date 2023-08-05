import React, { useContext, useEffect, useState } from 'react'
import top_back from '../../Assets/profile_top.png'
import my_pro from '../../Assets/profile.jpg'
import classes from './ProfilePage.module.css'
import '../../App.css'
import { WebVariable } from '../../App'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import Post from '../Post/Post'

const ProfilePage = () => {
  const navigate = useNavigate();
  const content = useContext(WebVariable);
  const location = useLocation();
  const [allData, setAllData] = useState([]);
  const [PostDet, getPostDet] = useState([]);
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
      if (location.state?.from) {
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

    }
    initialize();
  })

  useEffect(() => {
    async function Myfun() {
      const state = await content.OldUser();
      if (state === true) {
        if (location.state?.from) {
          const result = await content.contract.current.methods.return_follow().call();
          const res1 = result.filter(foo => foo.follower === location.state.from);
          set_my_list(res1);
          allowAddPost(true);
          const res2 = result.filter(foo => foo.account_following === location.state.from);
          setUserDetail({ ...userDetail, Followers: res2.length })
        }
      }
    }
    Myfun();
  }, [])

  // Function to retrieve post data from the smart contract
  const getFromWeb3 = async () => {
    try {
      if (content.contract?.current) { // Check if content.contract.current is defined
        const dataa = await content.contract.current.methods.DisplayPosts().call();
        getPostDet(dataa);

      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandleClick = () => {
    navigate('../editMyProfile')
  }

  const newPostClick = () => {
    navigate('../createNewPost')
  }

  useEffect(() => {
    getFromWeb3();
    if(location.state?.from){
      const p = PostDet.filter((e) => e.user_address === location.state.from);
      console.log(p)
      getPostDet(p);
    }
  }, []); 

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
            (location.state?.from) ? (location.state.from === content.account.current) ? <button className={classes.btn} onClick={HandleClick}>Edit Your Profile</button>
              : console.log()
              : console.log()
          }
          {
            (location.state?.from) ? (addPost === true) ?
              (location.state.from === content.account.current) ? <button className={classes.btn1} onClick={newPostClick}>Create a New Post</button>
                : console.log()
              : console.log("first register to add post")
              : console.log()
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
          {/* Display all posts */}

        {(location.state?.from)?
            (PostDet.filter((e) => e.user_address === location.state.from).length <= 0)?
              <p className={classes.iu1}>No Posts yet</p>
            :PostDet.filter((e) => e.user_address === location.state.from).map((data, index) => (
              <Post
              CID={data.file_CID}
              name={data.file_name}
              key={index}
              imgSrc={`https://${data.file_CID}.ipfs.w3s.link/${data.file_name}`}
              username={data.title}
              caption={data.desc}
              num={data.like}
              address={data.user_address}
            />
            ))
          :console.log()
        }
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