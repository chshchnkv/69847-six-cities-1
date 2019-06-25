import {getCityInfoByName, getNewId, getOfferIndexById, sortOffers} from "./utils";
import history from "./history";
import {SortField, SortOrder} from "./data";

const serverOfferToOffer = (serverOffer, cities) => {
  const {
    city,
    ...offer
  } = serverOffer;

  const {
    location,
    ...offerWithNoLocation
  } = offer;

  const {name: cityName} = city;

  const cityInfo = getCityInfoByName(cities, cityName);
  const {id: cityId} = cityInfo;

  return {
    ...offerWithNoLocation,
    ...{city: cityId},
    ...{location: {
      longitude: location.latitude,
      latitude: location.longitude,
    }}
  };
};

const initialState = {
  cityId: -1,
  offerId: -1,
  cities: [],
  offers: [],
  favorites: [],
  loggedIn: false,
  user: {},
  sortOptions: {
    field: SortField.ID,
    order: SortOrder.ASC
  },
  isSendingComment: false
};

export const Action = {
  CHANGE_CITY: `change_city`,
  CHANGE_OFFER: `change_offer`,
  CHANGE_USER: `change_user`,
  LOAD_CITIES: `load_cities`,
  LOAD_REVIEWS: `load_reviews`,
  SORT_OPTIONS: `sort`,
  SET_LOGGED_IN: `set_logged_in`,
  SET_OFFERS: `set_offers`,
  SET_FAVORITES: `set_favorites`,
  SET_COMMENT_SENDING: `set_comment_sending`,
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

  [Action.SET_LOGGED_IN]: (loggedIn) => ({
    type: Action.SET_LOGGED_IN,
    payload: loggedIn
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

  [Action.SET_COMMENT_SENDING]: (isSendingComment) => ({
    type: Action.SET_COMMENT_SENDING,
    payload: isSendingComment
  }),

  [Action.SET_FAVORITES]: (favorites) => ({
    type: Action.SET_FAVORITES,
    payload: favorites
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

  getLogin: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator[Action.SET_LOGGED_IN](true));
        dispatch(ActionCreator[Action.CHANGE_USER](response.data));
      })
      .catch(() => {
        dispatch(ActionCreator[Action.CHANGE_USER]({}));
      });
  },

  login: (email, password) => (dispatch, _getState, api) => {
    return api.post(`/login`, {
      email,
      password
    })
      .then((response) => {
        dispatch(ActionCreator[Action.SET_LOGGED_IN](true));
        dispatch(ActionCreator[Action.CHANGE_USER](response.data));
        history.push(`/`);
      })
      .catch(() => alert(`Something went wrong :(`));
  },

  logout: () => (dispatch) => {
    dispatch(ActionCreator[Action.SET_LOGGED_IN](false));
    dispatch(ActionCreator[Action.CHANGE_USER]({}));
  },

  postComment: (propertyId, rating, comment) => (dispatch, _getState, api) => {
    dispatch(ActionCreator[Action.SET_COMMENT_SENDING](true));
    return api.post(`/comments/${propertyId}`, {
      rating,
      comment
    }).then((response) => {
      dispatch(ActionCreator[Action.LOAD_REVIEWS](response.data));
      dispatch(ActionCreator[Action.SET_COMMENT_SENDING](false));
    }).catch(() => {
      dispatch(ActionCreator[Action.SET_COMMENT_SENDING](false));
      alert(`Something went wrong :(`);
    });
  },

  sortOffers: (sortOptions) => (dispatch, _getState) => {
    const {offers} = _getState();
    dispatch(ActionCreator[Action.SORT_OPTIONS](sortOptions));
    dispatch(ActionCreator[Action.SET_OFFERS](sortOffers(offers, sortOptions)));
  },

  loadFavorites: () => (dispatch, _getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const {cities} = _getState();
        const sortedCities = cities.slice(0).sort((a, b) => {
          const {name: nameA} = a;
          const {name: nameB} = b;
          const cityNameA = nameA.toLowerCase().trim();
          const cityNameB = nameB.toLowerCase().trim();
          if (cityNameA === cityNameB) {
            return 0;
          } else if (cityNameA > cityNameB) {
            return 1;
          } else {
            return -1;
          }
        });

        const favoriteOffers = response.data.map((offer) => serverOfferToOffer(offer, cities));

        const result = sortedCities
          .map((city) => ({
            cityId: city.id,
            offers: favoriteOffers.filter((offer) => offer.city === city.id)
          }))
          .filter((item) => item.offers.length > 0);

        dispatch(ActionCreator[Action.SET_FAVORITES](result));
      })
      .catch(() => alert(`Something went wrong :(`));
  },

  postFavorite: (propertyId, isFavorite) => (dispatch, _getState, api) => {
    return api.post(`/favorite/${propertyId}/${isFavorite ? 1 : 0}`)
      .then((response) => {
        const {data: newPropertyData = null} = response || {};
        if (newPropertyData) {
          const {offers = [], cities} = _getState();
          const index = getOfferIndexById(offers, propertyId);
          if (index >= 0) {
            const newProperty = serverOfferToOffer(newPropertyData, cities);
            offers.splice(index, 1, newProperty);
          }
          dispatch(ActionCreator[Action.SET_OFFERS](offers));
        }
      });
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
    case Action.SET_LOGGED_IN:
      return Object.assign({}, state, {
        loggedIn: action.payload
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
    case Action.SET_COMMENT_SENDING:
      return Object.assign({}, state, {
        isSendingComment: action.payload
      });
    case Action.SET_FAVORITES:
      return Object.assign({}, state, {
        favorites: action.payload
      });
  }
  return state;
};
