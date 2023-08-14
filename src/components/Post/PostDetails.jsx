import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import classes from './Post.module.css'
import { Link } from 'react-router-dom';
import { WebVariable } from '../../App';
import doc from '../../Assets/doc.jpg'

const PostDetailsPage = () => {
  const location = useLocation();
  const content = useContext(WebVariable);
  const post = location.state;
  console.log(post)

  const AddLike = async (address) => {
    const state = await content.OldUser();
    if (state === true) {
      const result = await content.contract.current.methods.Like_post(address).send({ from: content.account.current });
      alert("Liked !!")
      console.log(result);
    }
    else {
      alert("First Register Yourself to like this post");
    }
  }

  return (
    <div className={classes.post1p}>

      <div className={classes.left_part}>
      <div className={classes.postk}>
        {
          (location.state) ? <a href={`https://${location.state.CID}.ipfs.w3s.link/`} target="_blank" rel="noopener noreferrer">
            {(location.state.name) ?
              (location.state.name.split('.')[1] === 'jpg' || location.state.name.split('.')[1] === 'jpeg' || location.state.name.split('.')[1] === 'png' || location.state.name.split('.')[1] === 'gif' || location.state.name.split('.')[1] === 'avif' || location.state.name.split('.')[1] === 'svg' || location.state.name.split('.')[1] === 'webp' || location.state.name.split('.')[1] === 'apng') ? <img src={location.state.imgSrc} alt="User Post" className={classes.postImage} />

                : <img src={doc} alt="User Post" className={classes.postImage1} />
              : console.log()

            }

          </a>
            : console.log()
        }
        {
          <button className={classes.class11} onClick={() => AddLike(location.state.CID)}><span class="material-symbols-outlined likeaa">
            heart_plus
          </span></button>
        }
      </div>
      {
        location.state?<div className={classes.ext_but}>
          <a href={`https://${location.state.CID}.ipfs.w3s.link/`} target="_blank" rel="noopener noreferrer" className={classes.postk1} to={`../profile/${location.state.address} `} state={{ from: `${location.state.address}` }}>View Post</a>
          <Link className={classes.postk1} to={`../profile/${location.state.address} `} state={{ from: `${location.state.address}` }}>View Profile</Link>
      </div>
        :console.log()
      }

      
      </div>

      {
        (location.state) ?
          <div className={classes.right_part}>
            <h4 className={classes.tt}><span style={{ color: "#649dd2" }}>{location.state.address}</span> Collection</h4>
            <h3 className={classes.postUsername1}><span class="material-symbols-outlined post_icon">stars</span>
              {location.state.username}</h3>
            <h4 className={classes.tt}>Owned By <span style={{ color: "#649dd2" }}>{location.state.address}</span></h4>
            <div className={classes.special}>
              <h3 className={classes.make1}><span class="material-symbols-outlined likea">visibility</span><span className={classes.sp1}>{location.state.viewers} Views</span></h3>
              <h3 className={classes.make1}> <span class="material-symbols-outlined likea">favorite</span><span className={classes.sp1}>{location.state.num} Likes</span></h3>
            </div>

            <div className={classes.all_dett}>
              <h2 className={classes.hh}><span class="material-symbols-outlined likea">
                auto_stories
              </span>Details</h2>
              <div className={classes.line}></div>
              <div className={classes.s1} style={{marginTop:"30px"}}>
                <p className={classes.lt}>Date Of Creation</p>
                <p className={classes.rt}>{location.state.date}</p>
              </div>

              <div className={classes.s1}>
                <p className={classes.lt}>Contract Address</p>
                <p className={classes.rt}>0xD09d952...aeCf86</p>
              </div>

              <div className={classes.s1}>
                <p className={classes.lt}>Token Standard</p>
                <p className={classes.rt}>ERC-1155</p>
              </div>

              <div className={classes.s1}>
                <p className={classes.lt}>Chain</p>
                <p className={classes.rt}>Polygon</p>
              </div>

              <div className={classes.s1}>
                <p className={classes.lt}>MetaData</p>
                <p className={classes.rt}>Centralized</p>
              </div>

              <div className={classes.s1}>
                <p className={classes.lt}>CID Number</p>
                <p className={classes.rt}>{location.state.CID.substring(0,9)}...{location.state.CID.substring(12,18)}</p>
              </div>

              <div className={classes.s1}>
                <p className={classes.lt}>Storage Provider</p>
                <p className={classes.rt}>Web3 Storage</p>
              </div>

              <div className={classes.s1}>
                <p className={classes.lt}>Creator Earnings</p>
                <p className={classes.rt}>0%</p>
              </div>

            </div>
          </div>
          : console.log()
      }

    </div>
  );
};

export default PostDetailsPage;
