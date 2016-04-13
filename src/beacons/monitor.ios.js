import { DeviceEventEmitter } from 'react-native';
import BeaconMonitor from 'react-native-ibeacon';
import beacons from '../../config/beacons';
import R from 'ramda';

export function startMonitoring() {
    stopMonitoring();
    console.log('BeaconMonitor.startMonitoring');
    BeaconMonitor.requestAlwaysAuthorization();

    R.values(beacons).forEach(region => {
        BeaconMonitor.startMonitoringForRegion(region);
        //BeaconMonitor.startRangingBeaconsInRegion(region);
    });

    BeaconMonitor.startUpdatingLocation();
    //BeaconMonitor.shouldDropEmptyRanges(true);
}

export function stopMonitoring() {
    console.log('BeaconMonitor.stopMonitoring');

    R.values(beacons).forEach(region => {
        BeaconMonitor.stopMonitoringForRegion(region);
    });
    BeaconMonitor.stopUpdatingLocation();
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
export function subscribe(callback) {
    DeviceEventEmitter.addListener('beaconsDidRange', ({ region, beacons }) => {
        console.log('beaconsDidRange', region, beacons);
        callback(region, beacons);
    });
    DeviceEventEmitter.addListener('regionDidEnter', data => {
        console.log('startRangingBeaconsInRegion', data);
        BeaconMonitor.startRangingBeaconsInRegion(beacons[data.region]);
    });
    DeviceEventEmitter.addListener('regionDidExit', (data) => {
        console.log('stopRangingBeaconsInRegion', data);
        BeaconMonitor.stopRangingBeaconsInRegion(beacons[data.region]);
    });
}

