import {MAX_RATING_IN_STARS} from "./data";

export const ratingToPercent = (rating) => Math.round(rating) / MAX_RATING_IN_STARS * 100;

export const getCityInfoById = (cities, cityId) => Array.isArray(cities) && cities.length > 0 ? cities.find((cityInfo) => cityInfo.id === cityId) : {};

export const getOffersByCityId = (offerList, cityId) => Array.isArray(offerList) && offerList.length > 0 ? offerList.filter((offer) => offer.city === cityId) : [];


let cur = 0;
export const getNewId = () => {
  cur = cur + 1;
  return cur;
};
