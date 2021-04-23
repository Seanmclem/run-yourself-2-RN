import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { msDifferenceToCounter } from '../../utils/functions';
import { Lap } from './Counter';

interface props {
    laps?: Lap[],
    isDone: boolean,
    overallDuration?: number,
}

export const LapsList: React.FC<props> = ({ laps, isDone, overallDuration }) => {
    return (
        <View style={styles.container}>
            {laps ? ([
                isDone && (
                    <Text key={55} style={styles.item}>
                        Run Summary:
                    </Text>
                ),
                laps.map((lap, index) => (
                    lap.duration && (
                        <Text key={lap.start} style={styles.item}>
                            Lap {index + 1} - {msDifferenceToCounter(lap.duration)}
                        </Text>
                    )
                )),
                (overallDuration && isDone) && (
                    <Text key={overallDuration} style={[styles.item, styles.footer]}>
                        Overall: { msDifferenceToCounter(overallDuration)}
                    </Text>
                )
            ]) : (
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
        borderTopColor: 'grey',
        borderTopWidth: 1,
    }
});
