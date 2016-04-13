import updateCheck from './utils/updateCheck';
import BeaconMonitor from './beacons/monitor'

export default function init(store) {
  //updateCheck();
  const beaconMonitor = new BeaconMonitor(store);
  beaconMonitor.startMonitoring();
  beaconMonitor.subscribe();
}


