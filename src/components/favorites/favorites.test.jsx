import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import Favorites from "./favorites";
import history from "../../history";
import {AccommodationType} from "../../data";
import {Cities} from "../../mocks/cities";

const favoritesMock = [
  {
    cityId: 1,
    offers: [
      {
        id: 2,
        title: `Wood and stone place`,
        src: `img/apartment-02.jpg`,
        isPremium: true,
        isFavorite: true,
        price: 60,
        type: AccommodationType.HOUSE,
        rating: 2.8,
        city: 1,
        location: {
          longitude: 52.369553943508,
          latitude: 4.85309666406198
        },
      },
      {
        id: 3,
        title: `Canal View Prinsengracht`,
        src: `img/apartment-03.jpg`,
        isPremium: false,
        isFavorite: true,
        price: 30,
        type: AccommodationType.HOTEL,
        rating: 4.2,
        city: 1,
        location: {
          longitude: 52.3909553943508,
          latitude: 4.929309666406198
        },
      }
    ]
  },
  {
    cityId: 2,
    offers: [
      {
        id: 1,
        title: `Beautiful & luxurious apartment at great location`,
        src: `img/apartment-01.jpg`,
        isPremium: false,
        isFavorite: true,
        price: 120,
        type: AccommodationType.APARTMENT,
        rating: 3.2,
        city: 2,
        location: {
          longitude: 52.3909553943508,
          latitude: 4.85309666406198
        },
      },
    ]
  }
];

it(`Favorites renders correctly`, () => {
  const onFavoriteClick = jest.fn();
  const onRequestFavorites = jest.fn();
  const tree = renderer.create(
      <Router history={history}>
        <Favorites favorites={favoritesMock} cities={Cities} onFavoriteClick={onFavoriteClick} onRequestFavorites={onRequestFavorites} />
      </Router>
  );
  expect(tree).toMatchSnapshot();
});
