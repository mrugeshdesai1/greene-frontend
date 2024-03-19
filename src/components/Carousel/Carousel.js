import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './Carousel.scss';
import { useNavigate , useLocation , Link} from 'react-router-dom';
import { useContext, useState } from "react";
import AuthContext from '../../context/AuthProvider';
import axios from 'axios';


function Carousel() {

    const location = useLocation();
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    // use state for setting successful subscription
  const [subscribed, setSubscribed] = useState(false);

    // use state for error message
    const [errMsg, setErrMsg] = useState('');

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

  // Initialise useNavigate hook to redirection
  let navigate = useNavigate();

  // Navigating Subscribe page or Register Page
  const handleClick = async function (subscription) {
    if (location.pathname === "/subscribe" && currentUser) {

        // Creating an object to send it feed at backend to subscribe
        const subscriptionDetails = {
            userId: currentUser.id,
            plan: subscription,
        };

        let bearerToken = localStorage.getItem("userInfo");

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/subscribe`, subscriptionDetails,
                {
                    headers: {
                        Authorization: "Bearer "+bearerToken
                    }
                }
            );
            setSubscribed(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Subscription unsuccessful. Please try again');
            } 
        }
    } else if (currentUser) {
        navigate(`/subscribe`);
    } else {
        navigate(`/register`);
    }
  }

  return (
    <div className='greene__carousel'>
        { subscribed ? (
            <section className='greene__carousel-success'>
            <div className='greene__carousel-successtitle'>You have success subscribed!</div>
            <Link to={`/profile`} className='greene__carousel-successnavigation'>My Profile</Link>
          </section>
        ):(
        <>    
        <div className={errMsg ? "greene__carousel-errmsg" : "greene__carousel-offscreen"} aria-live="assertive">{errMsg}</div>
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
                <button className='greene__carousel-button' onClick= {() => {handleClick("Essential")}}>Subscribe</button>
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
                <button className='greene__carousel-button' onClick= {() => {handleClick("Standard")}}>Subscribe</button>
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
                <button className='greene__carousel-button' onClick= {() => {handleClick("Unlimited")}}>Subscribe</button>
            </div>
        </Slider>
        </>
        )}
    </div>
  )
}

export default Carousel