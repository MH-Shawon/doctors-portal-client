import React from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Navbar = () =>
{
    const [ user ] = useAuthState( auth );
    const [ signOut ] = useSignOut( auth );

    const signOutFun = async () =>
    {
        await signOut();
        localStorage.removeItem( "firebaseAuthInfo" );
        localStorage.removeItem( 'accessToken' );

    }

    const menuItem = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/appointment'>Appointment</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/reviews'>Reviews</Link></li>
        <li><Link to='/contactUs'>Contact Us</Link></li>

        {
            user && <li><Link to='/dashboard'>Dashboard</Link></li>

        }
        <li>{user ? <div class="dropdown dropdown-bottom">
            <label tabindex="0" class="m-1">

            <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
                    <div className="avatar">
                        <div className="w-8 rounded-full">
                            <img src={user.photoURL} alt='' />
                        </div>
                    </div>
                </div>
                 </label>
            

            <ul tabindex="0" class="dropdown-content rounded text-xl bg-accent w-28 text-white">
    <li className=' mx-auto' onClick={() => signOutFun()}>
    SIGN OUT
    </li>
    
  </ul>
            </div> : <Link to='/login'>Login</Link>}
            </li>
    </>


    return (

        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItem}
                    </ul>
                </div>
                <div className="btn btn-ghost normal-case text-xl">
                    Doctors Portal
                </div>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItem}
                </ul>
            </div>
            <div className="navbar-end">
                <label tabIndex="1" htmlFor="dashboard-sidebar" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;