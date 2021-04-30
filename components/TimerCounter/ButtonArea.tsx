import * as React from 'react';
import { StyleSheet } from 'react-native';
import { runHistoryStore } from '../../stores/asyncStore'
import { useSnapshot } from 'valtio'

import { View } from '../../components/Themed';
import { AppButton } from '../AppButton';
import { Spacer } from '../Spacer';
import { Lap } from './Counter';

interface props {
    startTimer: any;
    nextLap: any;
    stopTimer: any;
}

export const ButtonArea: React.FC<props> = ({ startTimer, nextLap, stopTimer }) => {
    const runHistorySnapshot = useSnapshot(runHistoryStore);
    const laps: Lap[] = runHistorySnapshot.runInProgress?.laps || [];
    const isRunning: boolean = !laps[length - 1]?.duration;

    return (
        <View style={styles.container}>
            { !isRunning && (
                <>
                    <AppButton
                        onPress={startTimer}
                        title="Start Timer"
                    />
                </>
            )}
            { isRunning && (
                <>
                    <AppButton
                        onPress={nextLap}
                        title="LAP"
                    />
                    <Spacer
                        width={50}
                        height={20}
                    />
                    <AppButton
                        onPress={stopTimer}
                        title="Stop Timer"
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
