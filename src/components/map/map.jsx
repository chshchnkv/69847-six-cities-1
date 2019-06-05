import React from "react";
import PropTypes from "prop-types";
import * as leaflet from "leaflet";

class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this._icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    this._pinLayers = [];
  }

  componentDidMount() {
    const {
      id,
      activePin,
    } = this.props;

    const {
      zoom,
      longitude,
      latitude
    } = this._getMapCenter();

    if (longitude && latitude) {
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

      this._createPins();

      if (activePin < 0) {
        this._panZoom();
      }
    }
  }

  componentDidUpdate() {
    const {activePin} = this.props;

    const {
      zoom,
      longitude,
      latitude
    } = this._getMapCenter();

    this._map.setView([longitude, latitude], zoom);

    this._clearPins();
    this._createPins();

    if (activePin < 0) {
      this._panZoom();
    }
  }

  componentWillUnmount() {
    this._map = null;
  }

  render() {
    const {id} = this.props;
    return <div id={id} style={{display: `flex`, width: 100 + `%`, height: 100 + `%`}}/>;
  }

  _getMapCenter() {
    const {
      location,
      activePin = -1,
      pins,
    } = this.props;
    return activePin >= 0 ? pins[activePin] : location;
  }

  _clearPins() {
    this._pinLayers.forEach((pinLayer) => {
      this._map.removeLayer(pinLayer);
    });
  }

  _createPins() {
    const {pins} = this.props;
    this._pinLayers = pins.map((pin) => {
      const offerCords = [pin.longitude, pin.latitude];
      return leaflet
        .marker(offerCords, {icon: this._icon})
        .addTo(this._map);
    });
  }

  _panZoom() {
    const latLngs = this._pinLayers.map((pinLayer) => pinLayer.getLatLng());
    const bounds = leaflet.latLngBounds(latLngs);
    this._map.fitBounds(bounds);
  }
}

Map.defaultProps = {
  id: `map`
};

Map.propTypes = {
  id: PropTypes.string,
  location: PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    zoom: PropTypes.number,
  }),
  pins: PropTypes.arrayOf(PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number,
  })),
  activePin: PropTypes.number
};

export default Map;
