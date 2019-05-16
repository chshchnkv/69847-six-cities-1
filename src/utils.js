import {MAX_RATING_IN_STARS} from "./data";

export const ratingToPercent = (rating) => Math.round(rating) / MAX_RATING_IN_STARS * 100;
