import React from "react";
import PropTypes from "prop-types";
import PropertyReview from "../property-review/property-review";

const PropertyReviewsList = (props) => {
  const {reviews = []} = props;
  return (
    <ul className="reviews__list">
      {reviews.map((review, index) => {
        const {
          id,
          comment,
          date,
          rating,
          user
        } = review;
        return (<li className="reviews__item" key={`review-${index}`}><PropertyReview id={id} comment={comment} date={date} rating={rating} user={user}/></li>);
      })}
    </ul>);
};

PropertyReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
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
  }))
};

export default PropertyReviewsList;
