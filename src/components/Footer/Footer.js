import React from 'react';
import './Footer.scss';
import Logo from '../Logo/Logo';
import facebook from '../../assets/Icons/facebook.png';
import instagram from '../../assets/Icons/instagram.png';
import linkedin from '../../assets/Icons/linkedin.png';

function Footer() {
  return (
    <div className='greene__footer'>
      <div className='greene__footer-contactdetails'>
        <div className='greene__footer-title'>Talk to us.</div>
        <div className='greene__footer-address'>
          <div className='greene__footer-addresstitle'>Office Address</div>
          <div className='greene__footer-details'>
            <p className='greene__footer-street'>123 abc rd, 010 101</p>
            <p className='greene__footer-city'>Toronto, Canada</p>
          </div>
        </div>
        <div className='greene__footer-phone'>
          <div className='greene__footer-phonetitle'>Contact us</div>
          <div className='greene__footer-details'>
            <p className='greene__footer-email'>abc@gmail.com</p>
            <p className='greene__footer-number'>+1[999]999-9999</p>
          </div>
        </div>
        <div className='greene__footer-footerlogo'><Logo /></div>
      </div>
      <div className='greene__footer-otherdetails'>
        <div className='greene__footer-subscribe'>
          <form className='greene__footer-subscribeform'> 
            <div className='greene__footer-inputcontainer'>
              <label className='greene__footer-sectiontitle' htmlFor='emailField'>Subscribe to get updates</label>
              <textarea className="greene__footer-addemail" id="emailField" name="email" placeholder="E-mail"></textarea>
            </div>
            <button className='greene__footer-addbutton'>Subscribe</button>
          </form>
        </div>
        <div className='greene__footer-socialmedia'>
          <div className='greene__footer-socialmediatitle'>Follow us on our socials to see our latest updates!</div>
          <div className='greene__footer-icons'>
            <img src={facebook} alt='facebook' className='greene__footer-socialicons'/>
            <img src={instagram} alt='instagram' className='greene__footer-socialicons'/>
            <img src={linkedin} alt='linkedin' className='greene__footer-socialicons'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer