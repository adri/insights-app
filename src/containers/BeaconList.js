import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  beaconTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  beaconText: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  countsContainer: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  countContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#333333',
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

class BeaconList extends Component {
  render() {
    const { beacons } = this.props;

    return (
      <View style={styles.container}>
        <Text>Counts for nearby</Text>
        <View style={styles.countsContainer}>
          {beacons.get('nearbyCount').map((count, label) => (
              <View style={styles.countContainer}>
                <Text style={styles.countTitle}>{label}</Text>
                <Text style={styles.count}>{count}</Text>
              </View>
          ))}
        </View>

        <View style={styles.countsContainer}>
          <View style={styles.countContainer}>
            <Text>Nearby beacons</Text>

            {beacons.get('nearby').map(beacon => (
              <Animatable.View animation="zoomInUp" duration={200}>
                <Text style={styles.beaconTitle}>{beacon.identifier}</Text>
              </Animatable.View>
            ))}
          </View>
          <View style={styles.countContainer}>
            <Text>Known beacons</Text>

            {beacons.get('gone').map(beacon => (
              <Animatable.View animation="zoomInUp" duration={200}>
                <Text style={styles.beaconTitle}>{beacon.identifier}</Text>
              </Animatable.View>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({ beacons: state.get('beacons') })
)(BeaconList);

