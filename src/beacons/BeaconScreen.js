import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { pure } from 'recompose';
import Animatable from 'react-native-animatable';
import * as beaconActions from '../actions/beacons';
import { bindActionCreators } from 'redux';
import BeaconList from './BeaconList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
 });

function BeaconScreen({beacons, actions}) {
  return (
    <View style={styles.container}>
        <BeaconList onSelect={actions.beaconInRange} beacons={beacons.get('known')} />
    </View>
  );
}

export default connect(
  state => ({ beacons: state.get('beacons') }),
  dispatch => ({ actions: bindActionCreators(beaconActions, dispatch) })
)(pure(BeaconScreen));

