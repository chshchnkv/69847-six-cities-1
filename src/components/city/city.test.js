import React from "react";
import renderer from "react-test-renderer";
import City from "./city";

const mockCity = {
  id: 1,
  name: `Amsterdam`,
  location: {
    longitude: 52.38333,
    latitude: 4.9,
    zoom: 12,
  }
};

it(`City renders correctly`, () => {
  const onActivateCity = jest.fn();
  const tree = renderer.create(<City longitude={mockCity.location.longitude} latitude={mockCity.location.latitude} title={mockCity.name} id={mockCity.id} isActive={true} onActivateCity={onActivateCity}/>);
  expect(tree).toMatchSnapshot();
});
