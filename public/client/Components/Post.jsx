import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartFilled } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';

const Post = (props) => {
  const {
    title, summary, link, currentFavorites, addFavorite, deleteFavorite,
  } = props;

  let favorited = false;

  if (currentFavorites[title] === link) favorited = true;

  const heartEmpty = <span id="emptyStar" onClick={() => addFavorite(title, link)}><FontAwesomeIcon icon={faHeartEmpty} /></span>;
  const heartFull = <span id="fullStar" onClick={() => deleteFavorite(title)}><FontAwesomeIcon icon={faHeartFilled} /></span>;

  return (
    <section name="Post" id="newsPostWrapper">
      <div name="Post Title" id="articleTitle">
        <a id="newsLink" href={link} target="_blank" rel="noreferrer">{title}</a>
        <div id="favStar">
          {' '}
          {favorited ? heartFull : heartEmpty}
          {' '}
        </div>
      </div>
      <div name="Article Summary" id="articleSummary">
        {summary}
      </div>

    </section>
  );
};

Post.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentFavorites: PropTypes.object.isRequired,
};
export default Post;
