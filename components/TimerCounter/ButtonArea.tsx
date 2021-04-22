import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { AppButton } from '../AppButton';

interface props {
    isRunning: boolean;
    startTimer: any;
    nextLap: any;
    stopTimer: any;
}

export const ButtonArea: React.FC<props> = ({ isRunning, startTimer, nextLap, stopTimer }) => {
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
                    // style={} need style prop passed TODO
                    />
                    <AppButton
                        onPress={stopTimer}
                        title="Stop Timer"
                    // style={} need style prop passed TODO
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
