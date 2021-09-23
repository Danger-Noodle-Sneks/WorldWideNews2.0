/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import Button from './Button.jsx';

function Welcome(props) {
  const { currentUser, signOut, signInWithGoogle } = props;
  return (
    <div id="welcomeDiv">
     
      <div>
        <p>Welcome</p>
        <p>{currentUser}</p>
      </div>

      {currentUser}
      {signInWithGoogle
        ? (
          <GoogleLogout
            clientID="476477218164-tvc3q7g5c9tgem4cqtdq39d4894b2qlu.apps.googleusercontent.com"
            buttonText="Sign Out"
            onSuccess={signOut}
            autoLoad={false}
          />
        )
        : (<Button key={1} signOut={signOut} />)}

    </div>
  );
}

export default Welcome;
