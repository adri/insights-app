import { BEACON_IN_RANGE, BEACON_OUT_OF_RANGE } from '../actions/beacons';
import Immutable from 'immutable';
import R from 'ramda';

const initialState = Immutable.fromJS({
  nearby: {},
  gone: {},
  nearbyCount: {},
});

function getKey(signal) {
  return [signal.uuid, signal.major, signal.minor].join('-');
}

export default function beacons(state = initialState, action) {
  switch (action.type) {
    case BEACON_IN_RANGE:
      var key = getKey(action.signal);
      return state
          .deleteIn(['gone', key])
          .updateIn(['nearbyCount', action.signal.identifier], (count = 0) => {
            if (state.getIn(['nearby', key])) {
              return count;
            }

            return count + 1;
          })
          .setIn(['nearby', key], action.signal);
    case BEACON_OUT_OF_RANGE:
      var key = getKey(action.signal);
      return state
        .deleteIn(['nearby', key])
        .setIn(['gone', key], action.signal);
    default:
      return state
  }
};
