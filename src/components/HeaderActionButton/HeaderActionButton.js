import React from 'react';
import './HeaderActionButton.scss';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from '../../context/AuthProvider';

function HeaderActionButton() {

  const { currentUser, setCurrentUser } = useContext(AuthContext);

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