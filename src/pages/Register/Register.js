import React from 'react';
import './Register.scss';
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function Register() {

  const userRef = useRef();
  const errRef = useRef();

  // use state for checking if user is successfully signed up
  const [isSignedUp, setIsSignedUp] = useState(false);

  // use state for first Name
  const [firstName, setFirstName] = useState('');

  // use state for Last Name
  const [lastName, setLastName] = useState('');

  // use state for User Name and checking its validity
  const [username, setUserName] = useState('');
  const [validName, setValidName] = useState(false);

  // use state for email and checking its validity
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  // use state for password and checking its validity
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  // use state for error message and success message
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

    // setting the valid username when username is validated with REGEX
    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    // setting the valid email when email is validated with REGEX
    useEffect(() => {
      setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  // setting the valid password when password is validated with REGEX
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])

    // // setting the error message to null when username, password and email are validated
    useEffect(() => {
        setErrMsg('');
    }, [username,email, pwd])

    const handleSignup = async (e) => {
      e.preventDefault();
      // if button enabled with JS hack
      const usename = USER_REGEX.test(username);
      const password = PWD_REGEX.test(pwd);
      const emailAddress = EMAIL_REGEX.test(email);

      // If the username, password OR email address are invalid, then show the error message
      if (!usename || !password || !emailAddress) {
          setErrMsg("Invalid Entry");
          return;
      }

      // fetching the form data
      const formData = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password:pwd,
      };

      // Axios POST request to create and successfully register the user else give the error
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, formData,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        setSuccess(true);
        setIsSignedUp(true);
        //clear state and controlled inputs
        //need value attrib on inputs for this
        setUserName('');
        setPwd('');
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 409) {
            setErrMsg('Invalid input');
        } else {
            setErrMsg('Registration Failed')
        }
        errRef.current.focus();
    }

  }   

  return (
    <div className='greene__register'>
      {/* if the user is successfully registered display success message and populate the link to Log In page OR render the register form*/}
      { success ? (
        <section className='greene__register-success'>
          <div className='greene__register-successtitle'>Success!</div>
          <Link to={`/authenticate`} className='greene__register-successnavigation'>Log In</Link>
        </section>
      ) :
      (
        <div className='greene__register-register'>
          {/* Place holder to display error message in case there is invalid entry*/}
          <div ref={errRef} className={errMsg ? "greene__register-errmsg" : "greene__register-offscreen"} aria-live="assertive">{errMsg}</div>
          <div className='greene__register-title'>Let's get you registered!</div>
          <form className='greene__register-form' onSubmit={handleSignup}>
            <label className='greene__register-label' htmlFor="firstname">First Name:</label>
            <input className='greene__register-firstname' type="text" id="firstname" ref={userRef} autoComplete="off" onChange={(e) => setFirstName(e.target.value)} value={firstName} required/>
            <label className='greene__register-label' htmlFor="lastname">Last Name:</label>
            <input className='greene__register-lastname' type="text" id="lastname" ref={userRef} autoComplete="off" onChange={(e) => setLastName(e.target.value)} value={lastName} required/>
            <label className='greene__register-label' htmlFor="username">Username:</label>
            <input className='greene__register-username' type="text" id="username" ref={userRef} autoComplete="off" onChange={(e) => setUserName(e.target.value)} value={username} required/>
            <label className='greene__register-label' htmlFor="email">Email:</label>
            <input className='greene__register-email' type="text" id="email" ref={userRef} autoComplete="off" onChange={(e) => setEmail(e.target.value)} value={email} required/>
            <label className='greene__register-label' htmlFor="password">Password:</label>
            <input className='greene__register-password' type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required/>
            <button className="greene__register-submitbutton" disabled={!validName || !validPwd || !validEmail ? true : false}>Sign Up</button>
          </form>
          <div className='greene__register-alreadyregistered'>
            <div className='greene__register-text'>Already Registered?</div>
            <Link to={`/authenticate`} className='greene__register-navigation'>Log In</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Register