import React from "react";
import PropTypes from "prop-types";
import City from "../city/city";


class CityList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      cities,
      activeCity,
      onChangeCity,
    } = this.props;

    return (
      <ul className="locations__list tabs__list">
        {cities.map((city, i) => (
          <li className="locations__item" key={`city-${i}`}>
            <City title={city.title} isActive={activeCity === city.title} onActivateCity={onChangeCity} longitude={city.longitude} latitude={city.latitude}/>
          </li>
        ))}
      </ul>
    );
  }
}

CityList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    longitude: PropTypes.number,
    latitude: PropTypes.number
  })).isRequired,
  activeCity: PropTypes.string.isRequired,
  onChangeCity: PropTypes.func.isRequired
};

export default CityList;
