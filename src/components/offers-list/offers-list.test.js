import React from "react";
import renderer from "react-test-renderer";
import {AccommodationType} from "../../data";
import OffersList from "./offers-list";

const mock = [
  {
    id: 1,
    title: `Beautiful & luxurious apartment at great location`,
    src: `img/apartment-01.jpg`,
    isPremium: false,
    price: 120,
    type: AccommodationType.APARTMENT,
    rating: 3.2,
  }, {
    id: 2,
    title: `Wood and stone place`,
    src: `img/apartment-02.jpg`,
    isPremium: false,
    price: 60,
    type: AccommodationType.HOUSE,
    rating: 2.8,
  }, {
    id: 3,
    title: `Canal View Prinsengracht`,
    src: `img/apartment-03.jpg`,
    isPremium: false,
    price: 30,
    type: AccommodationType.HOTEL,
    rating: 4.2,
  }, {
    id: 4,
    title: `Nice, cozy, warm big bed apartment`,
    src: `img/apartment-01.jpg`,
    isPremium: true,
    price: 300,
    type: AccommodationType.APARTMENT,
    rating: 5,
  }, {
    id: 5,
    title: `ibis Styles`,
    src: `img/studio-01.jpg`,
    isPremium: false,
    price: 110,
    type: AccommodationType.HOTEL,
    rating: 1,
  }
];

it(`Offers list renders correctly`, () => {
  const tree = renderer.create(<OffersList offers={mock}/>);
  expect(tree).toMatchSnapshot();
});
