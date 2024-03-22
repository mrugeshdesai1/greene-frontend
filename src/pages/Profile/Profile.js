import React from 'react';
import './Profile.scss';
import axios from 'axios';
import { useEffect, useState , useContext } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';

function Profile() {

  // call the current logged-in user from Authcontext
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  // Use state for user information
  const [userData, setUserData] = useState([]);

  // Use state for subscription information
  const [subscriptionData, setSubscriptionData ] = useState([]);

  // Use state for setting error for session start
  const [errMsg, setErrMsg] = useState('');

  // Use state for setting error for session stop
  const [stopError, setStopError] = useState('');

  // Use state for for session start
  const [startSession , setStartSession] = useState(false);

  // Use state for for session stop
  const [stopSession , setStopSession] = useState(false);

  // Use state for for getting the duration of the charging session
  const [duration , setDuration] = useState('');

  // Use state for for cancelling the subscription
  const [cancelSubscription , setCancelSubscription] = useState(false);

  // Use state for setting error while cancelling the subscription
  const [cancelError, setCancelError] = useState('');

  // creating instance of bearer token from local storage
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

  // handle the charging session start
  async function handleStartSession() {

    // Creating an object to send it feed at backend
    const inputDetails = {
      userId: currentUser.id,
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/start-session`, inputDetails,
          {
              headers: {
                  Authorization: "Bearer "+bearerToken
              }
          }
      );
      setStartSession(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("There is problem starting charge session");
      } 
    }
  }

  // handle the charging session stop
  async function handleStopSession() {

    // Creating an object to send it feed at backend
    const input = {
      userId: currentUser.id,
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/stop-session`, input,
          {
              headers: {
                  Authorization: "Bearer "+bearerToken
              }
          }
      );
      setDuration(response?.data.duration);
      setStopSession(true);
    } catch (err) {
      if (!err?.response) {
        setStopError("There is problem stopping charge session");
      } 
    }
  }

  // handle the subscription cancellation
  async function handleCancelSubscription() {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/subscription/${currentUser.id}`,
          {
              headers: {
                  Authorization: "Bearer "+bearerToken
              }
          }
      );
      setCancelSubscription(true);
    } catch (err) {
      if (!err?.response) {
        setCancelError("Unable to cancel the subscription!");
      } 
    }
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
      { cancelSubscription ? (
        <section className='greene__profile-successcancellation'>
          <div className='greene__profile-cancelmessage'>You subscription has been cancelled!</div>
          <Link to={`/subscribe`} className='greene__profile-successnavigation'>Subscribe again</Link>
        </section>
      ):
      (
      <>
      <div className={cancelError ? "greene__profile-cancelerrmsg" : "greene__profile-canceloffscreen"} aria-live="assertive">{cancelError}</div> 
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
          <button className='greene__profile-cancelcta' onClick={handleCancelSubscription}>Cancel</button>
        </div>
      </div>
      <div className='greene__profile-sessionmanagement'>
        <div className='greene__profile-sessiontitle'>Session</div>
        <div className='greene__profile-sessioncta'>
          <button className='greene__profile-sessionstart' onClick={handleStartSession}>Start Charging</button>
          <button className='greene__profile-sessionstop' onClick={handleStopSession}>Stop Charging</button>
        </div>
        {
          startSession ? (<div className='greene__profile-startnotification'>Charging Started.</div>):
          (<div className={errMsg ? "greene__profile-errmsg" : "greene__profile-offscreen"} aria-live="assertive">{errMsg}</div>)
        }
        {
          stopSession ? (<div className='greene__profile-stopnotification'>Charging Stopped.<span className='greene__profile-duration'>Total charging time is {duration}mins.</span></div>):
          (<div className={stopError ? "greene__profile-stoperrmsg" : "greene__profile-stopoffscreen"} aria-live="assertive">{stopError}</div>)
        }
      </div>
      </>
      )}
    </div>
  )
}

export default Profile