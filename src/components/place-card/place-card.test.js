import React from "react";
import renderer from "react-test-renderer";
import {AccommodationType} from "../../data";
import PlaceCard from "./place-card";

const mock = {
  id: 1,
  title: `Beautiful & luxurious apartment at great location`,
  src: `img/apartment-01.jpg`,
  isPremium: false,
  price: 120,
  type: AccommodationType.APARTMENT,
  rating: 3.2,
};

it(`Place card renders correctly`, () => {
  const tree = renderer.create(<PlaceCard place={mock}/>);
  expect(tree).toMatchSnapshot();
});
