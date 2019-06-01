import {AccommodationType, PeriodType} from "./data";
import {reducer} from "./reducer";

const initialState = {
  city: `Amsterdam`,
  offers: [
    {
      id: 1,
      title: `Beautiful & luxurious apartment at great location`,
      src: `img/apartment-01.jpg`,
      isPremium: false,
      price: {
        value: 120,
        period: PeriodType.NIGHT
      },
      type: AccommodationType.APARTMENT,
      rating: 3.2,
      location: {
        cityId: `Amsterdam`,
        longitude: 52.3909553943508,
        latitude: 4.85309666406198
      },
    }, {
      id: 2,
      title: `Wood and stone place`,
      src: `img/apartment-02.jpg`,
      isPremium: false,
      price: {
        value: 60,
        period: PeriodType.NIGHT
      },
      type: AccommodationType.HOUSE,
      rating: 2.8,
      location: {
        cityId: `Amsterdam`,
        longitude: 52.369553943508,
        latitude: 4.85309666406198
      },
    }, {
      id: 3,
      title: `Canal View Prinsengracht`,
      src: `img/apartment-03.jpg`,
      isPremium: false,
      price: {
        value: 30,
        period: PeriodType.NIGHT
      },
      type: AccommodationType.HOTEL,
      rating: 4.2,
      location: {
        cityId: `Amsterdam`,
        longitude: 52.3909553943508,
        latitude: 4.929309666406198
      },
    }, {
      id: 4,
      title: `Nice, cozy, warm big bed apartment`,
      src: `img/apartment-01.jpg`,
      isPremium: true,
      price: {
        value: 300
      },
      type: AccommodationType.APARTMENT,
      rating: 5,
      location: {
        cityId: `Amsterdam`,
        longitude: 52.3809553943508,
        latitude: 4.939309666406198
      },
    }, {
      id: 5,
      title: `ibis Styles`,
      src: `img/studio-01.jpg`,
      isPremium: false,
      price: {
        value: 110,
        period: PeriodType.NIGHT
      },
      type: AccommodationType.HOTEL,
      rating: 1,
      location: {
        cityId: `Amsterdam`,
        longitude: 52.3809553943508,
        latitude: 4.929309666406198
      },
    }
  ]
};

const actionChangeCity = {
  type: `change_city`,
  payload: `Paris`
};

const actionRequestOffers = {
  type: `request_offers`,
  payload: [
    {
      id: 6,
      title: `Le Village Montmartre`,
      src: `img/studio-01.jpg`,
      isPremium: false,
      price: {
        value: 110,
        period: PeriodType.NIGHT
      },
      type: AccommodationType.HOSTEL,
      rating: 4.3,
      location: {
        cityId: `Paris`,
        longitude: 48.8839479,
        latitude: 2.3421239
      },
    }, {
      id: 7,
      title: `Hotel Nation Montmartre Paris`,
      src: `img/studio-01.jpg`,
      isPremium: false,
      price: {
        value: 68.5,
        period: PeriodType.NIGHT
      },
      type: AccommodationType.HOTEL,
      rating: 3.1,
      location: {
        cityId: `Paris`,
        longitude: 48.884579,
        latitude: 2.349087
      },
    }, {
      id: 8,
      title: `Hôtel Regina`,
      src: `img/studio-01.jpg`,
      isPremium: false,
      price: {
        value: 152,
        period: PeriodType.NIGHT
      },
      type: AccommodationType.HOTEL,
      rating: 3.3,
      location: {
        cityId: `Paris`,
        longitude: 48.882872,
        latitude: 2.342178
      },
    }, {
      id: 9,
      title: `Hotel Des Arts`,
      src: `img/studio-01.jpg`,
      isPremium: false,
      price: {
        value: 110,
        period: PeriodType.NIGHT
      },
      type: AccommodationType.HOTEL,
      rating: 4.5,
      location: {
        cityId: `Paris`,
        longitude: 48.886555,
        latitude: 2.335414
      },
    }
  ]
};

it(`Reducer correctly changes city`, () => {
  const newState = reducer(initialState, actionChangeCity);
  expect(newState.city).toEqual(`Paris`);
});

it(`Reducer correctly changes offers`, () => {
  expect(initialState.offers).toHaveLength(5);
  const newState = reducer(initialState, actionRequestOffers);
  expect(newState.offers).toHaveLength(4);
  expect(newState.offers[0].title).toEqual(`Le Village Montmartre`);
});
