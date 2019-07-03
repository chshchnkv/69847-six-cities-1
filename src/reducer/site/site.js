const initialState = {
  cityId: -1,
  offerId: -1,
  isSendingComment: false
};

export const Action = {
  CHANGE_CITY: `change_city`,
  CHANGE_OFFER: `change_offer`,
  CHANGE_USER: `change_user`,
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
  }
  return state;
};
