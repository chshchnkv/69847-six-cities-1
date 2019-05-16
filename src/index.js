import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import {offers} from "./mocks/offers";

const init = (offersList) => {
  ReactDOM.render(<App offers={offersList}/>, document.getElementById(`root`));
};

init(offers);
