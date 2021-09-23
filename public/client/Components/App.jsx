/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */

// HELLO

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import fetch from 'isomorphic-fetch';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import Map from './Map.jsx';
import Welcome from './Welcome.jsx';
import FavoriteList from './FavoriteList.jsx';
import NewsFeed from './NewsFeed.jsx';
import LoginPage from './LoginPage.jsx';

function App() {
  const [currentFavorites, setFavorites] = useState({});
  const [loginStatus, changeLoginStatus] = useState(false);//CHANGED IT FOR NOW
  const [loginAttempt, changeAttempt] = useState(null);
  const [currentUser, changeUser] = useState(null);
  const [currentCountryClick, setCurrentCountryClick] = useState(null);
  const [posts, setPosts] = useState([]);
  const [rendering, setRendering] = useState('showFav');
  const [signInWithGoogle, changeSignInWithGoogle] = useState(false);

  const grabFavoritesFromDB = (data, name) => {
    if (!Array.isArray(data)) throw Error('wrong');
    if (Array.isArray(data)) {
      setFavorites({});
      const favoritesObj = {};
      data.forEach((elem) => {
        favoritesObj[elem.title] = elem.link;
      });
      setFavorites(favoritesObj);
      changeUser(name);
      changeLoginStatus(true);
    }
  };

  const loginButton = (e) => {
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    console.log('We are in the loginButtin function');
    if (username.value === '' || password.value === '') {
      const result = 'Please fill out the username and password fields to log in.';
      changeAttempt(result);
    } else {
      const user = {
        username: username.value,
        password: password.value,
      };
      fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),

      })
        .then((res) => res.json())
        .then((data) => {
          grabFavoritesFromDB(data, username.value);
        })
        .catch((err) => changeAttempt('Incorrect username or password!'));
    }
  };

  const signUp = () => {
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');

    if (username.value === '' || password.value === '') {
      const result = 'Please fill out the username and password fields to sign up.';
      changeAttempt(result);
    } else if (password.value.length < 5) {
      const result = 'Please create a password longer than 5 characters';
      changeAttempt(result);
    } else {
      const user = {
        username: username.value,
        password: password.value,
      };
      fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
        .then((res) => {
          if (res.status === 200) {
            changeLoginStatus(true);
            changeUser(username.value);
          }
        })

        .catch((err) => console.log(err));
    }
  };

  const googleLogin = (response) => {
    const { name, googleId } = response.profileObj;
    const user = {
      username: name,
      password: googleId,
    };
    changeSignInWithGoogle(true);
    fetch('/api/loginWithGoogle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),

    })
      .then((res) => res.json())
      .then((data) => {
        grabFavoritesFromDB(data, name);
      })

      .catch((err) => console.log(err, 'error at google sign in'));
  };

  const getPosts = (countryName) => {
    setTimeout(async () => {
      const postFetchData = await fetch(`/api/getArticles/${countryName}`);
      const postsArr = await postFetchData.json();
      setPosts(postsArr);
    },
    1000);
  };

  const addFavorite = (title, link) => {
    const currentFavoritesCopy = { ...currentFavorites };
    const favoriteUpdate = Object.assign(currentFavoritesCopy, { [title]: link });
    setFavorites(favoriteUpdate);
    fetch('/api/addFav', {
      method: 'POST',
      body: JSON.stringify({ currentUser, title, link }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const deleteFavorite = (title, link) => {
    const currentFavoritesCopy = { ...currentFavorites };
    delete currentFavoritesCopy[title];
    setFavorites(currentFavoritesCopy);
    fetch('/api/deleteFav', {
      method: 'DELETE',
      body: JSON.stringify({ currentUser, title, link }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const faTimesX = <span id="fullStar" onClick={() => setRendering('showFav')}><FontAwesomeIcon icon={faBookmark} /></span>;

  const signOut = () => {
    changeLoginStatus(false);
    changeAttempt(null);
    setFavorites({});
    changeUser(null);
    setCurrentCountryClick(null);
    setPosts([]);
    changeSignInWithGoogle(false);
  };
  // if not logged in, render the login page
  if (loginStatus == false) {
    return (
      <BrowserRouter>
        <div>
          <LoginPage
            loginButton={loginButton}
            signUp={signUp}
            loginAttempt={loginAttempt}
            googleLogin={googleLogin}
          />
        </div>
      </BrowserRouter>
    );
  }
  // else if logged in, then return the map
  return (
    <div className="wrapper">
      <Welcome
        key={1}
        currentUser={currentUser}
        signOut={signOut}
        signInWithGoogle={signInWithGoogle}
      />
      {/* <Welcome key={1} currentUser={currentUser} signOut={signOut} /> */}
      {/* <button className="backToFavs" onClick={() => setRendering('showFav')}>X</button> */}
      <p id="favIcon">{faTimesX}</p>

      <Map
        setCurrentCountryClick={setCurrentCountryClick}
        getPosts={getPosts}
        setRendering={setRendering}
      />
      {(loginStatus == true && rendering == 'showFav')
        ? (
          <FavoriteList
            currentFavorites={currentFavorites}
            deleteFavorite={deleteFavorite}
          />
        )
        : (
          <NewsFeed
            currentCountryClick={currentCountryClick}
            posts={posts}
            currentFavorites={currentFavorites}
            setFavorites={setFavorites}
            addFavorite={addFavorite}
            deleteFavorite={deleteFavorite}
          />
        )}

      {/* ? (
          <LogIn
            loginStatus={loginStatus}
            loginButton={loginButton}
            signUp={signUp}
            loginAttempt={loginAttempt}
            key={1}
            changeLoginStatus={changeLoginStatus}
            googleLogin={googleLogin}
            signInWithGoogle={signInWithGoogle}
          />
        ) */}
      {/* : (
          <Welcome
            key={1}
            currentUser={currentUser}
            signOut={signOut}
            signInWithGoogle={signInWithGoogle}
          />
        )} */}

      {/* <Map
        setCurrentCountryClick={setCurrentCountryClick}
        getPosts={getPosts}
      />
      <NewsFeed
        posts={posts}
        currentFavorites={currentFavorites}
        addFavorite={addFavorite}
        deleteFavorite={deleteFavorite}
      />

      <FavoriteList
        currentFavorites={currentFavorites}
        deleteFavorite={deleteFavorite}
      /> */}
    </div>
  );
}

export default App;
