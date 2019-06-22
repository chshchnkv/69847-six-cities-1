import React from "react";
import renderer from "react-test-renderer";
import PropertyReviewsList from "./property-reviews-list";

const reviewsMock = [{
  id: 0,
  user: {
    id: 0,
    is_pro: true,
    name: `Test User`,
    avatar_url: `/images/avatar.jpg`
  },
  rating: 4.3,
  comment: `Liked this place`,
  date: `2019-05-29T08:10:37.218Z`
}];

it(`Property reviews list renders correclty`, () => {
  const tree = renderer.create(<PropertyReviewsList reviews={reviewsMock}/>);
  expect(tree).toMatchSnapshot();
});
