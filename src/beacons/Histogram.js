import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Animatable from 'react-native-animatable';
import { BarChart } from 'react-native-charts';
import R from 'ramda';
import { pure } from 'recompose';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bar: {
    backgroundColor: 'grey',
    width: 15,
  },
 });

// YYYY-mm-dd
function formatDate(date) {
  return date.toJSON().substr(0, 10);
}

/**
 * Return a list of counts for the last x days.
 *
 * @param {Array<string>} counts
 * @returns {*}
 */
function countsByDay(counts) {
  let today = new Date(Date.now() + 86400000); // Tomorrow

  return R.range(1, 15)
    .map(() => {
      today.setDate(today.getDate() - 1);

      return formatDate(today);
    })
    .map(day => {
      return counts
        .filter(timestamp => timestamp.startsWith(day))
        .length
    })
}

function Histogram({ counts }) {
  const data = countsByDay(counts).map(count => ({ value: count }));

  return (
    <View style={styles.container}>
        <BarChart
          dataSets={[
            {
              fillColor: '#e3e3e3',
              data
            },
          ]}
          graduation={1}
          horizontal={false}
          showGrid={false}
          barSize={5}
          barSpacing={2}
          barStyle={{
            width: 5,
          }}
          style={{
            height: 30,
          }}
          />
    </View>
  );
}


export default pure(Histogram);
