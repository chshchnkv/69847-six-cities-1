export const AccommodationType = {
  APARTMENT: `apartment`,
  ROOM: `room`,
  HOUSE: `house`,
  HOTEL: `hotel`,
  HOSTEL: `hostel`,
};

export const PeriodType = {
  NIGHT: `night`
};

export const SortType = {
  POPULAR: 0,
  PRICE_LOW_TO_HIGH: 1,
  PRICE_HIGH_TO_LOW: 2,
  TOP_RATED: 3
};

export const sortOptions = [
  {
    id: SortType.POPULAR,
    title: `Popular`
  },
  {
    id: SortType.PRICE_LOW_TO_HIGH,
    title: `Price: low to high`
  },
  {
    id: SortType.PRICE_HIGH_TO_LOW,
    title: `Price: high to low`
  },
  {
    id: SortType.TOP_RATED,
    title: `Top rated first`
  }
];


export const MAX_RATING_IN_STARS = 5;
