import history from "../../history";

const initialState = {
  loggedIn: false,
  user: {},
};


export const Action = {
  CHANGE_USER: `change_user`,
  SET_LOGGED_IN: `set_logged_in`,
};

export const ActionCreator = {
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
};

export const Operation = {
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
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.SET_LOGGED_IN:
      return Object.assign({}, state, {
        loggedIn: action.payload
      });
    case Action.CHANGE_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
  }
  return state;
};
