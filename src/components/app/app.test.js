import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app";
import {offers} from "../../mocks/offers";
import {getOffersByCity} from "../../utils";

const mockCity = `Amsterdam`;

it(`App renders correctly`, () => {
  const onChangeCity = jest.fn();
  const tree = renderer
    .create(<App offers={offers} currentCity={mockCity} currentCityOffers={getOffersByCity(offers, mockCity)} onChangeCity={onChangeCity}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
