import React from "react";

const withValidation = (Component) => {
  class WithValidation extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        comment: ``,
      };

      this._handleCommentChange = this._handleCommentChange.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
    }

    render() {
      const {
        rating,
        comment,
      } = this.state;

      return (<Component
        {...this.props}
        onCommentChange = {this._handleCommentChange}
        onRatingChange = {this._handleRatingChange}
        isSubmitEnabled = {rating > 0 && comment.length >= 50 && comment.length <= 300}
      />);
    }

    _handleRatingChange(event) {
      this.setState({
        rating: parseInt(event.target.value, 10)
      });
    }

    _handleCommentChange(event) {
      this.setState({
        comment: event.target.value
      });
    }
  }

  return WithValidation;
};

export default withValidation;
