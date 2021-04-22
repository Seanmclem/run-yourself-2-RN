import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { msDifferenceToCounter } from '../../utils/functions';

interface props {
    duration?: number,
}

export const CurrentLapTicker: React.FC<props> = ({ duration }) => {
    return (
        <View style={styles.container}>
            {!!duration && duration > 0 ? (
                <Text style={styles.countText}>
                    { msDifferenceToCounter(duration)}
                </Text>
            ) : (
                <Text style={styles.countText}>
                    00:00
                </Text>
            )}
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
