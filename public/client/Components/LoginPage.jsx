import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { BrowserRouter, Route, Link } from "react-router-dom";
// import { render } from 'sass';
import LogIn from './LogIn.jsx';
import Welcome from './Welcome.jsx';

const LoginPage = (props) => {
  const { loginStatus, loginAttempt, currentUser } = props;
  const { loginButton, signUp } = props;
  // const {signOut} = props;

  return (
    <div className="loginWrapper">
      <h1 className = "header">World Wide News</h1>
      <h6 className="header">Always with the news..</h6>
      <div id="inputButtonWrapper">
        <p><input name="username" placeholder="username" id="username" autoComplete="off" /></p>
        <p><input name="password" placeholder="password" id="password" autoComplete="off" type="password" /></p>
        <div id="buttonsDiv">
          <button type="button" onClick={loginButton} value="Log-In">Log In</button>
          <NavLink to="/forgotPassword" activeClassName="forgotPassword"> Forgot password?</NavLink>
          <br />
          <p> OR </p>
          <br />
          <button type="button" value="Log-In-Google"> Log in with Google </button>
          <br />
          Don't have an account?
          <button type="button" onClick={signUp} value="Sign-Up">Sign up</button>
        </div>
        <div id="loginAttemptMessage">
          {loginAttempt}
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
