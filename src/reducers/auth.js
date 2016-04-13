import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/auth';
import Immutable from 'immutable';

const initialState = Immutable.Map();

export default function auth(state = initialState, action) {
  return state;
};
