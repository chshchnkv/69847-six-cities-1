import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app";
import {offers} from "../../mocks/offers";
import {Cities} from "../../mocks/cities";
import {getOffersByCityId} from "../../utils";
import history from "../../history";
import {Router} from "react-router-dom";

const mockCity = 1;

it(`App renders correctly`, () => {
  const onChangeCity = jest.fn();
  const onSelectOffer = jest.fn();

  const tree = renderer
    .create(
        <Router history={history}>
          <App offers={offers} cities={Cities} currentCityId={mockCity} currentCityOffers={getOffersByCityId(offers, mockCity)} onChangeCity={onChangeCity} onSelectOffer={onSelectOffer}/>
        </Router>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
