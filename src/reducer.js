import {offers} from "./mocks/offers";
import {getOffersByCityId} from "./utils";

const initialState = {
  cityId: offers[0].location.city,
  offers: getOffersByCityId(offers, offers[0].location.city),
  offerId: offers[0].id
};

export const Action = {
  CHANGE_CITY: `change_city`,
  REQUEST_OFFERS: `request_offers`,
  CHANGE_OFFER: `change_offer`,
};

export const ActionCreator = {
  [Action.CHANGE_CITY]: (cityId) => ({
    type: Action.CHANGE_CITY,
    payload: cityId
  }),

  [Action.REQUEST_OFFERS]: (cityId) => ({
    type: Action.REQUEST_OFFERS,
    payload: getOffersByCityId(offers, cityId)
  }),

  [Action.CHANGE_OFFER]: (offerId) => ({
    type: Action.CHANGE_OFFER,
    payload: offerId
  }),
};

const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const offers = response.data;
        dispatch(ActionCreator[Action.REQUEST_OFFERS]())
      })
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.CHANGE_CITY:
      return Object.assign({}, state, {
        cityId: action.payload
      });
    case Action.REQUEST_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload
      });
    case Action.CHANGE_OFFER:
      return Object.assign({}, state, {
        offerId: action.payload
      });
  }
  return state;
};
