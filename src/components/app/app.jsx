import React from "react";
import PropTypes from "prop-types";
import {AccommodationType} from "../../data";
import MainPage from "../main-page/main-page";
import {Action, ActionCreator, Operation} from "../../reducer";
import {connect} from "react-redux";
import {getOffersByCityId} from "../../utils";
import SignIn from "../sign-in/sign-in";
import {Switch, Route} from "react-router-dom";
import {PrivateRoute} from "../private-route/private-route";
import Favorites from "../favorites/favorites";

class App extends React.Component {
  render() {
    const {
      cities,
      offers,
      currentCityId,
      currentOfferId,
      currentCityOffers,
      onChangeCity,
      onSelectOffer,
      onLogin,
      user = {}
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
                  <li className="header__nav-item user">{this._getProfile()}</li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <Switch>
          <Route path="/" exact render = {() => <MainPage cityId={currentCityId} offers={currentCityOffers} cities={cities} onSelectOffer={onSelectOffer} offerId={currentOfferId} onChangeCity={onChangeCity} />}/>
          <Route path="/login" render = {() => <SignIn cities={cities} currentCityId={currentCityId} onSubmit={onLogin}/>}/>
          <PrivateRoute path="/favorites" user={user} render = {() => <Favorites cities={cities} currentCityId={currentCityId} onSubmit={onLogin}/>}/>
        </Switch>

      </React.Fragment>
    );
  }

  _getProfile() {
    const {
      user = {},
      onSignInClick,
      onLogout
    } = this.props;

    const {
      id: userId = -1,
      name: userName,
      avatarUrl: userAvatar = ``,
    } = user;

    return (
      <a className="header__nav-link header__nav-link--profile" href="#" onClick={userId < 0 ? onSignInClick : onLogout}>
        <div className="header__avatar-wrapper user__avatar-wrapper">{userAvatar === `` ? `` : <img src={userAvatar}/>}</div>
        <span className="header__user-name user__name">{userId < 0 ? `Sign in` : userName}</span>
      </a>
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
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
    isPro: PropTypes.bool
  }),
  onChangeCity: PropTypes.func,
  onSelectOffer: PropTypes.func,
  onSignInClick: PropTypes.func,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offers: state.offers,
  cities: state.cities,
  currentCityId: state.cityId,
  currentOfferId: state.offerId,
  currentCityOffers: getOffersByCityId(state.offers, state.cityId),
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeCity: (cityId) => {
    dispatch(ActionCreator[Action.CHANGE_CITY](cityId));
    dispatch(ActionCreator[Action.CHANGE_OFFER](-1));
  },
  onSelectOffer: (offerId) => {
    dispatch(ActionCreator[Action.CHANGE_OFFER](offerId));
  },
  onSignInClick: () => {
    history.pushState(null, null, `/login`);
  },
  onLogin: (email, password) => {
    dispatch(Operation.login(email, password));
  },
  onLogout: () => {
    dispatch(ActionCreator[Action.CHANGE_USER]({}));
    dispatch(ActionCreator[Action.AUTHORIZATION_REQUIRED](false));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
