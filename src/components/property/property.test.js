import React from "react";
import renderer from "react-test-renderer";
import Property from "./property";

const userMock = {
  id: 1,
  name: `Stan`,
  is_pro: true,
  avatar_url: ``
};

const propertyMock = {
  id: 1,
  isPremium: false,
  city: 1,
  title: `Wood and stone place`,
  type: `room`,
  description: `A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.`,
  images: [`https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`],
  rating: 4.3,
  price: 274,
  bedrooms: 1,
  max_adults: 1,
  goods: [],
  host: {
    avatar_url: `img/avatar-angelina.jpg`,
    id: 25,
    is_pro: true,
    name: `Angelina`
  },
  location: {
    latitude: 50.828556999999996,
    longitude: 4.362697,
    zoom: 16
  }
};

const reviewsMock = [{
  id: 1,
  user: userMock,
  rating: 4.3,
  comment: `Liked this place`,
  date: `2019-05-29T08:10:37.218Z`
}];

const nearPlacesMock = [];

const citiesMock = [{
  id: 1,
  location: {
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 13
  },
  latitude: 50.846557,
  longitude: 4.351697,
  zoom: 13,
  name: `Brussels`
}];


it(``, () => {
  const onPostComment = jest.fn();
  const onRequestComments = jest.fn();
  const tree = renderer.create(<Property user={userMock} reviews={reviewsMock} onPostComment={onPostComment} nearPlaces={nearPlacesMock} place={propertyMock} cities={citiesMock} onRequestComments={onRequestComments}/>);
  expect(tree).toMatchSnapshot();
});
