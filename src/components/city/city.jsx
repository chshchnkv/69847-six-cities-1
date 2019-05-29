import React from "react";
import PropTypes from "prop-types";

class City extends React.Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  render() {
    const {
      title,
      isActive,
    } = this.props;
    return (
      <a className={`locations__item-link tabs__item${isActive ? ` tabs__item--active` : ``}`} href="#" onClick={this._handleClick}>
        <span>{title}</span>
      </a>
    );
  }

  _handleClick(event) {
    const {
      title,
      onActivateCity
    } = this.props;
    event.preventDefault();
    onActivateCity(title);
  }
}

City.propTypes = {
  title: PropTypes.string.isRequired,
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onActivateCity: PropTypes.func.isRequired
};

export default City;
