/**
 * @flow
 */
import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import invariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import reducers from '../reducers';

export default function configureStore(initialState) {
  console.log('reducers', reducers);
  const store = createStore(
    combineReducers(reducers),
    initialState,
    compose(
      applyMiddleware(invariant(), thunk),
      devTools()
    )
  );

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
