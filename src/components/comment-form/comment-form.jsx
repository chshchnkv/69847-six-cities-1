import React from "react";
import PropTypes from "prop-types";

const ratingValues = {
  5: `perfect`,
  4: `good`,
  3: `not bad`,
  2: `badly`,
  1: `terribly`,
};

class CommentForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
      comment: ``
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleRatingChange = this._handleRatingChange.bind(this);
    this._handleCommentChange = this._handleCommentChange.bind(this);
  }


  render() {
    const {
      rating = 0,
      comment = ``
    } = this.state;

    return (
      <form className="reviews__form form" action="#" method="post" onSubmit={this._handleSubmit}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {Object.keys(ratingValues).map((id) => {
            return (
              <React.Fragment key={`star-${id}`}>
                <input className="form__rating-input visually-hidden" name="rating" value={id} id={`${id}-stars`} type="radio" onChange={this._handleRatingChange} checked={rating === parseInt(id, 10) ? `checked` : ``}/>
                <label htmlFor={`${id}-stars`} className="reviews__rating-label form__rating-label" title={ratingValues[id]}>
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"/>
                  </svg>
                </label>
              </React.Fragment>
            );
          })}
        </div>
        <textarea value={comment} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={this._handleCommentChange}/>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and
            describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={rating <= 0 || comment === `` ? `disabled` : ``}>Submit</button>
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

    const {
      rating,
      comment
    } = this.state;

    onPostComment(propertyId, rating, comment);
  }

  _handleRatingChange(event) {
    this.setState({rating: parseInt(event.target.value, 10)});
  }

  _handleCommentChange(event) {
    this.setState({comment: event.target.value});
  }
}

CommentForm.propTypes = {
  propertyId: PropTypes.number,
  onPostComment: PropTypes.func.isRequired
};

export default CommentForm;
