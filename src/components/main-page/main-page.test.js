import React from "react";
import renderer from "react-test-renderer";
import {AccommodationType} from "../../data";
import MainPage from "./main-page";
import {Cities} from "../../mocks/cities";

const mock = [
  {
    id: 1,
    title: `Beautiful & luxurious apartment at great location`,
    src: `img/apartment-01.jpg`,
    isPremium: false,
    price: 120,
    type: AccommodationType.APARTMENT,
    rating: 3.2,
    location: {
      city: 1,
      longitude: 52.3909553943508,
      latitude: 4.85309666406198
    },
  }, {
    id: 2,
    title: `Wood and stone place`,
    src: `img/apartment-02.jpg`,
    isPremium: false,
    price: 60,
    type: AccommodationType.HOUSE,
    rating: 2.8,
    location: {
      city: 1,
      longitude: 52.369553943508,
      latitude: 4.85309666406198
    },
  }, {
    id: 3,
    title: `Canal View Prinsengracht`,
    src: `img/apartment-03.jpg`,
    isPremium: false,
    price: 30,
    type: AccommodationType.HOTEL,
    rating: 4.2,
    location: {
      city: 1,
      longitude: 52.3909553943508,
      latitude: 4.929309666406198
    },
  }, {
    id: 4,
    title: `Nice, cozy, warm big bed apartment`,
    src: `img/apartment-01.jpg`,
    isPremium: true,
    price: 300,
    type: AccommodationType.APARTMENT,
    rating: 5,
    location: {
      city: 1,
      longitude: 52.3809553943508,
      latitude: 4.939309666406198
    },
  }, {
    id: 5,
    title: `ibis Styles`,
    src: `img/studio-01.jpg`,
    isPremium: false,
    price: 110,
    type: AccommodationType.HOTEL,
    rating: 1,
    location: {
      city: 1,
      longitude: 52.3809553943508,
      latitude: 4.929309666406198
    },
  },
];

const cityMock = {
  id: 1,
  title: `Amsterdam`,
  longitude: 52.38333,
  latitude: 4.9,
  zoom: 12,
};

it(`Main page renders correctly`, () => {
  const onSelectOffer = jest.fn();
  const onChangeCity = jest.fn();
  const tree = renderer.create(<MainPage cities={Cities} offers={mock} cityId={cityMock.id} onSelectOffer={onSelectOffer} onChangeCity={onChangeCity}/>);
  expect(tree).toMatchSnapshot();
});
