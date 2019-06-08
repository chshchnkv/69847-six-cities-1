import React from "react";
import renderer from "react-test-renderer";
import {Cities} from "../../mocks/cities";
import CityList from "./city-list";

const mockCity = 1;

it(`City list renders correctly`, () => {
  const onChangeCity = jest.fn();
  const tree = renderer.create(<CityList cities={Cities} onChangeCity={onChangeCity} activeItem={mockCity}/>);
  expect(tree).toMatchSnapshot();
});
