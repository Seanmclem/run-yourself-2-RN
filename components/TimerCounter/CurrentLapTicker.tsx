import * as React from 'react';
import { StyleSheet } from 'react-native';
import { runHistoryStore } from '../../stores/asyncStore'
import { useSnapshot } from 'valtio'

import { Text, View } from '../../components/Themed';
import { getNowTimestamp, msDifferenceToCounter } from '../../utils/functions';
import { Spacer } from '../Spacer';
import { Lap } from './Counter';


export const CurrentLapTicker: React.FC<{}> = () => {
    const runHistorySnapshot = useSnapshot(runHistoryStore)
    const currentLap: Lap | undefined = runHistorySnapshot.runInProgress?.laps[runHistorySnapshot.runInProgress.laps.length - 1]
    const isFirstLap = runHistorySnapshot.runInProgress?.laps.length === 1

    const now = getNowTimestamp()
    const currentLapDuration = currentLap?.duration || (currentLap?.start ? (now - currentLap.start) : 0)

    const reducer = (prev: any, curr: Lap) => prev + (curr.duration || now - curr.start)
    const overallDuration = runHistorySnapshot.runInProgress?.laps.reduce(reducer, 0) || 0

    return (
        <View style={styles.container}>
            {(currentLapDuration > 0) ? (
                <Text style={styles.countText}>
                    { msDifferenceToCounter(currentLapDuration || 0, true)}
                </Text>
            ) : (
                <Text style={styles.countText}>
                    00:00
                </Text>
            )}
            {(!isFirstLap && overallDuration) ? (<>
                <Spacer
                    height={2}
                    width={150}
                    color='lightgray' // --Line--
                />
                <Text style={styles.countText}>
                    {msDifferenceToCounter(overallDuration, true)}
                </Text>
            </>) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,

    },
    countText: {
        fontSize: 40,
        fontFamily: "Futura",
    },
});
