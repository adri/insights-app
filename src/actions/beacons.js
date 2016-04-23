export const BEACON_IN_RANGE = 'BEACON_IN_RANGE';
export const BEACON_OUT_OF_RANGE = 'BEACON_OUT_OF_RANGE';

export function beaconInRange(region) {
  return {
    type: BEACON_IN_RANGE,
    created: (new Date).toJSON(),
    range
  };
}

export function beaconOutOfRange(region) {
  return {
    type: BEACON_OUT_OF_RANGE,
    created: (new Date).toJSON(),
    range
  };
}

