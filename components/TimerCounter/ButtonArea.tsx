import * as React from 'react';
import { StyleSheet } from 'react-native';
import { runHistoryStore } from '../../stores/asyncStore'
import { useSnapshot } from 'valtio'
import { Button } from 'react-native-paper';

import { View } from '../../components/Themed';
import { Spacer } from '../Spacer';
import { Lap } from './Counter';

export interface ButtonAreaProps {
    startTimer: any;
    nextLap: any;
    stopTimer: any;
}

const TimerButton = ({ onPress, children }: { onPress: any, children: any }) => (
    <Button mode="contained" dark onPress={onPress} color="#009688">
        {children}
    </Button>
)

export const ButtonArea: React.FC<ButtonAreaProps> = ({ startTimer, nextLap, stopTimer }) => {
    const runHistorySnapshot = useSnapshot(runHistoryStore);
    const laps: Lap[] = runHistorySnapshot.runInProgress?.laps || [];
    const currentLap = laps[laps.length - 1];
    const isRunning: boolean = currentLap && !currentLap.duration

    return (
        <View style={styles.container}>
            { !isRunning && (
                <>
                    <TimerButton onPress={startTimer}>
                        Start Timer
                    </TimerButton>
                </>
            )}
            { isRunning && (
                <>
                    <TimerButton onPress={nextLap}>
                        Lap
                    </TimerButton>
                    <Spacer
                        width={50}
                        height={20}
                    />
                    <TimerButton onPress={stopTimer}>
                        Stop Timer
                    </TimerButton>
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
