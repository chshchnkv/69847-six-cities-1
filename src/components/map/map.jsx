import React from "react";
import PropTypes from "prop-types";
import * as leaflet from "leaflet";

class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();

    this._icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

  }

  componentDidMount() {
    const {
      id,
      city,
      zoom,
      pins = []
    } = this.props;

    const {
      longitude,
      latitude
    } = city;

    this._map = leaflet.map(id, {
      center: [longitude, latitude],
      zoom,
      zoomControl: false,
      marker: true
    });

    this._map.setView([longitude, latitude], zoom);
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);

    pins.forEach((pin) => {
      const offerCords = [pin.longitude, pin.latitude];
      leaflet
        .marker(offerCords, {icon: this._icon})
        .addTo(this._map);
    });
  }

  componentWillUnmount() {
    this._map = null;
  }

  render() {
    const {id} = this.props;
    return <div id={id} style={{display: `flex`, width: 100 + `%`, height: 100 + `%`}}/>;
  }
}

Map.defaultProps = {
  id: `map`
};

Map.propTypes = {
  id: PropTypes.string,
  city: PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number
  }).isRequired,
  zoom: PropTypes.number.isRequired,
  pins: PropTypes.arrayOf(PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number,
  }))
};

export default Map;
