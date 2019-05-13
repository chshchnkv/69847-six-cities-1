import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./app";

const data = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`];

Enzyme.configure({adapter: new Adapter()});

it(`App correctly clicks place card header`, () => {
  const placeClickHandler = jest.fn();
  const app = shallow(<App places={data} onPlaceClick={placeClickHandler}/>);

  const placeHeader = app.find(`.place-card__name a`);
  expect(placeHeader).toHaveLength(4);
  placeHeader.first().simulate(`click`, {preventDefault() {}});
  expect(placeClickHandler).toHaveBeenCalledTimes(1);
});
