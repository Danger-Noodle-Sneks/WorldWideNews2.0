/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import Button from './Button.jsx';

function Welcome(props) {
  const { currentUser, signOut, signInWithGoogle } = props;
  return (
    <div id="welcomeDiv">
      Welcome
      <div>
        {currentUser}
      </div>
<<<<<<< HEAD
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
=======
      <Button key={1} onClick={signOut} />
>>>>>>> 263580d05ced0ee4c175599f22a29e8e94c254d7

    </div>
  );
}

export default Welcome;
