import {MAX_RATING_IN_STARS} from "./data";
import {Cities} from "./mocks/cities";

export const ratingToPercent = (rating) => Math.round(rating) / MAX_RATING_IN_STARS * 100;

export const getCityInfoByName = (cityName) => Cities.find((cityInfo) => cityInfo.title === cityName);

export const getOffersByCity = (offerList, city) => offerList.filter((offer) => offer.location.city === city);

export const getCitiesFromOffers = (offers) => [...new Set(offers.map((offer) => offer.location.city))]
  .map(getCityInfoByName);
