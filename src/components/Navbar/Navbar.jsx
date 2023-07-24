import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav>
      <div className={classes.navbar}>
        <h1>Social Media</h1>
        <ul className={classes['nav-links']}>
          {isLoggedIn && (
            <>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/edit">Edit</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

