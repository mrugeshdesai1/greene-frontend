import React from 'react';
import './Profile.scss';
import axios from 'axios';
import { useEffect, useState , useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';

function Profile() {

  const { currentUser, setCurrentUser } = useContext(AuthContext);

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
    </div>
  )
}

export default Profile