import React from "react";
import PropTypes from "prop-types";
import {AccommodationType} from "../../data";
import PlaceCard from "../place-card/place-card";

class OffersList extends React.PureComponent {
  render() {
    const {
      offers,
      onTitleClick,
      onImageClick
    } = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer, i) => <PlaceCard key={i} place={offer} onImageClick={onImageClick} onTitleClick={onTitleClick}/>)}
      </div>
    );
  }
}

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
  onTitleClick: PropTypes.func,
  onImageClick: PropTypes.func
};

export default OffersList;
