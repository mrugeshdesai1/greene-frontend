import React from 'react';
import './HeroImage.scss';

function HeroImage() {
  return (
    <section className='greene__heroimage'>
        <div className='greene__heroimage-body'>
            <div className='greene__heroimage-bodytext'>
                <p className='greene__heroimage-textline'>Plug in, power up, and hit the road with confidence!</p>
                <p className='greene__heroimage-tagtext'>Start your engine while saving the earth.</p>
                <p className='greene__heroimage-text'>Ready to charge ahead? Join us in revolutionizing the way you power your drive. Embrace the future of mobility with our EV Charging – because every journey deserves a powerful start!</p>
            </div>
            <form className='greene__heroimage-form'>
                <input className="greene__heroimage-addemail" id="emailField" name="email" placeholder="E-mail"></input>
                <button className='greene__heroimage-addbutton'>Subscribe</button>
            </form>
        </div>
    </section>
  )
}

export default HeroImage