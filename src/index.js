import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import {offers} from "./mocks/offers";
import {createStore} from "redux";
import {reducer} from "./reducer";
import {Provider} from "react-redux";

const store = createStore(reducer);

const init = (offersList) => {
  ReactDOM.render(
      <Provider store={store}>
        <App offers={offersList}/>
      </Provider>, document.getElementById(`root`)
  );
};

init(offers);
