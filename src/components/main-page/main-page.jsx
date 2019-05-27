import React from "react";
import OffersList from "../offers-list/offers-list";
import PropTypes from "prop-types";
import {AccommodationType} from "../../data";
import Map from "../map/map";

const MainPage = (props) => {
  const {
    city,
    offers,
    onPlaceTitleClick,
    onPlaceImageClick
  } = props;

  return (
    <div className="cities__places-wrapper">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} place{offers.length > 1 ? `s` : ``} to stay in {city.title}</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex="0">
              Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex="0">Popular</li>
              <li className="places__option" tabIndex="0">Price: low to high</li>
              <li className="places__option" tabIndex="0">Price: high to low</li>
              <li className="places__option" tabIndex="0">Top rated first</li>
            </ul>
          </form>
          <OffersList offers={offers} onTitleClick={onPlaceTitleClick} onImageClick={onPlaceImageClick}/>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map city={city} pins={offers.map((offer) => offer.location)}/>
          </section>
        </div>
      </div>
    </div>
  );
};

MainPage.propTypes = {
  city: PropTypes.shape({
    title: PropTypes.string,
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    zoom: PropTypes.number,
  }),
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    src: PropTypes.string,
    rating: PropTypes.number,
    price: PropTypes.shape({
      value: PropTypes.number,
      period: PropTypes.oneOf([`night`])
    }),
    isPremium: PropTypes.bool,
    type: PropTypes.oneOf([...Object.values(AccommodationType)]).isRequired,
    location: PropTypes.shape({
      longitude: PropTypes.number,
      latitude: PropTypes.number
    })
  })).isRequired,
  onPlaceTitleClick: PropTypes.func,
  onPlaceImageClick: PropTypes.func
};

export default MainPage;
