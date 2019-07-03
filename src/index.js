import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import {createStore, applyMiddleware} from "redux";
import {compose} from "recompose";
import {Operation as DataOperation} from "./reducer/data/data";
import {Operation as UserOperation} from "./reducer/user/user";
import {ActionCreator as SiteActionCreator, Action as SiteAction} from "./reducer/site/site";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {configureAPI, attachInterceptors} from "api";
import {Router} from "react-router-dom";
import history from "./history";
import {getSortOptionsFromUrl} from "./utils";
import reducer from "./reducer/index";

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

  store.dispatch(UserOperation.getLogin())
    .then(() => attachInterceptors(api))
    .then(() => store.dispatch(DataOperation.loadOffers()))
    .then((firstCityId) => store.dispatch(SiteActionCreator[SiteAction.CHANGE_CITY](firstCityId)))
    .then(() => store.dispatch(DataOperation.sortOffers(getSortOptionsFromUrl(window.location))));

  ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>, document.getElementById(`root`)
  );
};

init();
