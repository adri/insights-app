import R from 'ramda';

export const BEACON_IN_RANGE = 'BEACON_IN_RANGE';
export const BEACON_OUT_OF_RANGE = 'BEACON_OUT_OF_RANGE';
export const BEACONS_ADDED = 'BEACONS_ADDED';

function getBeaconId(region) {
  if (!region) {
    return '';
  }
  return [region.uuid, region.major, region.minor].join('-');
}

export function beaconInRange(beacon) {
  return {
    type: BEACON_IN_RANGE,
    beaconId: getBeaconId(beacon),
    created: (new Date).toJSON()
  };
}

export function beaconOutOfRange(beacon) {
  return {
    type: BEACON_OUT_OF_RANGE,
    beaconId: getBeaconId(beacon),
    created: (new Date).toJSON()
  };
}

export function beaconsAdded(beacons) {
  return {
    type: BEACONS_ADDED,
    beacons: R.map(beacon => ({
      ...beacon,
      beaconId: getBeaconId(beacon)
    }), beacons)
  };
}
