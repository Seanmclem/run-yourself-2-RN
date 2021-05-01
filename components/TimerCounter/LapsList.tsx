import * as React from 'react';
import { StyleSheet } from 'react-native';
import { runHistoryStore } from '../../stores/asyncStore'
import { useSnapshot } from 'valtio'

import { Text, View } from '../../components/Themed';
import { msDifferenceToCounter } from '../../utils/functions';
import { Spacer } from '../Spacer';
import { Lap } from './Counter';

interface props { }

export const LapsList: React.FC<props> = () => {
    const runHistorySnapshot = useSnapshot(runHistoryStore);
    const laps: Lap[] = runHistorySnapshot.runInProgress?.laps || [];
    const length: number = laps.length;
    const isDone: boolean = !!laps[length - 1]?.duration;
    const overallDuration: number = laps.reduce((prev, curr) => prev + (curr.duration || 0), 0) || 0

    return (
        <View style={styles.container}>
            {laps ? (<>
                {isDone && (<>
                    <Text style={styles.item}>
                        Run Summary:
                    </Text>
                    <Spacer
                        height={2}
                        width={140}
                        color='lightgray'
                    />
                </>)}

                {laps.map((lap, index) => {
                    console.log({ laps: { ...laps } })
                    //debugger
                    return (
                        lap.duration && (
                            <Text key={lap.start} style={styles.item}>
                                Lap {index + 1} - {msDifferenceToCounter(lap.duration)}
                            </Text>
                        )
                    )
                })}
                {(isDone) && (<>
                    <Spacer
                        height={2}
                        width={140}
                        color='lightgray'
                    />
                    <Text style={[styles.item]}>
                        Overall: {overallDuration ? msDifferenceToCounter(overallDuration) : '0'}
                    </Text>
                </>)}
            </>) : (
                null
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    item: {
        fontSize: 18,
        marginVertical: 5,
    },
    footer: {
    }
});
