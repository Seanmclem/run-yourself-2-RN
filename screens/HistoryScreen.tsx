import * as React from 'react';
import { StyleSheet } from 'react-native';

import { runHistory } from '../stores/asyncStore'
import { useSnapshot } from 'valtio'

import { Text, View } from '../components/Themed';
import { msDifferenceToCounter } from '../utils/functions';
import dayjs from 'dayjs';

export default function HistoryScreen() {
  const runHistorySnap = useSnapshot(runHistory)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Yo Run History
      </Text>
      <View>
        {runHistorySnap.runs.map(run => {
          const overallDate = (new Date(run.overallStart))
          const formattedOverallDateString = dayjs(overallDate).format('MMM DD, YYYY')
          return (
            <Text>
              {`${formattedOverallDateString} - Total: `} {msDifferenceToCounter(run.overallDuration || 0)}
            </Text>
          )
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
