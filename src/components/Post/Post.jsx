import React from 'react';
import classes from './Post.module.css';

const Post = ({ imgSrc, username, caption }) => {
  return (
    <div className={classes.post}>
      <img src={imgSrc} alt="User Post" className={classes.postImage} />
      <h3 className={classes.postUsername}>{username}</h3>
      <p className={classes.postCaption}>{caption}</p>
    </div>
  );
};

export default Post;
