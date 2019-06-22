import React from "react";
import renderer from "react-test-renderer";
import PropertyReview from "./property-review";

const reviewMock = {
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
};

it(`Property review renders correclty`, () => {
  const tree = renderer.create(<PropertyReview id={reviewMock.id} rating={reviewMock.rating} date={reviewMock.date} comment={reviewMock.comment} user={reviewMock.user}/>);
  expect(tree).toMatchSnapshot();
});
