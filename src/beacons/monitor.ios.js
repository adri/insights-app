import { DeviceEventEmitter } from 'react-native';
const BeaconMonitor = require('react-native-ibeacon');
import beacons from '../../config/beacons';
import { beaconInRange, beaconOutOfRange } from '../actions/beacons';
import R from 'ramda';

export default class Beacon {
  constructor(store) {
    this.store = store;
    this.listeners = [];
  }

  startMonitoring() {
    if (!BeaconMonitor) {
      return;
    }

    this.stopMonitoring();
    console.log('BeaconMonitor.startMonitoring');
    BeaconMonitor.requestAlwaysAuthorization();

    R.values(beacons).forEach(region => {
      BeaconMonitor.startMonitoringForRegion(region);
    });

    //BeaconMonitor.startUpdatingLocation();
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
    this.addListener('regionDidEnter', (data) => {
      console.log('regionDidEnter', data);
      this.store.dispatch(beaconInRange(beacons[data.region], data));
    });
    this.addListener('regionDidExit', ({ region }) => {

      this.store.dispatch(beaconOutOfRange(beacons[region]));
    });
  }

  addListener(event, callback) {
    this.listeners.push(DeviceEventEmitter.addListener(event, data => {
      console.log(event, data);
      callback(data);
    }));
  }
}
