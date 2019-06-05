import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {AccommodationType} from "../../data";
import PlaceCard from "./place-card";

Enzyme.configure({adapter: new Adapter()});

const mock = {
  id: 1,
  title: `Beautiful & luxurious apartment at great location`,
  src: `img/apartment-01.jpg`,
  isPremium: false,
  price: 120,
  type: AccommodationType.APARTMENT,
  rating: 3.2,
};

it(`Place card correctly handles click on image`, () => {
  const {
    id
  } = mock;
  const imageClickHandler = jest.fn();
  const placeCard = shallow(<PlaceCard place={mock} onImageClick={imageClickHandler}/>);

  const imageLink = placeCard.find(`.place-card__image-wrapper a`);
  expect(imageLink).toHaveLength(1);
  imageLink.simulate(`click`, {preventDefault() {}});
  expect(imageClickHandler).toHaveBeenCalledWith(id);
});
