import {offers} from "./mocks/offers";
import {getOffersByCityId} from "./utils";

const initialState = {
  cityId: offers[0].location.city,
  offers: getOffersByCityId(offers, offers[0].location.city)
};

export const Action = {
  CHANGE_CITY: `change_city`,
  REQUEST_OFFERS: `request_offers`
};

export const ActionCreator = {
  [Action.CHANGE_CITY]: (cityId) => ({
    type: Action.CHANGE_CITY,
    payload: cityId
  }),

  [Action.REQUEST_OFFERS]: (cityId) => ({
    type: Action.REQUEST_OFFERS,
    payload: getOffersByCityId(offers, cityId)
  })
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.CHANGE_CITY:
      return Object.assign({}, state, {
        cityId: action.payload
      });
    case Action.REQUEST_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload.slice(0)
      });
  }
  return state;
};
