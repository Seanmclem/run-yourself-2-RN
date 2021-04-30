import * as React from 'react';
import { StyleSheet } from 'react-native';
import { runHistoryStore } from '../../stores/asyncStore'
import { useSnapshot } from 'valtio'

import { Text, View } from '../../components/Themed';
import { msDifferenceToCounter } from '../../utils/functions';
import { Spacer } from '../Spacer';
import { Lap } from './Counter';


export const CurrentLapTicker: React.FC<{}> = () => {
    const runHistorySnapshot = useSnapshot(runHistoryStore)
    const currentLap: Lap | undefined = runHistorySnapshot.runInProgress?.laps[runHistorySnapshot.runInProgress.laps.length - 1]
    const isFirstLap = runHistorySnapshot.runInProgress?.laps.length === 1
    const overallDuration = runHistorySnapshot.runInProgress?.laps.reduce((prev, curr) => prev + (curr.duration || 0), 0) || 0


    return (
        <View style={styles.container}>
            {((currentLap?.duration || 0) >= 0) ? (
                <Text style={styles.countText}>
                    { msDifferenceToCounter(currentLap?.duration || 0, true)}
                </Text>
            ) : (
                <Text style={styles.countText}>
                    00:00
                </Text>
            )}
            {(isFirstLap && overallDuration) ? (<>
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
