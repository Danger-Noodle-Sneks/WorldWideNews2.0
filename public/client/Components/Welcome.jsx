/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import GoogleLogout from 'react-google-login';
import Button from './Button.jsx';

function Welcome(props) {
  const { currentUser, signOut, signInWithGoogle } = props;
  return (
    <div id="welcomeDiv">
      Welcome
      <div>
        {currentUser}
      </div>

      {currentUser}
      {signInWithGoogle
        ? (
          <GoogleLogout
            clientID="476477218164-tvc3q7g5c9tgem4cqtdq39d4894b2qlu.apps.googleusercontent.com"
            buttonText="Sign Out"
            onSuccess={signOut}
          />
        )
        : (<Button key={1} onClick={signOut}/>)}

    </div>
  );
}

export default Welcome;
