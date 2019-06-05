import {getNewId} from "./utils";

const initialState = {
  cityId: -1,
  offerId: -1,
  cities: [],
  offers: [],
};

export const Action = {
  CHANGE_CITY: `change_city`,
  CHANGE_OFFER: `change_offer`,
  LOAD_OFFERS: `load_offers`,
  LOAD_CITIES: `load_cities`,
};

export const ActionCreator = {
  [Action.CHANGE_CITY]: (cityId) => ({
    type: Action.CHANGE_CITY,
    payload: cityId
  }),

  [Action.CHANGE_OFFER]: (offerId) => ({
    type: Action.CHANGE_OFFER,
    payload: offerId
  }),

  [Action.LOAD_OFFERS]: (offers) => ({
    type: Action.LOAD_OFFERS,
    payload: offers
  }),

  [Action.LOAD_CITIES]: (cities) => ({
    type: Action.LOAD_CITIES,
    payload: cities
  }),
};

export const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const citiesMap = new Map();
        const offers = [];
        const serverOffers = response.data;
        for (let serverOffer of serverOffers) {
          const {
            city,
            ...offer
          } = serverOffer;

          const {
            location,
            ...offerWithNoLocation
          } = offer;

          const {name: cityName} = city;

          let cityId;
          if (citiesMap.has(cityName)) {
            cityId = citiesMap.get(cityName).id;
          } else {
            cityId = getNewId();
            citiesMap.set(cityName, {...city, ...{id: cityId}});
          }

          offers.push({
            ...offerWithNoLocation,
            ...{city: cityId},
            ...{location: {
              longitude: location.latitude,
              latitude: location.longitude,
              }
            }
          });
        }

        const cities = [...citiesMap.values()];

        if (cities.length > 0) {
          dispatch(ActionCreator[Action.CHANGE_CITY](cities[0].id));
        }
        dispatch(ActionCreator[Action.LOAD_CITIES](cities));
        dispatch(ActionCreator[Action.LOAD_OFFERS](offers));
      })
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.CHANGE_CITY:
      return Object.assign({}, state, {
        cityId: action.payload
      });
    case Action.CHANGE_OFFER:
      return Object.assign({}, state, {
        offerId: action.payload
      });
    case Action.LOAD_CITIES:
      return Object.assign({}, state, {
        cities: action.payload
      });
    case Action.LOAD_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload
      });
  }
  return state;
};
