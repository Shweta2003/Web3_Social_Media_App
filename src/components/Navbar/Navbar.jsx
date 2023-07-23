// Navbar.jsx

import React from 'react';
import classes from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav>
      <div className={classes.navbar}>
        <h1>Social Media</h1>
        <ul className={classes['nav-links']}>
          <li><a href="/home">Home</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/newPost">New Post</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
