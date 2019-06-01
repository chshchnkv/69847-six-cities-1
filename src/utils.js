import {MAX_RATING_IN_STARS} from "./data";
import {Cities} from "./mocks/cities";

export const ratingToPercent = (rating) => Math.round(rating) / MAX_RATING_IN_STARS * 100;

export const getCityInfoById = (cityId) => Cities.find((cityInfo) => cityInfo.id === cityId);

export const getOffersByCityId = (offerList, cityId) => offerList.filter((offer) => offer.location.city === cityId);

export const getCitiesFromOffers = (offers) => [...new Set(offers.map((offer) => offer.location.city))]
  .map(getCityInfoById);
