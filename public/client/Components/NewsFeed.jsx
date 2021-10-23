import React from 'react';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Post from './Post.jsx';

const Newsfeed = (props) => {
  const {
    posts, currentFavorites, addFavorite, deleteFavorite, faTimesX, setRendering,
  } = props;

  const createPosts = (postData) => {
    const arrOut = postData.map((post, index) => (
      <Post
        key={index}
        title={post.title}
        summary={post.summary}
        link={post.link}
        currentFavorites={currentFavorites}
        addFavorite={addFavorite}
        deleteFavorite={deleteFavorite}
      />
    ));
    return arrOut;
  };

  return (
    <section name="ArticlesAndClose" id="ArticlesAndClose">
      <section name="Articles" id="newsArticlesList">
        <span id="closeIcon">
          {' '}
          <FontAwesomeIcon
            onClick={faTimesX}
            icon={faWindowClose}
          />
        </span>
        {posts.length === 0 ? 'Click on a country to see its news!'
          : createPosts(posts)}
      </section>
    </section>
  );
};

export default Newsfeed;
