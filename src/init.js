import updateCheck from './updateCheck';
import { startMonitoring, subscribe } from './beacons/monitor'

export default function init() {
  //updateCheck();
  startMonitoring();
  subscribe((region, beacons) => {
    console.log(event, data);
  });
}


