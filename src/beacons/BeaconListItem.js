import React, {
  Component,
  StyleSheet,
  Text,
  View,
  PixelRatio
} from 'react-native';
import Animatable from 'react-native-animatable';
import Histogram from './Histogram';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 15,
    justifyContent: 'space-between',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#eeeeee',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingHorizontal: 15,
    paddingBottom: 15,
    marginTop: 2,
  },
  count: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  histogramContainer: {
    flex: 1,
    alignSelf: 'flex-end'
  }
 });

export default function BeaconListItem({ name, counts = [] }) {
  return (
    <View style={styles.container} animation="zoomInUp" duration={200}>
      {/*<Text style={styles.count}>{counts.length}</Text>*/}
      <Text style={styles.title}>{name}</Text>
      <View style={styles.histogramContainer}><Histogram counts={counts} /></View>
    </View>
  );
}

