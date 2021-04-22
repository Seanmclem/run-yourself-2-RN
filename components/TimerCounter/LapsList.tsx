import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { msDifferenceToCounter } from '../../utils/functions';
import { Lap } from './Counter';

interface props {
    laps?: Lap[],
}

export const LapsList: React.FC<props> = ({ laps }) => {
    return (
        <View style={styles.container}>
            {laps ? (
                laps.map((lap, index) => (
                    lap.duration && (
                        <Text key={lap.start} style={styles.lapItem}>
                            Lap {index + 1}: {msDifferenceToCounter(lap.duration)}
                        </Text>
                    )
                ))
            ) : (
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
    lapItem: {
        fontSize: 18,
        marginVertical: 5,
    }
});
