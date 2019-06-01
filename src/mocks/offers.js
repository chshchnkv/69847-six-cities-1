import {AccommodationType, PeriodType} from "../data";

export const offers = [
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
      city: 5,
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
      city: 1,
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
      city: 1,
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
      city: 1,
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
      city: 1,
      longitude: 52.3809553943508,
      latitude: 4.929309666406198
    },
  }, {
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
      city: 2,
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
      city: 2,
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
      city: 2,
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
      city: 2,
      longitude: 48.886555,
      latitude: 2.335414
    },
  }, {
    id: 10,
    title: `Senator`,
    src: `img/studio-01.jpg`,
    isPremium: false,
    price: {
      value: 67.64,
      period: PeriodType.NIGHT
    },
    type: AccommodationType.HOTEL,
    rating: 3.2,
    location: {
      city: 3,
      longitude: 50.939567,
      latitude: 6.958203
    },
  }, {
    id: 11,
    title: `Hotel Freiheit GmbH Köln`,
    src: `img/studio-01.jpg`,
    isPremium: true,
    price: {
      value: 140.46,
      period: PeriodType.NIGHT
    },
    type: AccommodationType.HOTEL,
    rating: 4.2,
    location: {
      city: 3,
      longitude: 50.935694,
      latitude: 6.971236
    },
  }, {
    id: 12,
    title: `Humboldt 1 Palais-Hotel`,
    src: `img/studio-01.jpg`,
    isPremium: false,
    price: {
      value: 145.17,
      period: PeriodType.NIGHT
    },
    type: AccommodationType.HOTEL,
    rating: 4.4,
    location: {
      city: 3,
      longitude: 50.940278,
      latitude: 6.950829
    },
  }, {
    id: 13,
    title: `Bürgerhof Hotel`,
    src: `img/studio-01.jpg`,
    isPremium: false,
    price: {
      value: 57.69,
      period: PeriodType.NIGHT
    },
    type: AccommodationType.HOTEL,
    rating: 3.5,
    location: {
      city: 3,
      longitude: 50.939105,
      latitude: 6.959495
    },
  }, {
    id: 14,
    title: `Hotel Alma Grand Place`,
    src: `img/studio-01.jpg`,
    isPremium: false,
    price: {
      value: 126.8,
      period: PeriodType.NIGHT
    },
    type: AccommodationType.HOTEL,
    rating: 3.7,
    location: {
      city: 4,
      longitude: 50.846148,
      latitude: 4.353535
    },
  }, {
    id: 15,
    title: `Pillows Grand Hotel Place Rouppe`,
    src: `img/studio-01.jpg`,
    isPremium: false,
    price: {
      value: 156.5,
      period: PeriodType.NIGHT
    },
    type: AccommodationType.HOTEL,
    rating: 4.5,
    location: {
      city: 4,
      longitude: 50.843005,
      latitude: 4.346411
    },
  }, {
    id: 16,
    title: `Smartflats Design - L42`,
    src: `img/studio-01.jpg`,
    isPremium: false,
    price: {
      value: 166.3,
      period: PeriodType.NIGHT
    },
    type: AccommodationType.HOTEL,
    rating: 4.3,
    location: {
      city: 4,
      longitude: 50.845984,
      latitude: 4.370445
    },
  }, {
    id: 17,
    title: `Steigenberger Hotel Hamburg`,
    src: `img/studio-01.jpg`,
    isPremium: false,
    price: {
      value: 173,
      period: PeriodType.NIGHT
    },
    type: AccommodationType.HOTEL,
    rating: 4.2,
    location: {
      city: 5,
      longitude: 53.549848,
      latitude: 9.985613
    },
  }, {
    id: 18,
    title: `ARCOTEL Rubin Hamburg`,
    src: `img/studio-01.jpg`,
    isPremium: false,
    price: {
      value: 92.3,
      period: PeriodType.NIGHT
    },
    type: AccommodationType.HOTEL,
    rating: 4.2,
    location: {
      city: 5,
      longitude: 53.556911,
      latitude: 10.015859
    },
  }, {
    id: 19,
    title: `prizeotel Hamburg-City`,
    src: `img/studio-01.jpg`,
    isPremium: false,
    price: {
      value: 98,
      period: PeriodType.NIGHT
    },
    type: AccommodationType.HOTEL,
    rating: 4.4,
    location: {
      city: 5,
      longitude: 53.546423,
      latitude: 10.014009
    },
  }, {
    id: 20,
    title: `Hyatt House Dusseldorf`,
    src: `img/studio-01.jpg`,
    isPremium: true,
    price: {
      value: 212,
      period: PeriodType.NIGHT
    },
    type: AccommodationType.HOTEL,
    rating: 4.5,
    location: {
      city: 6,
      longitude: 51.229145,
      latitude: 6.774576
    },
  }, {
    id: 21,
    title: `Hanseat Hotel`,
    src: `img/studio-01.jpg`,
    isPremium: false,
    price: {
      value: 121,
      period: PeriodType.NIGHT
    },
    type: AccommodationType.HOTEL,
    rating: 3.9,
    location: {
      city: 6,
      longitude: 51.232693,
      latitude: 6.746081
    },
  }, {
    id: 22,
    title: `Hotel Enger Hof`,
    src: `img/studio-01.jpg`,
    isPremium: false,
    price: {
      value: 75,
      period: PeriodType.NIGHT
    },
    type: AccommodationType.HOTEL,
    rating: 3.8,
    location: {
      city: 6,
      longitude: 51.235152,
      latitude: 6.816212
    },
  }, {
    id: 23,
    title: `Gut Moschenhof`,
    src: `img/studio-01.jpg`,
    isPremium: false,
    price: {
      value: 20,
      period: PeriodType.NIGHT
    },
    type: AccommodationType.HOSTEL,
    rating: 4.1,
    location: {
      city: 6,
      longitude: 51.260962,
      latitude: 6.872934
    },
  },
];
