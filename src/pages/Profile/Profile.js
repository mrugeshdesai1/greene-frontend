import React from 'react';
import './Profile.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Profile() {

  const [userData, setUserData] = useState([]);

  // Fetch logged in user information
  function renderUserInformation() {

    let bearerToken = localStorage.getItem("userInfo");

    axios.get(`${process.env.REACT_APP_API_URL}/currentUser` , {
      headers: {
        Authorization: "Bearer "+bearerToken
      }
    })
      .then(response => {
        setUserData(response.data);
      }).catch(error => {
        console.log("There is problem fetching userdata");
      });
  }

  useEffect(() => {
    renderUserInformation();
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
          <button className='greene__profile-logout'>Log out</button>
        </div>
      </div>
    </div>
  )
}

export default Profile