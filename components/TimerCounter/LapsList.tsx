import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { msDifferenceToCounter } from '../../utils/functions';
import { Spacer } from '../Spacer';
import { Lap } from './Counter';

interface props {
    laps?: Lap[],
    isDone: boolean,
    overallDuration?: number,
}

export const LapsList: React.FC<props> = ({ laps, isDone, overallDuration }) => {
    return (
        <View style={styles.container}>
            {laps ? (<>
                {isDone && (<>
                    <Text style={styles.item}>
                        Run Summary:
                    </Text>
                    <Spacer
                        height={2}
                        width='100%'
                        color='gray'
                    />
                </>)}
                {laps.map((lap, index) => (
                    lap.duration && (
                        <Text key={lap.start} style={styles.item}>
                            Lap {index + 1} - {msDifferenceToCounter(lap.duration)}
                        </Text>
                    )
                ))}
                {(overallDuration && isDone) && (<>
                    <Spacer
                        height={2}
                        width='100%'
                        color='gray'
                    />
                    <Text style={[styles.item]}>
                        Overall: {msDifferenceToCounter(overallDuration)}
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
