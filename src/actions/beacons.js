export const BEACON_IN_RANGE = 'BEACON_IN_RANGE';
export const BEACON_OUT_OF_RANGE = 'BEACON_OUT_OF_RANGE';

export function beaconRangeSignal(signal) {
  if (signal.proximity == 'unknown' || signal.proximity == 'far') {
    return {
      type: BEACON_OUT_OF_RANGE,
      signal,
    }
  }

  return {
    type: BEACON_IN_RANGE,
    signal,
  };
}

