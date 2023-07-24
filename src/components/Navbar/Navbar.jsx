import React, {useEffect, useState} from 'react';
import classes from './Navbar.module.css';
import logo from '../../Assets/our_logo.png'

const Navbar = () => {
    const [isaConnected, setIsConnected] = useState(false);
    // Retrieve isConnected from local storage, default to false if not available
    useEffect(() => {
        console.log(localStorage.getItem('my'));
        console.log(isaConnected)
    },[])
    

    return (
        <nav>
            <div className={classes.navbar}>
            <div className={classes.navname}><img src={logo} className={classes.logo} alt=''/> <span className={classes.name}>Social Web</span></div>
                <ul className={classes['nav-links']}>
                    {isaConnected ? (
                        <>
                            <li><a href="/home">Home</a></li>
                            <li><a href="/profile">Profile</a></li>
                            <li><a href="/newPost">New Post</a></li>
                            <li><a href="/">Logout</a></li>
                        </>
                    ) : (
                        <li><a href="/">Login</a></li>
                    )}
                </ul>
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