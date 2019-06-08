import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in";
import {Cities} from "../../mocks/cities";

const mockCity = 1;

it(`Sign in page renders correctly`, () => {
  const onSubmit = jest.fn();
  const tree = renderer.create(<SignIn currentCityId={mockCity} cities={Cities} onSubmit={onSubmit}/>);
  expect(tree).toMatchSnapshot();
});
