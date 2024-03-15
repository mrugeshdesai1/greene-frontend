import React from 'react';
import './Header.scss';
import HeaderActionButton from '../HeaderActionButton/HeaderActionButton';
import Logo from '../Logo/Logo';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {

  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  // Initialise useNavigate hook to redirect to edit inventory screen
  let navigate = useNavigate();

  // Sending the details to edit inventory page
  const handleClick = function (event) {
    navigate(`/`);
  }

  return (
    <header className='greene__header'>
        <Logo />
        <div className='greene__header-navcontainer'>
          <ul className= { hamburgerOpen ? 'greene__header-navigationopen' : 'greene__header-navigation'}>
            <li className='greene__header-navlink' onClick={handleClick}>Home</li>
            <li className='greene__header-navlink'>About</li>
            <li className='greene__header-navlink'>Contact</li>
          </ul>
          <HeaderActionButton />
        </div>
    </header>
  )
}

export default Header