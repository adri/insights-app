/**
 * @flow
 */
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import * as storage from 'redux-storage';
import debounce from 'redux-storage-decorator-debounce';
import filter from 'redux-storage-decorator-filter';
import immutable from 'redux-storage-decorator-immutablejs';
import immutableMerger from 'redux-storage-merger-immutablejs';
import R from 'ramda';

const DEBOUNCE_MS = 1500;

function whiteList(engine) {
  return filter(engine , [
    // whitelist beacon reducer
    'beacons'
  ])
}

const engine = whiteList(debounce(createEngine('insights'), DEBOUNCE_MS));

//const engine = debounce(createEngine('insights'), DEBOUNCE_MS);

export function storageReducer(reducers) {
  return storage.reducer(reducers, immutableMerger);
}
export const localStorage = storage.createMiddleware(engine);
export const loadFromLocalStorage = storage.createLoader(engine);
