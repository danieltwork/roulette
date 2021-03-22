import {combineEpics, ofType} from "redux-observable";
import * as actionTypes from '../actions/action-types';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from "rxjs";
import { setRouletteData, setRouletteError } from "../actions";

export const getRouletteData = action$ => action$.pipe(
  ofType(actionTypes.GET_ROULETTE_DATA),
  mergeMap((action) => ajax.getJSON('/api/roulette').pipe(
    map(response => setRouletteData(response)),
    catchError(error => of(setRouletteError(error.message))),
  ))
);

export default combineEpics(getRouletteData);
