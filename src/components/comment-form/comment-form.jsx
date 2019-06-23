import React from "react";
import PropTypes from "prop-types";

class CommentForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);

    this._formRatingName = `rating`;
    this._formCommentName = `review`;

    this.form = React.createRef();
  }

  render() {
    const {
      ratings,
      isSubmitEnabled = true,
      isFormEnabled = true,
      onCommentChange = null,
      onRatingChange = null,
    } = this.props;

    const reversedRatings = ratings.slice().reverse(); /* нужно реверснуть потому что в стилях зачем-то стоит флекс с reversed */

    return (
      <form className="reviews__form form" action="#" method="post" onSubmit={this._handleSubmit} disabled={!isFormEnabled} ref={this.form}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {reversedRatings.map((ratingsItem) => {
            const {
              value,
              title
            } = ratingsItem;

            return (
              <React.Fragment key={`star-${value}`}>
                <input className="form__rating-input visually-hidden" name={this._formRatingName} value={value} id={`${value}-stars`} type="radio" onChange={onRatingChange}/>
                <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"/>
                  </svg>
                </label>
              </React.Fragment>
            );
          })}
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name={this._formCommentName} placeholder="Tell how was your stay, what you like and what can be improved" onChange={onCommentChange}/>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and
            describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={!isSubmitEnabled}>Submit</button>
        </div>
      </form>
    );
  }


  _handleSubmit(event) {
    event.preventDefault();

    const {
      propertyId,
      onPostComment,
    } = this.props;

    const rating = this.form.current[this._formRatingName];
    const comment = this.form.current[this._formCommentName];

    onPostComment(propertyId, rating.value, comment.value)
      .then(() => {
        rating.value = 0;
        comment.value = ``;
        this.form.current.reset();
      });
  }
}

CommentForm.propTypes = {
  ratings: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
    title: PropTypes.string
  })).isRequired,
  isSubmitEnabled: PropTypes.bool,
  isFormEnabled: PropTypes.bool,
  propertyId: PropTypes.number,
  onRatingChange: PropTypes.func,
  onCommentChange: PropTypes.func,
  onPostComment: PropTypes.func.isRequired
};

export default CommentForm;
