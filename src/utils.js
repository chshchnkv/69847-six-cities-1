import {MAX_RATING_IN_STARS} from "./data";

export const ratingToPercent = (rating) => Math.round(rating) / MAX_RATING_IN_STARS * 100;

export const getCityInfoById = (cities, cityId) => (cityId >= 0 && Array.isArray(cities) && cities.length > 0) ? cities.find((cityInfo) => cityInfo.id === cityId) : {};

export const getOffersByCityId = (offerList, cityId) => Array.isArray(offerList) ? offerList.filter((offer) => offer.city === cityId) : [];

export const getOfferById = (offerList, offerId) => Array.isArray(offerList) ? offerList.find((offer) => offer.id === offerId) : [];

export const getNearOffersById = (offersList, offerId, maxNumber = 3) => Array.isArray(offersList) ? offersList.filter((offer) => offer.id !== offerId).slice(0, maxNumber) : [];

let cur = 0;
export const getNewId = () => {
  cur = cur + 1;
  return cur;
};
