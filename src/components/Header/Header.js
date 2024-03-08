import React from 'react';
import './Header.scss';
import HeaderActionButton from '../HeaderActionButton/HeaderActionButton';
import Hamburger from '../Hamburger/Hamburger';
import { useState } from 'react';

function Header() {

  const [hamburgerOpen, setHamburgerOpen] = useState(false)

  const toggleHamburger = () => {
    setHamburgerOpen (!hamburgerOpen)
  }

  return (
    <header className='greene__header'>
        <div className='greene__header-logo'>Green-<span className='greene__header-logoselection'>E</span></div>
        <ul className='greene__header-navigation'>
          <li className='greene__header-navlink'>Home</li>
          <li className='greene__header-navlink'>About</li>
          <li className='greene__header-navlink'>Contact</li>
          <div className= {hamburgerOpen===false ? 'greene__header-hamburger' : 'greene__header-hamburgeropen'} onClick={toggleHamburger}>
            <Hamburger />
          </div>
        </ul>
        <HeaderActionButton />
    </header>
  )
}

export default Header