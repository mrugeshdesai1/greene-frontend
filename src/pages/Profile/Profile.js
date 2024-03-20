import React from 'react';
import './Profile.scss';
import axios from 'axios';
import { useEffect, useState , useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';

function Profile() {

  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [userData, setUserData] = useState([]);

  const [subscriptionData, setSubscriptionData ] = useState([]);

  let bearerToken = localStorage.getItem("userInfo");

  // Fetch logged in user information
  function renderUserInformation() {

    axios.get(`${process.env.REACT_APP_API_URL}/currentUser` , {
      headers: {
        Authorization: "Bearer "+bearerToken
      }
    })
      .then(response => {
        setUserData(response.data);
      }).catch(error => {
        console.log("There is problem fetching user data");
      });
  }

  // Fetch logged in user information
  function renderSubscriptionInformation() {

    axios.get(`${process.env.REACT_APP_API_URL}/subscription/${currentUser.id}` , {
      headers: {
        Authorization: "Bearer "+bearerToken
      }
    })
      .then(response => {
        setSubscriptionData(response.data);
      }).catch(error => {
        console.log("There is problem fetching subscription data");
      });
  }

  // Converting date to appropriate format
  let d = new Date(subscriptionData.created_at)
  let newDate = d.toDateString();

  // Initialise useNavigate hook to redirection
  let navigate = useNavigate();

  // handling logout
  function handelLogout() {
    //clear the JWT token from session storage
    sessionStorage.removeItem('user');

    // clear the JWT token from local storage
    localStorage.removeItem('userInfo');

    //Setting the context to no user
    setCurrentUser(null);

    // navigate to home page after logging out
    navigate(`/`);
  }

  useEffect(() => {
    renderUserInformation();
  }, []);

  useEffect(() => {
    renderSubscriptionInformation();
  }, []);

  return (
    <div className='greene__profile'>
      <div className='greene__profile-userinformation'>
        <div className='greene__profile-title'>User Profile</div>
        <div className='greene__profile-information'>
          <div className='greene__profile-datatitle'>Name:</div>
          <div className='greene__profile-data'>{userData.firstName}&nbsp;{userData.lastName}</div>
        </div>
        <div className='greene__profile-information'>
          <div className='greene__profile-datatitle'>Username:</div>
          <div className='greene__profile-data'>{userData.username}</div>
        </div>
        <div className='greene__profile-information'>
          <div className='greene__profile-datatitle'>Email address:</div>
          <div className='greene__profile-data'>{userData.email}</div>
        </div>
        <div className='greene__profile-cta'>
          <button className='greene__profile-edit'>Edit</button>
          <button className='greene__profile-logout' onClick={handelLogout}>Log out</button>
        </div>
      </div>
      <div className='greene__profile-subscriptioninfo'>
      <div className='greene__profile-subscriptiontitle'>Subscription</div>
        <div className='greene__profile-subscriptiondetails'>
            <div className='greene__profile-plantitle'>Plan:</div>
            <div className='greene__profile-plandata'>{subscriptionData.planName}</div>
        </div>
        <div className='greene__profile-subscriptiondetails'>
            <div className='greene__profile-plantitle'>Plan Start Date:</div>
            <div className='greene__profile-plandata'>{newDate}</div>
        </div>
        <div className='greene__profile-cta'>
          <button className='greene__profile-cancelcta'>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Profile