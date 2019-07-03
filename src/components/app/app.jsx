import React from "react";
import PropTypes from "prop-types";
import {AccommodationType, ratings} from "../../data";
import MainPage from "../main-page/main-page";
import {Action as SiteAction, ActionCreator as SiteActionCreator} from "../../reducer/site/site";
import {Operation as DataOperation} from "../../reducer/data/data";
import {Operation as UserOperation} from "../../reducer/user/user";
import {connect} from "react-redux";
import {getNearOffersById, getOfferById, getOffersByCityId, setSortOptionsToUrl} from "../../utils";
import SignIn from "../sign-in/sign-in";
import {Switch, Route, Link} from "react-router-dom";
import {PrivateRoute} from "../private-route/private-route";
import Favorites from "../favorites/favorites";
import Property from "../property/property";
import history from "../../history";

class App extends React.Component {
  render() {
    const {
      cities = [],
      offers = [],
      reviews = [],
      favorites = [],
      currentCityId = -1,
      currentOfferId,
      currentCityOffers,
      onChangeCity,
      onSelectOffer,
      onLoadOfferReviews,
      onLoadFavorites,
      onLogin,
      onPostReview,
      sort,
      onSort,
      onChangeFavorite,
      user = {},
      isSendingComment
    } = this.props;

    if (currentCityId < 0 || cities.length === 0 || offers.length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link to="/" className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </Link>
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
          <Route path="/" exact render = {() => {
            return <MainPage
              cityId={currentCityId}
              offers={currentCityOffers}
              cities={cities}
              sort={sort}
              onSelectOffer={onSelectOffer}
              offerId={currentOfferId}
              onChangeCity={onChangeCity}
              onSort={onSort}
              onChangeFavorite={onChangeFavorite}
            />;
          }}/>
          <Route path="/login" render = {() => <SignIn cities={cities} currentCityId={currentCityId} onSubmit={onLogin}/>}/>
          <Route path="/offer/:id" render = {({match}) => {
            const offer = getOfferById(offers, parseInt(match.params.id, 10));
            return <Property
              place={offer}
              nearPlaces={getNearOffersById(offers, offer)}
              reviews={reviews}
              onRequestComments={onLoadOfferReviews}
              user={user}
              cities={cities}
              onPostComment={onPostReview}
              ratings={ratings}
              isCommentSending={isSendingComment}
              onFavoriteChange={onChangeFavorite}
            />;
          }}/>
          <PrivateRoute path="/favorites" component={Favorites} onRequestFavorites={onLoadFavorites} onFavoriteClick={onChangeFavorite} cities={cities} favorites={favorites} user={user}/>
        </Switch>

      </React.Fragment>
    );
  }

  _getProfile() {
    const {
      user = {},
    } = this.props;

    const {
      id: userId = -1,
      name: userName,
      avatarUrl: userAvatar = ``,
    } = user;

    return (
      <Link className="header__nav-link header__nav-link--profile" href="#" to="/favorites">
        <div className="header__avatar-wrapper user__avatar-wrapper">{userAvatar === `` ? `` : <img src={userAvatar}/>}</div>
        <span className="header__user-name user__name">{userId < 0 ? `Sign in` : userName}</span>
      </Link>
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
  favorites: PropTypes.arrayOf(PropTypes.shape({
    cityId: PropTypes.number,
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
    }))
  })),
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
  })),
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
    isPro: PropTypes.bool
  }),
  sort: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string
  }),
  isSendingComment: PropTypes.bool,
  onChangeCity: PropTypes.func,
  onSelectOffer: PropTypes.func,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
  onLoadOfferReviews: PropTypes.func,
  onLoadFavorites: PropTypes.func,
  onPostReview: PropTypes.func,
  onSort: PropTypes.func,
  onChangeFavorite: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offers: state.data.offers,
  cities: state.data.cities,
  currentCityId: state.site.cityId,
  currentOfferId: state.site.offerId,
  currentCityOffers: getOffersByCityId(state.data.offers, state.site.cityId),
  user: state.user.user,
  reviews: state.data.reviews,
  sort: state.data.sort,
  isSendingComment: state.data.isSendingComment,
  favorites: state.data.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeCity: (cityId) => {
    dispatch(SiteActionCreator[SiteAction.CHANGE_CITY](cityId));
    dispatch(SiteActionCreator[SiteAction.CHANGE_OFFER](-1));
  },
  onSelectOffer: (offerId) => {
    dispatch(SiteActionCreator[SiteAction.CHANGE_OFFER](offerId));
  },
  onLoadOfferReviews: (offerId) => {
    dispatch(DataOperation.loadComments(offerId));
  },
  onLoadFavorites: () => {
    return dispatch(DataOperation.loadFavorites());
  },
  onPostReview: (propertyId, rating, comment) => {
    return dispatch(DataOperation.postComment(propertyId, rating, comment));
  },
  onLogin: (email, password) => {
    dispatch(UserOperation.login(email, password));
  },
  onLogout: () => {
    dispatch(UserOperation.logout());
  },
  onSort: (sortOptions) => {
    dispatch(DataOperation.sortOffers(sortOptions));
    const url = `${window.location.pathname}?${setSortOptionsToUrl(window.location, sortOptions)}`;
    history.replace(url);
  },
  onChangeFavorite: (propertyId, isFavorite) => {
    dispatch(DataOperation.postFavorite(propertyId, isFavorite));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
