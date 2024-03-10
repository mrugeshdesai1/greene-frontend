import React from 'react';
import './Header.scss';
import HeaderActionButton from '../HeaderActionButton/HeaderActionButton';
import Logo from '../Logo/Logo';
import Hamburger from '../Hamburger/Hamburger';
import { useState } from 'react';

function Header() {

  const [hamburgerOpen, setHamburgerOpen] = useState(false)

  const toggleHamburger = () => {
    setHamburgerOpen (!hamburgerOpen)
  }

  return (
    <header className='greene__header'>
        <Logo />
        <div className='greene__header-navcontainer'>
          <ul className= { hamburgerOpen ? 'greene__header-navigationopen' : 'greene__header-navigation'}>
            <li className='greene__header-navlink'>Home</li>
            <li className='greene__header-navlink'>About</li>
            <li className='greene__header-navlink'>Contact</li>
          </ul>
          {/* <Hamburger isOpen={hamburgerOpen} toggle={toggleHamburger}/> */}
          <HeaderActionButton />
        </div>
    </header>
  )
}

export default Header