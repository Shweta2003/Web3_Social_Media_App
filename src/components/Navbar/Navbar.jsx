import React, { useEffect, useState, useContext } from 'react';
import classes from './Navbar.module.css';
import logo from '../../Assets/our_logo.png'
import { WebVariable } from '../../App';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <div className={classes.navbar}>
                <div className={classes.navname}><img src={logo} className={classes.logo} alt='' /> <span className={classes.name}>Social Web</span></div>
            </div>
        </nav>
    );
};

export default Navbar;





// import React from 'react';
// import classes from './Navbar.module.css';

// const Navbar = () => {
//   return (
//     <nav>
//       <div className={classes.navbar}>
//         <h1>Social Media</h1>
//         <ul className={classes['nav-links']}>
//           <li><a href="/home">Home</a></li>
//           <li><a href="/profile">Profile</a></li>
//           <li><a href="/newPost">New Post</a></li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;