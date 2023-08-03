import { useState, useEffect, useContext, useNavigate, useRef } from 'react';
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import classes from './NewPost.module.css'
import { WebVariable } from '../../App';

function AddNewPost() {
  const content = useContext(WebVariable);
  const MyCID = useRef("");

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGNBNjQwNkM0RjE5MmI2OWU4YjU1NTJkZjMyOEQyRkFBMTgzZkVGMEQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODgwNDkwNDgxNzksIm5hbWUiOiJibG9nQXBwIn0.Ty9pCFWvaOrEGVhz_5xcSA_ZmWFyqabgc-e19bhZb8g";

  const [userDetail, setUserDetail] = useState({
    FileName: "",
    FileLink: "",
    Title: "",
    Description: ""
  })

  const onImageChange = (event) => {
    
    if (event.target.files && event.target.files[0]) {
      setUserDetail({ ...userDetail, FileName : event.target.files[0]})
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

    try{
      const files = makeFileObjects();

      console.log("files " + files);
      const cidimg = await storage.put(files)
      MyCID.current = cidimg;
      console.log('stored files with cid:', cidimg)

    } catch (error) {
      console.error('Error uploading file:', error);
    }

    try {
      // Profile Edit function
      const result = await content.contract.current.methods.AddNewPost(content.account.current, userDetail.Title, userDetail.Description, userDetail.FileName.name, MyCID.current).send({ from: content.account.current });
      console.log(result);

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
    <div className={classes.m2}>
      <h1 className={classes.head}>New Post</h1>
      <div className={classes.break}></div>
      <div className={classes.app}>
        <form name='my_form' className={classes.form} onSubmit={HandleSubmit}>
          <label className={classes.label}>TITLE </label>
          <input className={classes.input} type="text" required onChange={(e) => setUserDetail({ ...userDetail, Title: e.target.value })} />
          <br />
          <br />
          <label className={classes.label}>CHOOSE A FILE TO UPLOAD</label>
          <input className={classes.input} type="file" required onChange={onImageChange} />
          <br />
          <br />
          <label className={classes.label}>DESCRIPTION</label>
          <textarea className={classes.doit} required onChange={(e) => setUserDetail({ ...userDetail, Description: e.target.value })} />
          <br />
          <button className={classes.submit} type="submit">UPLOAD</button>
          <br />
          <br />
          <br />
        </form>
        {/* {
          (showbtn === true) ?
            <img src={`https://${allData[7].imgFileCID}.ipfs.w3s.link/${allData[7].imgFileName}`} alt="" />
            // allData.map((e) => {
            //   // const mycid = retrieveFiles(e.imgFileCID);
            //   return <img src={`https://ipfs.io/ipfs/${e.imgFileCID}/${e.imgFileName}`} alt="" />})
            : console.log()
        } */}

      </div>
    </div>
    </div>
  );
}

export default AddNewPost;