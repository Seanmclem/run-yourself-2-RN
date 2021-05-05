import * as React from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { List } from 'react-native-paper';

import { runHistoryStore } from '../stores/asyncStore'
import { useSnapshot } from 'valtio'

import { Text, View } from '../components/Themed';
import { getNowTimestamp, msDifferenceToCounter } from '../utils/functions';
import dayjs from 'dayjs';
import { RUN_HISTORY } from '../conts_types_etc/constants';
import { Lap, Run } from '../components/TimerCounter/Counter';
import { useEffect } from 'react';


const initRunHistory = async () => {
  const runHistory_storage = await AsyncStorage.getItem(RUN_HISTORY)

  if (runHistory_storage !== null) {
    const newRunHistory: Run[] = JSON.parse(runHistory_storage);
    runHistoryStore.run_history = newRunHistory;
  }
}

export default function HistoryScreen() {
  useEffect(() => {
    initRunHistory()
  }, [])

  const runHistorySnapshot = useSnapshot(runHistoryStore)

  return (
    <View style={styles.container}>
      <List.Section title="Run History">

        {runHistorySnapshot.run_history.map(run => {
          const overallDate = (new Date(run.overallStart))
          const formattedOverallDateString = dayjs(overallDate).format('MMM DD, YYYY')

          const now = getNowTimestamp()
          const reducer = (prev: any, curr: Lap) => prev + (curr.duration || now - curr.start)
          const overallDuration = run.laps.reduce(reducer, 0)

          return (
            <List.Accordion key={run.overallStart} style={styles.accordionControl}
              title={`${formattedOverallDateString} - Total: ${msDifferenceToCounter(overallDuration || 0, false, true)}`}>
              <View style={styles.accordionBody}>
                <Text>
                  Started: {dayjs(run.overallStart).format('hh:mm:ss a')}
                </Text>
                <Text>
                  Ended: {run.overallEnd ? dayjs(run.overallEnd).format('hh:mm:ss a') : 'in-progress...'}
                </Text>
                <View style={styles.lapsList}>
                  <Text>
                    Laps:
                  </Text>
                  {run.laps.map((lap, index) => (
                    <Text>
                      {index + 1}: {lap.duration ? msDifferenceToCounter(lap.duration) : 'in-progress...'}
                    </Text>
                  ))}
                </View>
              </View>
            </List.Accordion>
          )
        })}
      </List.Section>

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
    // fontSize: 20,
    // fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  accordionControl: {
    height: 40,
    justifyContent: 'center',
  },
  accordionBody: {
    backgroundColor: 'gray',
    marginHorizontal: 20,
    padding: 10,
  },
  lapsList: {
    backgroundColor: 'dimgray',
    padding: 12,
    marginTop: 7,
  }
});
