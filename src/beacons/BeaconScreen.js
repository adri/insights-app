import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { pure } from 'recompose';
import Animatable from 'react-native-animatable';
import BeaconList from './BeaconList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  countsContainer: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  countTitle: {
    fontSize: 20,
    margin: 10,
  },
  count: {
    fontSize: 30,
    margin: 10,
    textAlign: 'center'
  }
 });

class BeaconScreen extends Component {
  render() {
    const { beacons } = this.props;

    return (
      <View style={styles.container}>
        <Text>Counts for nearby</Text>
        <View style={styles.countsContainer}>
          {beacons.get('nearbyCount').map((count, label) => (
              <View style={styles.container}>
                <Text style={styles.countTitle}>{label}</Text>
                <Text style={styles.count}>{count}</Text>
              </View>
          ))}
        </View>

      </View>
    );
        // <View style={styles.countsContainer}>
        //   <BeaconList beacons={beacons.get('nearby')} title="Nearby beacons" />
        //   <BeaconList beacons={beacons.get('gone')} title="Known beacons" />
        // </View>
  }
}

export default connect(
  state => ({ beacons: state.get('beacons') })
)(pure(BeaconScreen));

