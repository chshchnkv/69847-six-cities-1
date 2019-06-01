import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app";
import {offers} from "../../mocks/offers";
import {getOffersByCityId} from "../../utils";

const mockCity = 1;

it(`App renders correctly`, () => {
  const onChangeCity = jest.fn();
  const onSelectOffer = jest.fn();

  const tree = renderer
    .create(<App offers={offers} currentCityId={mockCity} currentCityOffers={getOffersByCityId(offers, mockCity)} onChangeCity={onChangeCity} onSelectOffer={onSelectOffer}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
