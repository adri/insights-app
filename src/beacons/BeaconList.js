import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#333333',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  beaconTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
 });

export default function BeaconList({ beacons, title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {beacons.map(beacon => (
        <Animatable.View animation="zoomInUp" duration={200}>
          <Text style={styles.beaconTitle}>{beacon.get('identifier')}</Text>
        </Animatable.View>
      ))}
    </View>
  );
}

