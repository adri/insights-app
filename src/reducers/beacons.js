import { BEACON_IN_RANGE, BEACON_OUT_OF_RANGE } from '../actions/beacons';
import Immutable from 'immutable';
import R from 'ramda';

const initialState = Immutable.fromJS({
  nearby: {},
  gone: {},
  nearbyCount: {},
});

function getBeaconId(signal) {
  if (!signal) {
    return '';
  }
  return [signal.uuid, signal.major, signal.minor].join('-');
}

export default function beacons(state = initialState, {type, signal}) {
  const beaconId = getBeaconId(signal);

  if (type === BEACON_IN_RANGE) {
    return state
      .updateIn(['nearbyCount', signal.identifier], (count = 0) => {
        if (state.hasIn(['nearby', beaconId])) {
          return count;
        }

        return count + 1;
      })
      .setIn(['nearby', beaconId], signal);
  }

  if (type === BEACON_OUT_OF_RANGE) {
    return state.deleteIn(['nearby', beaconId])
  }

  return state;
};
