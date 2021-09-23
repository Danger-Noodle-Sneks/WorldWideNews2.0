import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


const FavoritedPost = (props) => {
  const { title, link, deleteFavorite} = props;

  const faHearts = <span id="fullStar" onClick={() => deleteFavorite(title, link)}><FontAwesomeIcon icon={faHeart} /></span>;

  return (

    <section name="Post" id="individualPostWrapper">
      <div name="Post Title" id="title">
        <a id="favoriteLinks" href={link}>{title}</a>
      </div>
      <div id="removingFav">{faHearts}</div>
      
    </section>
  );
};

FavoritedPost.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
};
export default FavoritedPost;
