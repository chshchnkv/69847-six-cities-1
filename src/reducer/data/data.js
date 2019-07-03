import {getCityInfoByName, getNewId, getOfferIndexById, sortOffers} from "../../utils";
import {SortField, SortOrder} from "../../data";

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
  cities: [],
  offers: [],
  favorites: [],
  reviews: [],
  sortOptions: {
    field: SortField.ID,
    order: SortOrder.ASC
  },
};

export const Action = {
  SET_CITIES: `load_cities`,
  SET_OFFERS: `set_offers`,
  SET_FAVORITES: `set_favorites`,
  SET_REVIEWS: `load_reviews`,
  SORT_OPTIONS: `sort`,
};

export const ActionCreator = {
  [Action.SET_OFFERS]: (offers) => ({
    type: Action.SET_OFFERS,
    payload: offers
  }),

  [Action.SET_CITIES]: (cities) => ({
    type: Action.SET_CITIES,
    payload: cities
  }),

  [Action.SET_REVIEWS]: (reviews) => ({
    type: Action.SET_REVIEWS,
    payload: reviews
  }),

  [Action.SET_FAVORITES]: (favorites) => ({
    type: Action.SET_FAVORITES,
    payload: favorites
  }),

  [Action.SORT_OPTIONS]: (sortOptions) => ({
    type: Action.SORT_OPTIONS,
    payload: sortOptions
  }),

  [Action.SET_COMMENT_SENDING]: (isSendingComment) => ({
    type: Action.SET_COMMENT_SENDING,
    payload: isSendingComment
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

        dispatch(ActionCreator[Action.SET_CITIES](cities));
        dispatch(ActionCreator[Action.SET_OFFERS](offers));

        return cities.length > 0 ? cities[0].id : -1;
      });
  },

  loadComments: (propertyId) => (dispatch, _getState, api) => {
    return api.get(`/comments/${propertyId}`)
      .then((response) => {
        dispatch(ActionCreator[Action.SET_REVIEWS](response.data));
      });
  },

  loadFavorites: () => (dispatch, _getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const {data: {cities}} = _getState();
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


  postComment: (propertyId, rating, comment) => (dispatch, _getState, api) => {
    dispatch(ActionCreator[Action.SET_COMMENT_SENDING](true));
    return api.post(`/comments/${propertyId}`, {
      rating,
      comment
    }).then((response) => {
      dispatch(ActionCreator[Action.SET_REVIEWS](response.data));
      dispatch(ActionCreator[Action.SET_COMMENT_SENDING](false));
    }).catch(() => {
      dispatch(ActionCreator[Action.SET_COMMENT_SENDING](false));
      alert(`Something went wrong :(`);
    });
  },

  sortOffers: (sortOptions) => (dispatch, _getState) => {
    const {data: {offers}} = _getState();
    dispatch(ActionCreator[Action.SORT_OPTIONS](sortOptions));
    dispatch(ActionCreator[Action.SET_OFFERS](sortOffers(offers, sortOptions)));
  },

  postFavorite: (propertyId, isFavorite) => (dispatch, _getState, api) => {
    return api.post(`/favorite/${propertyId}/${isFavorite ? 1 : 0}`)
      .then((response) => {
        const {data: newPropertyData = null} = response || {};
        if (newPropertyData) {
          const {
            data: {
              offers = [],
              cities
            }
          } = _getState();
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
    case Action.SET_CITIES:
      return Object.assign({}, state, {
        cities: action.payload
      });
    case Action.SET_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload
      });
    case Action.SET_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload
      });
    case Action.SORT_OPTIONS:
      return Object.assign({}, state, {
        sort: action.payload
      });
    case Action.SET_FAVORITES:
      return Object.assign({}, state, {
        favorites: action.payload
      });
    case Action.SET_COMMENT_SENDING:
      return Object.assign({}, state, {
        isSendingComment: action.payload
      });
  }
  return state;
};
