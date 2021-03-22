import { handleActions } from 'redux-actions';
import * as actionTypes from '../actions/action-types';
import { Map, List} from "immutable";

const defaultState = Map({
  bets: List([]),
  drops: List([])
});

export const BET_RED = 'RED';
export const BET_BLACK = 'BLACK';

export default handleActions({
  [actionTypes.BET_RED]: (state) => state.set('bets', state.get('bets').push(BET_RED)),
  [actionTypes.BET_BLACK]: (state) => state.set('bets', state.get('bets').push(BET_BLACK)),
  [actionTypes.SET_ROULETTE_DATA]: (state, { payload }) => {
    return state.set('drops', state.get('drops').push(payload.drop));
  }
}, defaultState)