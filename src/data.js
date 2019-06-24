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

export const urlSortField = `sortby`;
export const urlSortOrder = `order`;

export const SortField = {
  ID: `id`,
  PRICE: `price`,
  RANK: `rank`
};

export const SortOrder = {
  ASC: `asc`,
  DESC: `desc`
};

export const sortOptions = [
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

export const ratings = [
  {
    value: 1,
    title: `terribly`
  },
  {
    value: 2,
    title: `badly`
  },
  {
    value: 3,
    title: `not bad`
  },
  {
    value: 4,
    title: `good`
  },
  {
    value: 5,
    title: `perfect`
  },
];

export const MAX_RATING_IN_STARS = 5;
