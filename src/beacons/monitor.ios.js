import { DeviceEventEmitter } from 'react-native';
import BeaconMonitor from 'react-native-ibeacon';
import beacons from '../../config/beacons';
import { beaconRangeSignal } from '../actions/beacons';
import R from 'ramda';

export default class Beacon {
  constructor(store) {
    this.store = store;
    this.listeners = [];
  }

  startMonitoring(store) {
    this.stopMonitoring();
    console.log('BeaconMonitor.startMonitoring');
    BeaconMonitor.requestAlwaysAuthorization();

    R.values(beacons).forEach(region => {
      BeaconMonitor.startMonitoringForRegion(region);
    });

    BeaconMonitor.startUpdatingLocation();
    BeaconMonitor.shouldDropEmptyRanges(true);
  }

  stopMonitoring() {
    console.log('BeaconMonitor.stopMonitoring');
    this.listeners.forEach(listener => listener.remove());

    R.values(beacons).forEach(region => {
      BeaconMonitor.stopMonitoringForRegion(region);
    });
    BeaconMonitor.stopUpdatingLocation();
  }

  subscribe() {
    console.log('subscribe');
    this.addListener('beaconsDidRange', ({ region, beacons }) => {
      console.log('beaconDidRange');
       beacons.forEach(signal => {
         this.store.dispatch(beaconRangeSignal({ ...signal, ...region}))
       });
    });
    this.addListener('regionDidEnter', ({ region }) => {
      BeaconMonitor.startRangingBeaconsInRegion(beacons[region]);
    });
    this.addListener('regionDidExit', ({ region }) => {
      BeaconMonitor.stopRangingBeaconsInRegion(beacons[region]);
    });
  }

  addListener(event, callback) {
    this.listeners.push(DeviceEventEmitter.addListener(event, data => {
      console.log(event, data);
      callback(data);
    }));
  }
}


// data.region - The current region
// data.region.identifier
// data.region.uuid
// data.beacons - Array of all beacons inside a region
//  in the following structure:
//    .uuid
//    .major - The major version of a beacon
//    .minor - The minor version of a beacon
//    .rssi - Signal strength: RSSI value (between -100 and 0)
//    .proximity - Proximity value, can either be "unknown", "far", "near" or "immediate"
//    .accuracy - The accuracy of a beacon

