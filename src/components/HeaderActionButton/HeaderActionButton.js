import React from 'react';
import './HeaderActionButton.scss';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from '../../context/AuthProvider';

function HeaderActionButton() {

  // call the current logged-in user from Authcontext
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  //If the user is logged in change the text of button to PROFILE and navigate to profile page
  return (
    <>
    { currentUser ? (
    <Link to={`/profile`} className='greene-headercta'>
        <button className='greene-headercta-button'>Profile</button>
    </Link> ) : (
      <Link to={`/register`} className='greene-headercta'>
        <button className='greene-headercta-button'>Sign Up</button>
    </Link>
    )}
    </>
  )
}

export default HeaderActionButton