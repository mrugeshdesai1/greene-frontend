import React from 'react';
import './Hamburger.scss';


function Hamburger({isOpen, toggle}) {

  return (
    <div className={`greene-hamburger ${isOpen?'open':''}`} onClick={toggle} >
        <div className='greene-hamburger-bar1'></div>
        <div className='greene-hamburger-bar2'></div>
        <div className='greene-hamburger-bar3'></div>
    </div>
  )
}

export default Hamburger