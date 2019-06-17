import React from "react";
import PropTypes from "prop-types";
import {ratingToPercent} from "../../utils";

const PropertyReview = (props) => {
  const {
    user = {},
    rating = 0,
    comment = ``,
    date
  } = props;

  const dateParsed = new Date(date);

  const {
    name = ``,
    avatar_url: avatarUrl = ``
  } = user;

  return (
    <React.Fragment>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt={name}/>
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${ratingToPercent(rating)}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date}>{dateParsed.toLocaleString(`en-us`,{month: `long`})} {dateParsed.getDate()}, {dateParsed.getFullYear()}</time>
      </div>
    </React.Fragment>
  );
};

PropertyReview.propTypes = {
  id: PropTypes.number,
  user: PropTypes.shape({
    id: PropTypes.number,
    isPro: PropTypes.bool,
    name: PropTypes.string,
    avatarUrl: PropTypes.string
  }),
  rating: PropTypes.number,
  comment: PropTypes.string,
  date: PropTypes.string
};

export default PropertyReview;
