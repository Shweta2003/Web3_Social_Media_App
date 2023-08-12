import React from 'react';
import { useLocation } from 'react-router-dom';

const PostDetailsPage = () => {
  const location = useLocation();
  const post = location.state.post;

  return (
    <div>
      <h2>{post.title}</h2>
      <img src={post.imgSrc} alt={post.file_name} />
      <p>{post.caption}</p>
      <p>{post.desc}</p>
    </div>
  );
};

export default PostDetailsPage;
