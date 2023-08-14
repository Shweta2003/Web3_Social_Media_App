import React, {useContext} from 'react'
import classes from './Navbar.module.css';
import logo from '../../Assets/our_logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { WebVariable } from '../../App';

const NavAfterLogin = () => {

    const content = useContext(WebVariable);
    const navigate = useNavigate();

    const HandleLogout = async() => {
        const result = await content.contract.current.methods.LogOut(content.account.current).send({ from: content.account.current });
        console.log(result);
        navigate('/')

    }
    return (
        <nav>
            <div className={classes.navbar}>
                <div className={classes.navname}><img src={logo} className={classes.logo} alt='' /> <span className={classes.name}>Social Web</span></div>
                <ul className={classes['nav-links']} >
                    <Link to="../home" className={classes.opt1}>Home</Link>
                    <Link to={`../profile/${content.account.current}`} state={{ from: `${content.account.current}` }} className={classes.opt1}>Profile</Link>
                    <Link to="../about" className={classes.opt1}>About</Link>
                    <Link onClick={HandleLogout} className={classes.opt1}>Logout</Link>
                </ul>
            </div>
        </nav>
    )
}

export default NavAfterLogin