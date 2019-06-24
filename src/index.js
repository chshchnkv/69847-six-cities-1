import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import {createStore, applyMiddleware} from "redux";
import {compose} from "recompose";
import {Operation, reducer} from "./reducer";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {configureAPI, attachInterceptors} from "api";
import {Router} from "react-router-dom";
import history from "./history";
import {getSortOptionsFromUrl} from "./utils";

const init = () => {
  const api = configureAPI();
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
  );
  /* eslint-enable */

  store.dispatch(Operation.getLogin())
    .then(() => attachInterceptors(api))
    .then(() => store.dispatch(Operation.loadOffers()))
    .then(() => store.dispatch(Operation.sortOffers(getSortOptionsFromUrl(window.location))));

  ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>, document.getElementById(`root`)
  );
};

init();
