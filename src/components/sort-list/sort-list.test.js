import React from "react";
import renderer from "react-test-renderer";
import SortList from "./sort-list";
import {SortField, SortOrder} from "../../data";

const sortOptionsMock = [
  {
    title: `Popular`,
    sort: {
      field: SortField.ID,
      order: SortOrder.ASC
    }
  },
  {
    title: `Price: low to high`,
    sort: {
      field: SortField.PRICE,
      order: SortOrder.ASC
    }
  },
  {
    title: `Price: high to low`,
    sort: {
      field: SortField.PRICE,
      order: SortOrder.DESC
    }
  },
  {
    title: `Top rated first`,
    sort: {
      field: SortField.RANK,
      order: SortOrder.DESC
    }
  }
];

it(`Sort list renders correctly`, () => {
  const tree = renderer.create(<SortList sortOptions={sortOptionsMock}/>);
  expect(tree).toMatchSnapshot();
});
