import { BEACON_IN_RANGE, BEACONS_ADDED, BEACON_OUT_OF_RANGE } from '../actions/beacons';
import Immutable, { List } from 'immutable';
import R from 'ramda';

const groupByBeaconId = R.pipe(
  R.values,
  R.indexBy(R.prop('beaconId'))
);
const initialState = Immutable.fromJS({
  known: {},
});

export default function beacons(state = initialState, { type, ...action }) {
  if (type === BEACON_IN_RANGE) {
    return state
      .updateIn(
        ['known', action.beaconId, 'counts'],
        List(),
        history => history.push(action.created)
      );
  }

  if (type === BEACONS_ADDED) {
    return state.mergeDeep({ known: groupByBeaconId(action.beacons) });
  }

  return state;
};
