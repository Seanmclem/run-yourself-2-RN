import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { AppButton } from '../AppButton';
import { Spacer } from '../Spacer';

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
