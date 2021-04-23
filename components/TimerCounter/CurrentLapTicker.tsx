import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { msDifferenceToCounter } from '../../utils/functions';
import { Spacer } from '../Spacer';

interface props {
    duration?: number,
    overallDuration?: number,
    isFirstLap: boolean,
}

export const CurrentLapTicker: React.FC<props> = ({ duration, overallDuration, isFirstLap }) => {
    return (
        <View style={styles.container}>
            {(duration && duration > 0) ? (
                <Text style={styles.countText}>
                    { msDifferenceToCounter(duration, true)}
                </Text>
            ) : (
                <Text style={styles.countText}>
                    00:00
                </Text>
            )}
            {(isFirstLap && overallDuration && overallDuration > 0) ? (<>
                <Spacer
                    height={2}
                    width={150}
                    color='lightgray'
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
