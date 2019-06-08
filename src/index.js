import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import {createStore, applyMiddleware} from "redux";
import {compose} from "recompose";
import {Operation, reducer} from "./reducer";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {configureAPI} from "api";
import {BrowserRouter} from "react-router-dom";

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

  store.dispatch(Operation.loadOffers());

  ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>, document.getElementById(`root`)
  );
};

init();
