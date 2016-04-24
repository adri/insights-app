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
  },
  bar: {
    backgroundColor: 'grey',
    width: 15,
  },
 });

export default function Histogram({ counts }) {
  return (
    <View style={styles.container}>
      <Animatable.View style={styles.bar} animation="zoomInUp" duration={200} />
    </View>
  );
}

