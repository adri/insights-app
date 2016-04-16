/**
 * @flow
 */
import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import invariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import reducers from '../reducers';
import {storageReducer, localStorage, loadFromLocalStorage} from './localStorage';

export default function configureStore(initialState) {
  const reducer = storageReducer(combineReducers(reducers));

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(invariant(), thunk, localStorage),
      devTools()
    )
  );

  loadFromLocalStorage(store);

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
