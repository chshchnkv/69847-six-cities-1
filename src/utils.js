import {MAX_RATING_IN_STARS} from "./data";

export const ratingToPercent = (rating) => Math.round(rating) / MAX_RATING_IN_STARS * 100;

export const getCityInfoById = (cities, cityId) => (cityId >= 0 && Array.isArray(cities) && cities.length > 0) ? cities.find((cityInfo) => cityInfo.id === cityId) : {};

export const getOffersByCityId = (offerList, cityId) => Array.isArray(offerList) ? offerList.filter((offer) => offer.city === cityId) : [];

export const getOfferById = (offerList, offerId) => Array.isArray(offerList) ? offerList.find((offer) => offer.id === offerId) : [];

export const getNearOffersById = (offersList, offerId, maxNumber = 3) => Array.isArray(offersList) ? offersList.filter((offer) => offer.id !== offerId).slice(0, maxNumber) : [];

export const sortOffers = (offersList, sortOption) => {
  switch (sortOption) {
    case 0: {
      offersList.sort((a, b) => a.id - b.id);
      break;
    }
    case 1: {
      offersList.sort((a, b) => a.price - b.price);
      break;
    }
    case 2: {
      offersList.sort((a, b) => b.price - a.price);
      break;
    }
    case 3: {
      offersList.sort((a, b) => b.rating - a.rating);
      break;
    }
  }
  return offersList;
};

let cur = 0;
export const getNewId = () => {
  cur = cur + 1;
  return cur;
};
