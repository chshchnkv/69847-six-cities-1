import React from "react";
import renderer from "react-test-renderer";
import {AccommodationType, PeriodType} from "../../data";
import MainPage from "./main-page";

const mock = [
  {
    id: 1,
    title: `Beautiful & luxurious apartment at great location`,
    src: `img/apartment-01.jpg`,
    isPremium: false,
    price: {
      value: 120,
      period: PeriodType.NIGHT
    },
    type: AccommodationType.APARTMENT,
    rating: 3.2,
    location: {
      longitude: 52.3909553943508,
      latitude: 4.85309666406198
    },
  }, {
    id: 2,
    title: `Wood and stone place`,
    src: `img/apartment-02.jpg`,
    isPremium: false,
    price: {
      value: 60,
      period: PeriodType.NIGHT
    },
    type: AccommodationType.HOUSE,
    rating: 2.8,
    location: {
      longitude: 52.369553943508,
      latitude: 4.85309666406198
    },
  }, {
    id: 3,
    title: `Canal View Prinsengracht`,
    src: `img/apartment-03.jpg`,
    isPremium: false,
    price: {
      value: 30,
      period: PeriodType.NIGHT
    },
    type: AccommodationType.HOTEL,
    rating: 4.2,
    location: {
      longitude: 52.3909553943508,
      latitude: 4.929309666406198
    },
  }, {
    id: 4,
    title: `Nice, cozy, warm big bed apartment`,
    src: `img/apartment-01.jpg`,
    isPremium: true,
    price: {
      value: 300
    },
    type: AccommodationType.APARTMENT,
    rating: 5,
    location: {
      longitude: 52.3809553943508,
      latitude: 4.939309666406198
    },
  }, {
    id: 5,
    title: `ibis Styles`,
    src: `img/studio-01.jpg`,
    isPremium: false,
    price: {
      value: 110,
      period: PeriodType.NIGHT
    },
    type: AccommodationType.HOTEL,
    rating: 1,
    location: {
      longitude: 52.3809553943508,
      latitude: 4.929309666406198
    },
  },
];

it(`Main page renders correctly`, () => {
  const tree = renderer.create(<MainPage offers={mock}/>);
  expect(tree).toMatchSnapshot();
});
