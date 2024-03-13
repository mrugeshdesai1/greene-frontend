import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './Carousel.scss';


function Carousel() {

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,  
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
          ]
      };

  return (
    <div className='greene__carousel'>
        <div className='greene__carousel-title'>Subscribe and Save</div>
        <Slider {...settings} className='greene__carousel-slider'>
            <div className='greene__carousel-card'>
                <div className='greene__carousel-cardtitle'>Essential</div>
                <div className='greene__carousel-rate'>$12.99/Month</div>
                <div className='greene__carousel-range'>105-115 miles range</div>
                <div className='greene__carousel-rangedetail'>Flat rate after 30kWh</div>
                <div className='greene__carousel-chargedetail'>
                    <div className='greene__carousel-fastcharge'>
                        <div className='greene__carousel-kwh'>$0.49/kwh</div>
                        <div className='greene__carousel-type'>DC Fast</div>
                    </div>
                    <div className='greene__carousel-slowcharge'>
                        <div className='greene__carousel-kwh'>$0.49/kwh</div>
                        <div className='greene__carousel-type'>Level 2</div>
                    </div>
                </div>
                <button className='greene__carousel-button'>Subscribe</button>
            </div>
            <div className='greene__carousel-card'>
                <div className='greene__carousel-cardtitle'>Standard</div>
                <div className='greene__carousel-rate'>$49.99/Month</div>
                <div className='greene__carousel-range'>720-780 miles range</div>
                <div className='greene__carousel-rangedetail'>Flat rate after 220kWh</div>
                <div className='greene__carousel-chargedetail'>
                    <div className='greene__carousel-fastcharge'>
                        <div className='greene__carousel-kwh'>$0.39/kwh</div>
                        <div className='greene__carousel-type'>DC Fast</div>
                    </div>
                    <div className='greene__carousel-slowcharge'>
                        <div className='greene__carousel-kwh'>$0.39/kwh</div>
                        <div className='greene__carousel-type'>Level 2</div>
                    </div>
                </div>
                <button className='greene__carousel-button'>Subscribe</button>
            </div>
            <div className='greene__carousel-card'>
                <div className='greene__carousel-cardtitle'>Unlimited</div>
                <div className='greene__carousel-rate'>$99.99/Month</div>
                <div className='greene__carousel-range'>Unlimited range</div>
                <div className='greene__carousel-rangedetail'>Unlimited charging 24/7</div>
                <div className='greene__carousel-chargedetail'>
                    <div className='greene__carousel-fastcharge'>
                        <div className='greene__carousel-kwh'>INCL.</div>
                        <div className='greene__carousel-type'>DC Fast</div>
                    </div>
                    <div className='greene__carousel-slowcharge'>
                        <div className='greene__carousel-kwh'>INCL.</div>
                        <div className='greene__carousel-type'>Level 2</div>
                    </div>
                </div>
                <button className='greene__carousel-button'>Subscribe</button>
            </div>
        </Slider>
    </div>
  )
}

export default Carousel