import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
// import { BrowserRouter, Route, Link } from "react-router-dom";
// import { render } from 'sass';
import imgBack from '../scss/97e05f8a5ace9f39b1d004d431f8a7b7.jpg';

const LoginPage = (props) => {
  const {
    loginStatus, loginAttempt, currentUser, googleLogin,
  } = props;
  const { loginButton, signUp } = props;
  // const {signOut} = props;

  return (
    <div className="loginWrapper">

      <div className="loginTitles">
        <h1 className="header">World Wide News</h1>
        {/* <h6 className="header">Same globe, now closer.</h6> */}
      </div>

      <div id="inputButtonWrapper">
        <input name="username" placeholder="username" id="username" autoComplete="off" />
        <input name="password" placeholder="password" id="password" autoComplete="off" type="password" />
      </div>

        <div id="buttonsDiv">
          <button type="button" id="loginBtn" onClick={loginButton} value="Log-In">Log In</button>
          <button id="forgotPassword"> Forgot password?</button>
        </div>

        <div id="buttonsDivSignUp">
          <p id="or">OR</p>

          <GoogleLogin
            clientId="476477218164-tvc3q7g5c9tgem4cqtdq39d4894b2qlu.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={googleLogin}
            onFailure={loginAttempt}
            cookiePolicy="single_host_origin"
          />
          <div id="signUpArea">
          <h2> Don't have an account? </h2>
          <button type="button" onClick={signUp} id="signupBtn" value="Sign-Up">Sign up</button>
          </div>
        </div>
        <div id="loginAttemptMessage">
          {loginAttempt}
        </div>
      
    </div>
  );
};
export default LoginPage;
