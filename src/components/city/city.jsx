import React from "react";
import PropTypes from "prop-types";

class City extends React.PureComponent {
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
      id,
      onActivateCity
    } = this.props;
    event.preventDefault();
    onActivateCity(id);
  }
}

City.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onActivateCity: PropTypes.func.isRequired
};

export default City;
