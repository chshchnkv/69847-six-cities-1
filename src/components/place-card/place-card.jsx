import React from "react";
import PropTypes from "prop-types";
import {AccommodationType, PeriodType} from "../../data";
import {ratingToPercent} from "../../utils";

class PlaceCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this._handleCardTitleClick = this._handleCardTitleClick.bind(this);
    this._handleCardImageClick = this._handleCardImageClick.bind(this);
  }

  render() {
    const {
      place,
    } = this.props;

    const {
      id = 0,
      is_premium: isPremium = false,
      title = ``,
      preview_image: src = ``,
      rating = 0,
      price,
      type = ``,
    } = place;

    return (
      <article className="cities__place-card place-card">
        {isPremium
          ? <div className="place-card__mark"><span>Premium</span></div>
          : null}

        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#" onClick={this._handleCardImageClick}>
            <img className="place-card__image" src={src} width="260" height="200" alt="Place image"/>
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;{PeriodType.NIGHT}</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"/>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: ratingToPercent(rating) + `%`}}/>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href={`/offer/${id}`} onClick={this._handleCardTitleClick}>{title}</a>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }

  _handleCardTitleClick(event) {
    const {
      place,
      onTitleClick
    } = this.props;

    const {
      id
    } = place;

    event.preventDefault();
    onTitleClick(id);
  }

  _handleCardImageClick(event) {
    const {
      place,
      onImageClick
    } = this.props;

    const {
      id
    } = place;

    event.preventDefault();
    onImageClick(id);
  }
}

PlaceCard.propTypes = {
  place: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    src: PropTypes.string,
    rating: PropTypes.number,
    price: PropTypes.number,
    isPremium: PropTypes.bool,
    type: PropTypes.oneOf([...Object.values(AccommodationType)]).isRequired,
  }).isRequired,
  onTitleClick: PropTypes.func,
  onImageClick: PropTypes.func,
};

export default PlaceCard;
