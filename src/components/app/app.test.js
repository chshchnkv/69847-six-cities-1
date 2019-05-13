import React from "react";
import renderer from "react-test-renderer";
import App from "./app";

const data = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`];

it(`App renders correctly`, () => {
  const tree = renderer
    .create(<App places={data}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
