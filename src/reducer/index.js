import {combineReducers} from "redux";
import {reducer as user} from "./user/user";
import {reducer as data} from "./data/data";
import {reducer as site} from "./site/site";

export default combineReducers({
  user,
  data,
  site
});
