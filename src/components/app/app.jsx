import React from "react";
import PropTypes from "prop-types";
import {AccommodationType, PeriodType} from "../../data";
import MainPage from "../main-page/main-page";
import {Action, ActionCreator} from "../../reducer";
import {connect} from "react-redux";
import CityList from "../city-list/city-list";
import {getCitiesFromOffers, getCityInfoByName} from "../../utils";

class App extends React.Component {
  render() {
    const {
      offers,
      currentCity,
      currentCityOffers,
      onPlaceTitleClick,
      onPlaceImageClick,
      onChangeCity,
    } = this.props;

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
              <CityList cities={getCitiesFromOffers(offers)} activeCity={currentCity} onChangeCity={onChangeCity}/>
            </section>
          </div>

          <MainPage city={getCityInfoByName(currentCity)} offers={currentCityOffers} onPlaceImageClick={onPlaceImageClick} onPlaceTitleClick={onPlaceTitleClick}/>

        </main>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  currentCity: PropTypes.string.isRequired,
  currentCityOffers: PropTypes.array.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    src: PropTypes.string,
    rating: PropTypes.number,
    price: PropTypes.shape({
      value: PropTypes.number,
      period: PropTypes.oneOf([...Object.values(PeriodType)])
    }),
    isPremium: PropTypes.bool,
    type: PropTypes.oneOf([...Object.values(AccommodationType)]).isRequired,
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      longitude: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired
    })
  })).isRequired,
  onPlaceTitleClick: PropTypes.func,
  onPlaceImageClick: PropTypes.func,
  onChangeCity: PropTypes.func
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentCity: state.city,
  currentCityOffers: state.offers.slice(0)
});

const mapDispatchToProps = (dispatch) => ({
  onChangeCity: (city) => {
    dispatch(ActionCreator[Action.CHANGE_CITY](city));
    dispatch(ActionCreator[Action.REQUEST_OFFERS](city));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
