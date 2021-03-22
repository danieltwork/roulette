import { createActions } from 'redux-actions';
import * as actionTypes from './action-types';
import { defaultAction } from '../../helpers';

export const {
  getRouletteData,
  setRouletteData,
  setRouletteError,
  betRed,
  betBlack
} = createActions({
  [actionTypes.GET_ROULETTE_DATA]: defaultAction,
  [actionTypes.SET_ROULETTE_DATA]: defaultAction,
  [actionTypes.SET_ROULETTE_ERROR]: defaultAction,
  [actionTypes.BET_RED]: defaultAction,
  [actionTypes.BET_BLACK]: defaultAction
});
