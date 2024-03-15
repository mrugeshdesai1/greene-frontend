import React from 'react';
import './HeaderActionButton.scss';
import { Link } from 'react-router-dom';

function HeaderActionButton() {
  return (
    <Link to={`/register`} className='greene-headercta'>
        <button className='greene-headercta-button'>Sign Up</button>
    </Link>
  )
}

export default HeaderActionButton