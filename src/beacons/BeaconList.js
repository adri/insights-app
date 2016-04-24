import React, {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  ListView,
  View
} from 'react-native';
import Animatable from 'react-native-animatable';
import Immutable from 'immutable';
import BeaconListItem from './BeaconListItem';
import { SwipeListView } from 'react-native-swipe-list-view';
import { pure } from 'recompose';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
 });

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)});

function BeaconList({ beacons, onSelect }) {
  return (
    <View style={styles.container}>
      <SwipeListView
        dataSource={ds.cloneWithRows(beacons.toArray())}
        renderRow={beacon => (
          <TouchableOpacity onPress={() => onSelect(beacon.toJS())}>
            <BeaconListItem {...beacon.toJS()} />
          </TouchableOpacity>
        )}
        renderHiddenRow={beacon => (
            <View style={styles.rowBack}>
            </View>
        )}
        disableLeftSwipe={true}
        disableRightSwipe={true}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    </View>
  );
}

export default pure(BeaconList);
