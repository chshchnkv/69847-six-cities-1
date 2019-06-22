import {getNewId, sortOffers} from "./utils";
import history from "./history";

const initialState = {
  cityId: -1,
  offerId: -1,
  cities: [],
  offers: [],
  isAuthorizationRequired: false,
  user: {}
};

export const Action = {
  CHANGE_CITY: `change_city`,
  CHANGE_OFFER: `change_offer`,
  SET_OFFERS: `set_offers`,
  LOAD_CITIES: `load_cities`,
  AUTHORIZATION_REQUIRED: `login`,
  CHANGE_USER: `change_user`,
  LOAD_REVIEWS: `load_reviews`,
  SORT_OPTIONS: `sort`,
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

  [Action.SET_OFFERS]: (offers) => ({
    type: Action.SET_OFFERS,
    payload: offers
  }),

  [Action.LOAD_CITIES]: (cities) => ({
    type: Action.LOAD_CITIES,
    payload: cities
  }),

  [Action.AUTHORIZATION_REQUIRED]: (authorizationRequired) => ({
    type: Action.AUTHORIZATION_REQUIRED,
    payload: authorizationRequired
  }),

  [Action.CHANGE_USER]: (userInfo) => ({
    type: Action.CHANGE_USER,
    payload: {
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      avatarUrl: userInfo.avatar_url,
      isPro: userInfo.is_pro
    }
  }),

  [Action.LOAD_REVIEWS]: (reviews) => ({
    type: Action.LOAD_REVIEWS,
    payload: reviews
  }),

  [Action.SORT_OPTIONS]: (sortOptions) => ({
    type: Action.SORT_OPTIONS,
    payload: sortOptions
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
        dispatch(ActionCreator[Action.SET_OFFERS](offers));
      });
  },

  loadComments: (propertyId) => (dispatch, _getState, api) => {
    return api.get(`/comments/${propertyId}`)
      .then((response) => {
        dispatch(ActionCreator[Action.LOAD_REVIEWS](response.data));
      });
  },

  login: (email, password) => (dispatch, _getState, api) => {
    return api.post(`/login`, {
      email,
      password
    })
      .then((response) => {
        dispatch(ActionCreator[Action.CHANGE_USER](response.data));
        history.push(`/`);
      })
      .catch(() => alert(`Something went wrong :(`));
  },

  postComment: (propertyId, rating, comment) => (dispatch, _getState, api) => {
    return api.post(`/comment/${propertyId}`, {
      rating,
      comment
    }).then((response) => {
      dispatch(ActionCreator[Action.LOAD_REVIEWS](response.data));
    }).catch(() => alert(`Something went wrong :(`));
  },

  sortOffers: (sortOptions) => (dispatch, _getState, api) => {
    const {offers} = _getState();
    dispatch(ActionCreator[Action.SORT_OPTIONS](sortOptions));
    dispatch(ActionCreator[Action.SET_OFFERS](sortOffers(offers, sortOptions)));
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
    case Action.SET_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload
      });
    case Action.AUTHORIZATION_REQUIRED:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload
      });
    case Action.CHANGE_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
    case Action.LOAD_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload
      });
    case Action.SORT_OPTIONS:
      return Object.assign({}, state, {
        sort: action.payload
      });
  }
  return state;
};
