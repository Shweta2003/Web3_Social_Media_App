import React, { useContext, useEffect, useRef, useState } from 'react'
import my_pro from '../../Assets/profile.jpg'
import classes from './ProfilePage.module.css'
import '../../App.css'
import { WebVariable } from '../../App'
import { useNavigate } from 'react-router-dom'
import { Web3Storage } from 'web3.storage'

const EditMe = () => {

  const content = useContext(WebVariable);
  const navigate = useNavigate();
  const [fileopt, getfileopt] = useState(my_pro);
  const MyCID = useRef("");
  const currImg = useRef(my_pro)

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGNBNjQwNkM0RjE5MmI2OWU4YjU1NTJkZjMyOEQyRkFBMTgzZkVGMEQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODgwNDkwNDgxNzksIm5hbWUiOiJibG9nQXBwIn0.Ty9pCFWvaOrEGVhz_5xcSA_ZmWFyqabgc-e19bhZb8g";

  const [userDetail, setUserDetail] = useState({
    ImgFileName: "",
    ImgLink: my_pro,
    UserName: "NewUser",
    Caption: "No Caption",
    sex: "Not Defined",
    Birthday: "Birthday",
    Followers: 0,
    email: "Email"
  })

  useEffect(() => {
    async function initialize() {
      const state = await content.OldUser();
      if (state === true) {
        const result = await content.contract.current.methods.getData().call();
        for (var i = 0; i < result.length; i++) {
          if (result[i].user_address === content.account.current) {
            setUserDetail(
              {
                ImgFileName: result[i].user_img_filename,
                ImgLink: result[i].user_CID,
                UserName: result[i].username,
                Caption: result[i].desc,
                sex: result[i].gender,
                Birthday: result[i].DOB,
                Followers: 0,
                email: result[i].email
              }
            )
          }
        }
      }
    }
    initialize();
  }, [content])

  const onImageChange = (event) => {
    setUserDetail({ ...userDetail, ImgFileName : ""})
    if (event.target.files && event.target.files[0]) {
      currImg.current = URL.createObjectURL(event.target.files[0])
      getfileopt(event.target.files[0])
    }
  }

  function makeFileObjects() {
    const fileInput = document.querySelector('input[type="file"]')
    console.log(fileInput.name);
    return fileInput.files

  }

  const AddDataToMain = async () => {

    if (!token) {
      return alert('A token is needed. You can create one on https://web3.storage')
    }

    const storage = new Web3Storage({ token: token })

    try {
      var files;
      if (fileopt === my_pro) {
        files = my_pro;
      }
      else {
        files = makeFileObjects();
      }

      console.log("files " + files);
      const cidimg = await storage.put(files)
      MyCID.current = cidimg;
      console.log('stored files with cid:', cidimg)

    } catch (error) {
      console.error('Error uploading file:', error);
    }

    try {
      // Profile Edit function
      const result = await content.contract.current.methods.AddProfileDetails(userDetail.UserName, userDetail.sex, MyCID.current, fileopt.name, userDetail.Birthday, userDetail.Caption, userDetail.email, content.account.current).send({ from: content.account.current });
      console.log(result);
      navigate(`../profile/${content.account.current}`,{ state:{ from: `${content.account.current}` }})

    } catch (error) {
      alert("couldn't edit profile" );
      console.log(error);
    }
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(content.contract.current)
    AddDataToMain();
  }

  return (
    <div className={classes.main}>
      <form name='my_form' className={classes.form} onSubmit={HandleSubmit}>
        <div className={classes.section}>
          <h1 className={classes.heading}>Profile Details</h1>
          <div className={classes.break2}></div>
          <div className={classes.miss}>
            {
              (userDetail.ImgFileName === "") ? <img src={currImg.current} alt='' className={classes.img} />
                : <img src={`https://${userDetail.ImgLink}.ipfs.w3s.link/${userDetail.ImgFileName}`} alt='' className={classes.img} />
            }
            <label className={classes.label}>
              <input type='file' className={classes.inp_img} onChange={onImageChange} />
              <span class="material-symbols-outlined my_camera">add_a_photo</span>
            </label>

            <div className={classes.no}>
              <div className={classes.all_time}>
                <label className={classes.normal}>Enter Name</label>
                <input className={classes.input} type='text' value={userDetail.UserName} onChange={(e) => setUserDetail({ ...userDetail, UserName: e.target.value })} />
              </div>

              <div className={classes.all_time}>
                <label className={classes.normal}>Enter a catchy Caption</label>
                <input className={classes.input} type='text' value={userDetail.Caption} onChange={(e) => setUserDetail({ ...userDetail, Caption: e.target.value })} />
              </div>

            </div>
          </div>
        </div>

        <div className={classes.section}>
          <h1 className={classes.heading}>More About You</h1>
          <div className={classes.break2}></div>
          <div className={classes.all_time}>
            <label className={classes.normal}>Your Gender (As You Prefer)</label>
            <input className={classes.input} type='text' value={userDetail.sex} onChange={(e) => setUserDetail({ ...userDetail, sex: e.target.value })} />
          </div>
          <div className={classes.all_time}>
            <label className={classes.normal}>Your Birthday</label>
            <input className={classes.input} type='date' value={userDetail.Birthday} onChange={(e) => setUserDetail({ ...userDetail, Birthday: e.target.value })} />
          </div>
          <div className={classes.all_time}>
            <label className={classes.normal}>Your Email Address</label>
            <input className={classes.input} type='email' value={userDetail.email} onChange={(e) => setUserDetail({ ...userDetail, email: e.target.value })} />
          </div>
        </div>

        <input type='submit' className={classes.submit} />
      </form>
    </div>
  )
}

export default EditMe;