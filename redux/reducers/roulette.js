import { Map, fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import * as actionTypes from '../actions/action-types';

const defaultState = Map({
  isLoading: false,
  drop: null,
  error: null,
});

export default handleActions({
  [actionTypes.GET_ROULETTE_DATA]: state => state.set('isLoading', true),
  [actionTypes.SET_ROULETTE_DATA]: (state, { payload }) => state
    .set('isLoading', false)
    .set('drop', fromJS(payload.drop))
    .set('error', null),
  [actionTypes.SET_ROULETTE_ERROR]: (state, { payload }) => state
    .set('isLoading', false)
    .set('drop', null)
    .set('error', fromJS(payload)),
}, defaultState);