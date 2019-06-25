import "url-search-params-polyfill";
import {MAX_RATING_IN_STARS, SortField, SortOrder, urlSortField, urlSortOrder} from "./data";

export const ratingToPercent = (rating) => Math.round(rating) / MAX_RATING_IN_STARS * 100;

export const getCityInfoByName = (cities, cityName) => (Array.isArray(cities) ? cities.find((cityInfo) => cityInfo.name.toLowerCase().trim() === cityName.toLowerCase().trim()) : {});

export const getCityInfoById = (cities, cityId) => (cityId >= 0 && Array.isArray(cities) && cities.length > 0) ? cities.find((cityInfo) => cityInfo.id === cityId) : {};

export const getOffersByCityId = (offerList, cityId) => Array.isArray(offerList) ? offerList.filter((offer) => offer.city === cityId) : [];

export const getOfferById = (offerList, offerId) => Array.isArray(offerList) ? offerList.find((offer) => offer.id === offerId) : [];

export const getOfferIndexById = (offerList, offerId) => Array.isArray(offerList) ? offerList.findIndex((offer) => offer.id === offerId) : -1;

export const getNearOffersById = (offersList, offerId, maxNumber = 3) => Array.isArray(offersList) ? offersList.filter((offer) => offer.id !== offerId).slice(0, maxNumber) : [];

export const sortOffers = (offersList, sortOptions) => {
  const clone = offersList.slice(0);
  const {field, order} = sortOptions;
  const orderMultiplier = order === SortOrder.ASC ? 1 : -1;
  switch (field) {
    case SortField.ID: {
      clone.sort((a, b) => (a.id - b.id) * orderMultiplier);
      break;
    }
    case SortField.PRICE: {
      clone.sort((a, b) => (a.price - b.price) * orderMultiplier);
      break;
    }
    case SortField.RANK: {
      clone.sort((a, b) => (a.rating - b.rating) * orderMultiplier);
      break;
    }
    case SortField.CITY: {
      clone.sort((a, b) => {
        const {city: {name: nameA}} = a;
        const {city: {name: nameB}} = b;
        const cityNameA = nameA.toLowerCase().trim();
        const cityNameB = nameB.toLowerCase().trim();
        if (cityNameA === cityNameB) {
          return 0;
        } else if (cityNameA > cityNameB) {
          return orderMultiplier;
        } else {
          return -1 * orderMultiplier;
        }
      });
    }
  }
  return clone;
};

export const getSortOptionsFromUrl = (url) => {
  const searchParams = new URLSearchParams(url.search);
  return {
    field: searchParams.get(urlSortField) || SortField.ID,
    order: searchParams.get(urlSortOrder) || SortOrder.ASC
  };
};

export const setSortOptionsToUrl = (url, sortOptions = {}) => {
  const searchParams = new URLSearchParams(url.search);
  const {field = SortField.ID, order = SortOrder.ASC} = sortOptions;
  searchParams.set(urlSortField, field);
  searchParams.set(urlSortOrder, order);
  return searchParams.toString();
};

let cur = 0;
export const getNewId = () => {
  cur = cur + 1;
  return cur;
};
