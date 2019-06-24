import React from "react";
import renderer from "react-test-renderer";
import CommentForm from "./comment-form";

const ratingsMock = [
  {
    value: 1,
    title: `terribly`
  },
  {
    value: 2,
    title: `badly`
  },
  {
    value: 3,
    title: `not bad`
  },
  {
    value: 4,
    title: `good`
  },
  {
    value: 5,
    title: `perfect`
  },
];

it(`Comment form renders correctly`, () => {
  const onPostComment = jest.fn();
  const tree = renderer.create(<CommentForm ratings={ratingsMock} onPostComment={onPostComment}/>);
  expect(tree).toMatchSnapshot();
});
