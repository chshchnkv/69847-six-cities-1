import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AccommodationType} from "../../data";
import {getCityInfoById} from "../../utils";
import PlaceCard from "../place-card/place-card";

export default class Favorites extends React.PureComponent {
  componentDidMount() {
    const {onRequestFavorites} = this.props;
    onRequestFavorites();
  }

  componentDidUpdate() {
    const {onRequestFavorites} = this.props;
    onRequestFavorites();
  }

  render() {
    const {
      favorites,
      cities,
      onFavoriteClick
    } = this.props;

    return (
      <React.Fragment>
        {
          favorites.length > 0 ? (
            <main className="page__main page__main--favorites">
              <div className="page__favorites-container container">
                <section className="favorites">
                  <h1 className="favorites__title">Saved listing</h1>
                  <ul className="favorites__list">
                    {favorites.map((favorite, index) => {
                      const {
                        cityId,
                        offers: cityFavorites
                      } = favorite;

                      const cityInfo = getCityInfoById(cities, cityId);
                      const {name: cityName} = cityInfo;

                      return (
                        <li key={`fav-city-${index}`} className="favorites__locations-items">
                          <div className="favorites__locations locations locations--current">
                            <div className="locations__item">
                              <a className="locations__item-link" href="#">
                                <span>{cityName}</span>
                              </a>
                            </div>
                          </div>
                          <div className="favorites__places">
                            {cityFavorites.map((favoriteOffer, offerIndex) => <PlaceCard key={`${cityName}-${offerIndex}`} isFavoriteLayout={true} place={favoriteOffer} onFavoriteClick={onFavoriteClick}/>)}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              </div>
            </main>

          ) : (
            <main className="page__main page__main--favorites page__main--favorites-empty">
              <div className="page__favorites-container container">
                <section className="favorites favorites--empty">
                  <h1 className="visually-hidden">Favorites (empty)</h1>
                  <div className="favorites__status-wrapper">
                    <b className="favorites__status">Nothing yet saved.</b>
                    <p className="favorites__status-description">Save properties to narrow down search or plan yor future
                      trips.</p>
                  </div>
                </section>
              </div>
            </main>
          )

        }
        <footer className="footer container">
          <Link to={`/`} className="footer__logo-link">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
          </Link>
        </footer>
      </React.Fragment>
    );
  }
}

Favorites.propTypes = {
  onRequestFavorites: PropTypes.func,
  onFavoriteClick: PropTypes.func,
  cities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    location: PropTypes.shape({
      longitude: PropTypes.number,
      latitude: PropTypes.number,
      zoom: PropTypes.number
    })
  })),
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
  }))
};
