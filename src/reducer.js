import {offers} from "./mocks/offers";
import {getOffersByCity} from "./utils";

const initialState = {
  city: offers[0].location.city,
  offers: getOffersByCity(offers, offers[0].location.city)
};

export const Action = {
  CHANGE_CITY: `change_city`,
  REQUEST_OFFERS: `request_offers`
};

export const ActionCreator = {
  [Action.CHANGE_CITY]: (city) => ({
    type: Action.CHANGE_CITY,
    payload: city
  }),

  [Action.REQUEST_OFFERS]: (city) => ({
    type: Action.REQUEST_OFFERS,
    payload: getOffersByCity(offers, city)
  })
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.CHANGE_CITY:
      return Object.assign({}, state, {
        city: action.payload
      });
    case Action.REQUEST_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload.slice(0)
      });
  }
  return state;
};
