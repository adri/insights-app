import React, {
  Component,
  StyleSheet,
  Text,
  View,
  PixelRatio
} from 'react-native';
import Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-between',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#eeeeee',
  },
  title: {
    flex: 1,
    fontSize: 15,
    textAlign: 'left',
    paddingHorizontal: 15,
    marginTop: 2,
  },
  count: {
    fontSize: 18,
    fontWeight: 'bold',
  }
 });

export default function BeaconListItem({ identifier, counts = [] }) {
  return (
    <Animatable.View style={styles.container} animation="zoomInUp" duration={200}>
      <Text style={styles.count}>{counts.length}</Text>
      <Text style={styles.title}>{identifier}</Text>
    </Animatable.View>
  );
}

