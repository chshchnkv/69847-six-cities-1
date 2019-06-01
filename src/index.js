import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import {offers} from "./mocks/offers";
import {createStore} from "redux";
import {reducer} from "./reducer";
import {Provider} from "react-redux";

/* eslint-disable no-underscore-dangle */
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

const init = (offersList) => {
  ReactDOM.render(
      <Provider store={store}>
        <App offers={offersList}/>
      </Provider>, document.getElementById(`root`)
  );
};

init(offers);
