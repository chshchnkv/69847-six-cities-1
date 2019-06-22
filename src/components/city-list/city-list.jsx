import React from "react";
import PropTypes from "prop-types";
import City from "../city/city";


const CityList = (props) => {
  const {
    cities,
    activeItem,
    onChangeCity,
  } = props;

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city, i) => (
        <li className="locations__item" key={`city-${i}`}>
          <City id={city.id} title={city.name} isActive={activeItem === city.id} onActivateCity={onChangeCity} longitude={city.location.longitude} latitude={city.location.latitude}/>
        </li>
      ))}
    </ul>
  );
};

CityList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    location: PropTypes.shape({
      longitude: PropTypes.number,
      latitude: PropTypes.number,
      zoom: PropTypes.number
    })
  })).isRequired,
  activeItem: PropTypes.number.isRequired,
  onChangeCity: PropTypes.func.isRequired
};

export default CityList;
