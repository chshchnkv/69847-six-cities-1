import React from "react";
import OffersList from "../offers-list/offers-list";
import PropTypes from "prop-types";
import {AccommodationType} from "../../data";
import Map from "../map/map";
import {getCityInfoById} from "../../utils";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withTransformProps from "../../hocs/with-transform-props/with-transform-props";
import CityList from "../city-list/city-list";

const OffersListWithActiveItemWrapped = withActiveItem(withTransformProps((props) => (
  Object.assign({}, props, {
    onImageClick: props.onChangeActiveItem
  })
))(OffersList));

const CityListWithActiveItemWrapped = withActiveItem(withTransformProps((props) => {
  return Object.assign({}, props, {
    onChangeCity: props.onChangeActiveItem
  });
})(CityList));


const MainPage = (props) => {
  const {
    cities,
    cityId,
    offers,
    offerId,
    onSelectOffer,
    onChangeCity
  } = props;

  const {
    name,
    location
  } = getCityInfoById(cities, cityId);


  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="cities tabs">
        <section className="locations container">
          <CityListWithActiveItemWrapped cities={cities} activeItem={cityId} onChangeActiveItem={onChangeCity}/>
        </section>
      </div>

      <div className="cities__places-wrapper">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} place{offers.length > 1 ? `s` : ``} to stay in {name}</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex="0">
              Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"/>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex="0">Popular</li>
                <li className="places__option" tabIndex="0">Price: low to high</li>
                <li className="places__option" tabIndex="0">Price: high to low</li>
                <li className="places__option" tabIndex="0">Top rated first</li>
              </ul>
            </form>
            <OffersListWithActiveItemWrapped offers={offers} onChangeActiveItem={onSelectOffer}/>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map">
              <Map location={location} pins={offers.map((offer) => offer.location)} activePin={offers.findIndex((offer) => offer.id === offerId)}/>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

MainPage.propTypes = {
  cityId: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    src: PropTypes.string,
    rating: PropTypes.number,
    price: PropTypes.number,
    isPremium: PropTypes.bool,
    type: PropTypes.oneOf([...Object.values(AccommodationType)]).isRequired,
    location: PropTypes.shape({
      city: PropTypes.number,
      longitude: PropTypes.number,
      latitude: PropTypes.number
    })
  })).isRequired,
  cities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      longitude: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    })
  })),
  onSelectOffer: PropTypes.func.isRequired,
  offerId: PropTypes.number,
  onChangeCity: PropTypes.func.isRequired
};

export default MainPage;
