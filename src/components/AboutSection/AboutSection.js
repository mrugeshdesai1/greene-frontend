import React from 'react';
import './AboutSection.scss';
import firstImage from '../../assets/Images/close-up-electric-car-france.jpg';
import secondImage from '../../assets/Images/charging-station.png'

function AboutSection() {
  return (
    <div className='greene__aboutsection'>
        <div className='greene__aboutsection-image'>
            <img src={firstImage} alt='electric car' className='greene__aboutsection-firstimage'/>
            <img src={secondImage} alt='charging station' className='greene__aboutsection-secondimage'/>
        </div>
        <div className='greene__aboutsection-description'>
            <p className='greene__aboutsection-boldtext'>Charge up anytime anywhere. Faster than everyone else!</p>
            <p className='greene__aboutsection-text'>Embrace the freedom of electric mobility with our revolutionary EV Charge Up Anytime Anywhere subscription. Say goodbye to range anxiety and hello to seamless, stress-free journeys powered by the latest in electric vehicle convenience.</p>
            <button className='greene__aboutsection-button'>Learn more</button>
        </div>
    </div>
  )
}

export default AboutSection