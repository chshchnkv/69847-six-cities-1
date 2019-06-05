import React from "react";
import PropTypes from "prop-types";
import {AccommodationType} from "../../data";
import MainPage from "../main-page/main-page";
import {Action, ActionCreator} from "../../reducer";
import {connect} from "react-redux";
import CityList from "../city-list/city-list";
import {getOffersByCityId} from "../../utils";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withTransformProps from "../../hocs/with-transform-props/with-transform-props";


const CityListWithActiveItemWrapped = withActiveItem(withTransformProps((props) => {
  return Object.assign({}, props, {
    onChangeCity: props.onChangeActiveItem
  });
})(CityList));

class App extends React.Component {
  render() {
    const {
      cities,
      offers,
      currentCityId,
      currentOfferId,
      currentCityOffers,
      onChangeCity,
      onSelectOffer
    } = this.props;

    if (cities.length === 0 || offers.length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="cities tabs">
            <section className="locations container">
              <CityListWithActiveItemWrapped cities={cities} activeItem={currentCityId} onChangeActiveItem={onChangeCity}/>
            </section>
          </div>

          <MainPage cityId={currentCityId} offers={currentCityOffers} cities={cities} onSelectOffer={onSelectOffer} offerId={currentOfferId} />

        </main>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  currentCityId: PropTypes.number.isRequired,
  currentCityOffers: PropTypes.array.isRequired,
  currentOfferId: PropTypes.number,
  cities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    location: PropTypes.shape({
      longitude: PropTypes.number,
      latitude: PropTypes.number,
      zoom: PropTypes.number
    })
  })),
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
      longitude: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired
    })
  })).isRequired,
  onChangeCity: PropTypes.func,
  onSelectOffer: PropTypes.func
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offers: state.offers,
  cities: state.cities,
  currentCityId: state.cityId,
  currentOfferId: state.offerId,
  currentCityOffers: getOffersByCityId(state.offers, state.cityId),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeCity: (cityId) => {
    dispatch(ActionCreator[Action.CHANGE_CITY](cityId));
    dispatch(ActionCreator[Action.CHANGE_OFFER](-1));
  },
  onSelectOffer: (offerId) => {
    dispatch(ActionCreator[Action.CHANGE_OFFER](offerId));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
