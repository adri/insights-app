import updateCheck from './utils/updateCheck';
import beacons from '../config/beacons';
import { beaconsAdded } from './actions/beacons';
import BeaconMonitor from './beacons/monitor'

export default function init(store) {
  updateCheck();
  const beaconMonitor = new BeaconMonitor(store);
  beaconMonitor.startMonitoring();
  beaconMonitor.subscribe();

  store.dispatch(beaconsAdded(beacons));
}


