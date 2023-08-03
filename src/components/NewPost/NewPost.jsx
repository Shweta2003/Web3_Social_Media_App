import abi from './ABI';
import Web3 from 'web3';
import { useState, useEffect } from 'react';
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import classes from './NewPost.module.css'

function NewPost() {

  const [fileopt, getfileopt] = useState(null);
  const [name, setname] = useState("");
  const [textc, settextc] = useState("");
  const [cidmain, setcid] = useState("");
  const [showbtn, setshowbtn] = useState(false);
  const [allData, setAllData] = useState();
  const [imgname, setimgname] = useState([{
    name: "",
    imgcid: "",
    imgname: "",
    text: ""
  }]);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGNBNjQwNkM0RjE5MmI2OWU4YjU1NTJkZjMyOEQyRkFBMTgzZkVGMEQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODgwNDkwNDgxNzksIm5hbWUiOiJibG9nQXBwIn0.Ty9pCFWvaOrEGVhz_5xcSA_ZmWFyqabgc-e19bhZb8g";

  // web3 connection
  const [web3, setWeb3] = useState(null);
  const [contract, setcontract] = useState(null);
  useEffect(() => {
    async function initializeWeb3() {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const tempWeb3 = new Web3(window.ethereum);
          setWeb3(tempWeb3);
          const tempContract = new tempWeb3.eth.Contract(abi, "0xc1EF376e2B5c0bA6A90566d137F8880B575E7cc3");
          setcontract(tempContract);
          console.log(contract);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("MetaMask extension not detected");
      }
    }

    initializeWeb3();
  }, []);


  async function retrieveFiles(cid) {
    console.log(cid);
    const client = new Web3Storage({ token: token });
    const res = await client.get(cid)
    console.log(`Got a response! [${res.status}] ${res.statusText}`)
    if (!res.ok) {
      throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
    }
    else {
      return cid;
    }

  }


  // code to add a new blog
  // add cid
  async function main() {


  }

  function makeFileObjects() {
    const fileInput = document.querySelector('input[type="file"]')
    console.log(fileInput.name);
    return fileInput.files

  }

  // get file
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    getfileopt(file);
  };

  // handle on submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // main();
    AddDataToMain();
  };

  // add data to web3 
  const AddDataToMain = async () => {

    if (!token) {
      return alert('A token is needed. You can create one on https://web3.storage')
    }

    if (fileopt.length < 1) {
      return alert('Please supply the path to a file or directory')
    }

    if (settextc.length < 1) {
      return alert('Enter proper content')
    }

    const storage = new Web3Storage({ token: token })

    try {

      const files = makeFileObjects();
      console.log("files" + files);
      const cidimg = await storage.put(files)
      setcid(cidimg);
      console.log('stored files with cid:', cidimg)

    } catch (error) {
      console.error('Error uploading file:', error);
    }

    try {
      const accounts = await web3.eth.getAccounts();
      const result = await contract.methods.addBlog(name, cidmain, fileopt.name, textc).send({ from: accounts[0] });
      console.log(result);
      alert("New Blog Added!!");

    } catch (error) {
      alert("couldn't add blog");
      console.log(error);
    }
  }

  const showAll = () => {
    getFromWeb3();
    setshowbtn(true);
  }

  // display all data from solidity
  const getFromWeb3 = async () => {
    try {
      const dataa = await contract.methods.displayAllBlogs().call();
      setAllData(dataa);
      //console.log(dataa[4].imgFileCID);
      console.log(allData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.main}>
    <div className={classes.m2}>
      <h1 className={classes.head}>New Post</h1>
      <div className={classes.break}></div>
      <div className="App">
        <form onSubmit={handleSubmit}>
          <label>NAME OF AUTHOR : </label>
          <input type="text" required onChange={(e) => setname(e.target.value)} />
          <br />
          <br />
          <label>IMAGE : </label>
          <input type="file" required onChange={handleImageChange} />
          <br />
          <br />
          <label>CONTENT : </label>
          <textarea required onChange={(e) => settextc(e.target.value)} />
          <br />
          <button type="submit">Upload</button>
          <br />
          <br />
          <br />
        </form>
        <button onClick={showAll} >SHOW ALL</button>
        {
          (showbtn === true) ?
            //<img src={`https://${allData[7].imgFileCID}.ipfs.w3s.link/${allData[7].imgFileName}`} alt="" />
            
            // allData.map((e) => {
            //   // const mycid = retrieveFiles(e.imgFileCID);
            //   return <img src={`https://ipfs.io/ipfs/${e.imgFileCID}/${e.imgFileName}`} alt="" />})
            
            <div>
              {allData.map((data, index) => (
                <div key={index}>
                  <h2>{data.name}</h2>
                  {data.imgFileName && (
                    <img
                      src={`https://${data.imgFileCID}.ipfs.w3s.link/${data.imgFileName}`}
                      alt=""
                      width="200"
                    />
                  )}
                  <p>{data.content}</p>
                </div>
              ))}
            </div>
            
            : console.log()
        }

      </div>
    </div>
    </div>
  );
}

export default NewPost;