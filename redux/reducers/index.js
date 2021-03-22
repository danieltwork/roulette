import { combineReducers } from 'redux-immutable';
import roulette from "./roulette";
import bets from "./bets";

export default combineReducers({
  roulette,
  bets,
});
