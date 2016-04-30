import { DeviceEventEmitter } from 'react-native';
const BeaconMonitor = require('react-native-ibeacon');
import beacons from '../../config/beacons';
import { beaconInRange, beaconOutOfRange } from '../actions/beacons';
import R from 'ramda';

export default class Beacon {
  constructor(dispatch) {
    this.dispatch = dispatch;
    this.listeners = [];
  }

  startMonitoring() {
    if (!BeaconMonitor) {
      return;
    }

    this.stopMonitoring();
    console.log('BeaconMonitor.startMonitoring');
    BeaconMonitor.requestAlwaysAuthorization();

    BeaconMonitor.requestAlwaysAuthorization();
    BeaconMonitor.getAuthorizationStatus(authorization => {
      console.log('authorization', authorization);
    });

    R.values(beacons).forEach(region => {
      console.log('Monitoring region', region);
      BeaconMonitor.startMonitoringForRegion({
        identifier: region.identifier,
        uuid: region.uuid,
      });
    });

    //BeaconMonitor.startUpdatingLocation();
    //BeaconMonitor.shouldDropEmptyRanges(true);
  }

  stopMonitoring() {
    console.log('BeaconMonitor.stopMonitoring');
    this.listeners.forEach(listener => listener.remove());

    R.values(beacons).forEach(region => {
      BeaconMonitor.stopMonitoringForRegion(region);
    });
  }

  subscribe() {
    console.log('subscribing to regionDidEnter and regionDidExit');
    this.addListener('regionDidEnter', (data) => {
      console.log('regionDidEnter', data);
      this.dispatch(beaconInRange(beacons[data.region], data));
    });
    this.addListener('regionDidExit', ({ region }) => {
      console.log('regionDidExit', region);
      this.dispatch(beaconOutOfRange(beacons[region]));
    });
  }

  addListener(event, callback) {
    this.listeners.push(DeviceEventEmitter.addListener(event, data => {
      console.log(event, data);
      callback(data);
    }));
  }
}
