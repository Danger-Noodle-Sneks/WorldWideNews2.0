/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import GoogleLogout from 'react-google-login';
// import Button from './Button.jsx';

function Welcome(props) {
  const { currentUser, signOut, signInWithGoogle } = props;
  return (
    <div id="welcomeDiv">
      <div id="welcomeText">
        <p id="welcomeWord">Signed in as</p>
        {currentUser}
      </div>
      {signInWithGoogle
        ? (
          <GoogleLogout
            clientID="476477218164-tvc3q7g5c9tgem4cqtdq39d4894b2qlu.apps.googleusercontent.com"
            buttonText="Sign Out"
            onSuccess={signOut}
          />
        )
        : (<button key={1} id="logOutBtn" onClick={signOut}>Sign out </button>)}

    </div>
  );
}

export default Welcome;
