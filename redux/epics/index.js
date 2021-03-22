import { combineEpics } from 'redux-observable';
import roulette from "./roulette";


export default combineEpics(
  roulette
);
