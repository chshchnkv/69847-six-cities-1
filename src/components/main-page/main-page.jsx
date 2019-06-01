import React from "react";
import OffersList from "../offers-list/offers-list";
import PropTypes from "prop-types";
import {AccommodationType} from "../../data";
import Map from "../map/map";
import {getCityInfoById} from "../../utils";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withTransformProps from "../../hocs/with-transform-props/with-transform-props";

const OffersListWithActiveItemWrapped = withActiveItem(withTransformProps((props) => (
  Object.assign({}, props, {
    onImageClick: props.onChangeActiveItem
  })
))(OffersList));

const MainPage = (props) => {
  const {
    cityId,
    offers,
    offerId,
    onSelectOffer
  } = props;

  const {title} = getCityInfoById(cityId);

  return (
    <div className="cities__places-wrapper">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} place{offers.length > 1 ? `s` : ``} to stay in {title}</b>
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
            <Map cityId={cityId} pins={offers.map((offer) => offer.location)} activePin={offers.findIndex((offer) => offer.id === offerId)}/>
          </section>
        </div>
      </div>
    </div>
  );
};

MainPage.propTypes = {
  cityId: PropTypes.number.isRequired,
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
      city: PropTypes.number,
      longitude: PropTypes.number,
      latitude: PropTypes.number
    })
  })).isRequired,
  onSelectOffer: PropTypes.func.isRequired,
  offerId: PropTypes.number
};

export default MainPage;
