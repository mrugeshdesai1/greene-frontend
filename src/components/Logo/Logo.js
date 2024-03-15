import React from 'react';
import './Logo.scss';
import { useNavigate } from 'react-router-dom';

function Logo() {

  // Initialise useNavigate hook to redirect to edit inventory screen
  let navigate = useNavigate();

  // Sending the details to edit inventory page
  const handleClick = function (event) {
    navigate(`/`);
  }


  return (
    <div className='greene__logo' onClick={handleClick}>Green-<span className='greene__logo-logoselection'>E</span></div>
  )
}

export default Logo