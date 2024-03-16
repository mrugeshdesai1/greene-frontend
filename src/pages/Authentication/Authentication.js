import React from 'react';
import './Authentication.scss';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import { Link } from "react-router-dom";
import axios from 'axios';

function Authentication() {

  const { setAuth, currentUser, setCurrentUser } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // use state for User Name
  const [user, setUser] = useState('');

  // use state for password
  const [pwd, setPwd] = useState('');

  // use state for error message
  const [errMsg, setErrMsg] = useState('');

  // use state for setting successful login
  const [success, setSuccess] = useState(false);

  // setting the error message to null when username, password are validated
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleLogin = async (e) => {
    e.preventDefault();

    // fetching the form data
    const loginData = {
      username:user,
      password:pwd,
    };

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, loginData,
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        setCurrentUser(response?.data);
        console.log(response?.data);
        sessionStorage.setItem("user", JSON.stringify(response.data));
        const JWTtoken = response?.data?.token;
        setAuth({ user, pwd, JWTtoken });
        setUser('');
        setPwd('');
        setIsLoggedIn(true);
        setSuccess(true);
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
    }
}

  return (
    <div className='greene__authentication'>
      {/* if the user is successfully registered display success message and populate the link to Log In page OR render the register form*/}
      { success ? (
        <section className='greene__authentication-success'>
          <div className='greene__authentication-successtitle'>You are logged in!</div>
          <Link to={`/subscribe`} className='greene__authentication-successnavigation'>Subscribe</Link>
        </section>
      ) :
      (
        <div className='greene__authentication-login'>
          {/* Place holder to display error message in case there is invalid entry*/}
          <div ref={errRef} className={errMsg ? "greene__authentication-errmsg" : "greene__authentication-offscreen"} aria-live="assertive">{errMsg}</div>
          <div className='greene__authentication-title'>Hi there!</div>
          <div className='greene__authentication-subtitle'>Please enter your details.</div>
          <form className='greene__authentication-form' onSubmit={handleLogin}>
            <label className='greene__authentication-label' htmlFor="username">Username:</label>
            <input className='greene__authentication-username' type="text" id="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required/>
            <label className='greene__authentication-label' htmlFor="password">Password:</label>
            <input className='greene__authentication-password' type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required/>
            <button className="greene__authentication-submitbutton" >Log in</button>
          </form>
          <div className='greene__authentication-needaccount'>
            <div className='greene__authentication-text'>Need an account?</div>
            <Link to={`/register`} className='greene__authentication-navigation'>Register here</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Authentication