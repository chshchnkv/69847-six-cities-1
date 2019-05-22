import React from "react";
import renderer from "react-test-renderer";
import Map from "./map";

const mock = {
  city: {
    longitude: 52.38333,
    latitude: 4.9
  },
  zoom: 12,
  pins: [
    {
      longitude: 52.3909553943508,
      latitude: 4.85309666406198
    },
    {
      longitude: 52.369553943508,
      latitude: 4.85309666406198
    },
    {
      longitude: 52.3909553943508,
      latitude: 4.929309666406198
    },
    {
      longitude: 52.3809553943508,
      latitude: 4.939309666406198
    },
    {
      longitude: 52.3809553943508,
      latitude: 4.929309666406198
    }
  ]
};

it(`Map renders correctly`, () => {
  const tree = renderer.create(<Map city={mock.city} zoom={mock.zoom} pins={mock.pins}/>);
  expect(tree).toMatchSnapshot();
});
