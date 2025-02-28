import React from "react";
import { Link } from "react-router";
import logo from '../../assets/logo.png'
import useAuth from "./../../Hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const handleLogout = () => {
    // Logout user  
    logoutUser()
      .then(result => {
        console.log(result.user); // Logs the authenticated user
      })
  }
  const navLinks = (
    <>
      <li>
        <Link to={'assignment'}>Assignments</Link>
      </li>
      {user ? '' : <li>
        <Link to={'login'}>Login</Link>
      </li>}
      {user ? '' : <li>
        <Link to={'signup'}>Signup</Link>
      </li>}
      {user && <li>
        <Link to={'createAssignment'}>Create Assignment</Link>
      </li>}
      {user && <li>
        <Link to={'pendingAssignment'}>Pending Assignment</Link>
      </li>}
    </>
  );
  return (
    <div>
      <div className="navbar bg-gradient-to-r from-teal-600 to-indigo-700 text-white hadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-5 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link to={'/'}>
            <img className="w-20" src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navLinks}
          </ul>
        </div>
        {user && <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn m-1">
            {user.photoURL ? <img className="w-25" src={user.photoURL} alt="" /> : <FaUserCircle />}
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li><Link onClick={handleLogout} to={'/login'}>Logout</Link></li>
            <li><button>my attempted assignments</button></li>
          </ul>
        </div>}
      </div>
    </div>
  );
};

export default Navbar;
