import React from "react";
import PropTypes from "prop-types";
import {AccommodationType} from "../../data";
import PlaceCard from "../place-card/place-card";

const OffersList = (props) => {
  const {
    offers,
    onImageClick,
    onFavoriteClick,
  } = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer, i) => <PlaceCard key={i} place={offer} onImageClick={onImageClick} onFavoriteClick={onFavoriteClick}/>)}
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    src: PropTypes.string,
    rating: PropTypes.number,
    price: PropTypes.number,
    isPremium: PropTypes.bool,
    type: PropTypes.oneOf([...Object.values(AccommodationType)]).isRequired,
  })).isRequired,
  onImageClick: PropTypes.func,
  onFavoriteClick: PropTypes.func,
};

export default OffersList;
