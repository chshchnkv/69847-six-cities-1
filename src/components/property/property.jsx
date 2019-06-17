import React from "react";
import PropTypes from "prop-types";
import {getCityInfoById, ratingToPercent} from "../../utils";
import {AccommodationType} from "../../data";
import OffersList from "../offers-list/offers-list";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withTransformProps from "../../hocs/with-transform-props/with-transform-props";
import PropertyReviewsList from "../property-reviews-list/property-reviews-list";
import Map from "../map/map";

const OffersListWithActiveItemWrapped = withActiveItem(withTransformProps((props) => (
  Object.assign({}, props, {
    onImageClick: props.onChangeActiveItem
  })
))(OffersList));

class Property extends React.Component {
  constructor(props) {
    super(props);

    this._handleSelectOffer = this._handleSelectOffer.bind(this);
  }

  componentDidMount() {
    const {
      onRequestComments,
      place = {}
    } = this.props;

    const {id} = place;

    onRequestComments(id);
  }

  render() {
    const {
      place = {},
      reviews = [],
      nearPlaces = [],
      user = {},
      cities = []
    } = this.props;

    const {
      isPremium = false,
      city = -1,
      title = ``,
      description = ``,
      images = [],
      rating = 0,
      price = 0,
      bedrooms = 0,
      max_adults: maxAdults = 0,
      goods = [],
      host = {},
      location,
    } = place;

    const mapLocation = getCityInfoById(cities, city).location;

    const mapPins = nearPlaces.map((offer) => offer.location);
    mapPins.unshift(location);

    const {
      name: hostName = ``,
      is_pro: isHostPro = false,
      avatar_url: hostAvatar = ``
    } = host;

    const {
      id: userId = -1,
    } = user;

    return (
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image, index) => (
                <div className="property__image-wrapper" key={`image-${index}`}>
                  <img className="property__image" src={image} alt={name}/>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ? (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              ) : null}
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${ratingToPercent(rating)}%`}}/>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">Entire place</li>
                <li className="property__feature property__feature--bedrooms">{bedrooms} Bedroom{bedrooms > 1 ? `s` : ``}</li>
                <li className="property__feature property__feature--adults">Max {maxAdults} adult{maxAdults > 1 ? `s` : ``}</li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((goodsItem, index) => (<li className="property__inside-item" key={`goods-${index}`}>{goodsItem}</li>))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper${isHostPro ? ` property__avatar-wrapper--pro ` : ``}`}>
                    <img className="property__avatar user__avatar" src={`/${hostAvatar}`} width="74" height="74" alt={hostName}/>
                  </div>
                  <span className="property__user-name">{hostName}</span>
                  {isHostPro ? (<span className="property__user-status">Pro</span>) : null }
                </div>
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>

              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <PropertyReviewsList reviews={reviews}/>

                {userId < 0 ? null : (
                  <form className="reviews__form form" action="#" method="post">
                    <label className="reviews__label form__label" htmlFor="review">Your review</label>
                    <div className="reviews__rating-form form__rating">
                      <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"/>
                      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"/>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"/>
                      <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"/>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"/>
                      <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"/>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"/>
                      <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"/>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"/>
                      <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"/>
                        </svg>
                      </label>
                    </div>
                    <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"/>
                    <div className="reviews__button-wrapper">
                      <p className="reviews__help">
                        To submit review please make sure to set <span className="reviews__star">rating</span> and
                        describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                      </p>
                      <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
                    </div>
                  </form>
                )}

              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map location={mapLocation} pins={mapPins} activePin={0}/>
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list"><OffersListWithActiveItemWrapped offers={nearPlaces} onChangeActiveItem={this._handleSelectOffer}/></div>
          </section>
        </div>
      </main>);
  }

  _handleSelectOffer() {

  }
}

Property.propTypes = {
  place: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.number,
    price: PropTypes.number,
    type: PropTypes.string,
    isPremium: PropTypes.bool,
    images: PropTypes.arrayOf(PropTypes.string),
    bedrooms: PropTypes.number,
    maxAdults: PropTypes.number,
    goods: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.shape({
      city: PropTypes.number,
      longitude: PropTypes.number,
      latitude: PropTypes.number
    }),
    host: PropTypes.shape({
      id: PropTypes.number,
      isPro: PropTypes.bool,
      name: PropTypes.string,
      avatarUrl: PropTypes.string
    }),
  }),
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
  nearPlaces: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
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
  })),
  user: PropTypes.shape({
    id: PropTypes.number,
    isPro: PropTypes.bool,
    name: PropTypes.string,
    avatarUrl: PropTypes.string
  }),
  cities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    location: PropTypes.shape({
      longitude: PropTypes.number,
      latitude: PropTypes.number,
      zoom: PropTypes.number
    })
  })),
  onRequestComments: PropTypes.func
};

export default Property;
