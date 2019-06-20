import React from "react";
import PropTypes from "prop-types";
import {getCityInfoById, ratingToPercent} from "../../utils";
import {AccommodationType} from "../../data";
import OffersList from "../offers-list/offers-list";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withTransformProps from "../../hocs/with-transform-props/with-transform-props";
import PropertyReviewsList from "../property-reviews-list/property-reviews-list";
import Map from "../map/map";
import CommentForm from "../app/comment-form/comment-form";

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
      cities = [],
      onPostComment
    } = this.props;

    const {
      id: propertyId,
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

                {userId < 0 ? null : (<CommentForm onPostComment={onPostComment} propertyId={propertyId}/>)}

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
  onRequestComments: PropTypes.func,
  onPostComment: PropTypes.func
};

export default Property;
