import React, { useState, useContext, useEffect } from 'react';
import classes from './Post.module.css';
import { Link } from 'react-router-dom';
import { WebVariable } from '../../App';
import doc from '../../Assets/doc.jpg'

const Post = ({CID,name, imgSrc, username, caption, num, address, date, viewers}) => {
  const content = useContext(WebVariable);
  const [readmore, setreadmore] = useState(false);

  const ToggleClick = () => {
    setreadmore(!readmore)
  }

  const AddLike = async(address) => {
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
    <div className={classes.post1}>
      <h3 className={classes.postUsername}><span class="material-symbols-outlined post_icon">stars</span>{username}</h3>
      <div className={classes.post}>
        <div className={classes.post}>
        <Link to={`../post/${CID}`} state={{CID : `${CID}`,name : `${name}`, imgSrc : `${imgSrc}`, username : `${username}`, caption : `${caption}`, num : `${num.toString()}`, address : `${address}`, date : `${date}`, viewers : `${viewers}`}}>
          {(name)?
            (name.split('.')[1] === 'jpg' || name.split('.')[1] === 'jpeg' || name.split('.')[1] === 'png' || name.split('.')[1] === 'gif' || name.split('.')[1] === 'avif' || name.split('.')[1] === 'svg' || name.split('.')[1] === 'webp' || name.split('.')[1] === 'apng')?<img src={imgSrc} alt="User Post" className={classes.postImage} />
            :<img src={doc} alt="User Post" className={classes.postImage1} />
          :console.log()
            
          }
        </Link>
      
      <div className={classes.line}></div>
      <div className={classes.all}>
        <button className={classes.class1} onClick={() => AddLike(CID)}><span class="material-symbols-outlined like">
favorite
</span><span className={classes.sp}>{num.toString()}</span></button>
        <Link className={classes.class1} to={`../profile/${address} `} state={{ from: `${address}` }}>View Profile</Link>
      </div>
      </div>
      {
        (readmore === false)?<p className={classes.postCaption}>{caption.substring(0,200)}...<p className={classes.read} onClick={ToggleClick}>Read More</p></p>
        :<p className={classes.postCaption}>{caption}<p className={classes.read} onClick={ToggleClick}>Read Less</p></p>
      }
      </div>
      
    </div>
  );
};

export default Post;
