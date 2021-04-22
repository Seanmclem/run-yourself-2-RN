import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { AppButton } from '../AppButton';

import dayjs from 'dayjs'
import { runOnJS } from 'react-native-reanimated';

// 10 digit timestamp is milliseconds aka unix_timestamp
// 

function msDifferenceToCounter(duration: number) {
    let seconds: string | number = Math.floor((duration / 1000) % 60);
    let minutes: string | number = Math.floor((duration / (1000 * 60)) % 60);
    let hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let milliseconds: string | number = parseInt(((duration % 1000) / 100).toString());

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    return `${hours !== '00' ? `${hours}:` : ''}${minutes ? `${minutes}:` : ''}${seconds && `${seconds}`}`;
    // `${seconds}:`
    //    ${milliseconds.toString()}

}

interface Lap {
    start: number,
    end?: number,
    duration?: number,
    totalDuration?: number, // really?
}

interface Run {
    overallStart: number,
    overallEnd?: number,
    overallDuration?: number;
    laps: Lap[],
    currentLapIndex: number
    // isDone: boolean,
}

export const Counter = () => {
    const [_, setCurrentTime] = useState<number>() // ticker for state updates

    const [run, setRun] = useState<Run>()
    const [diffInterval, setDiffInterval] = useState<any>(undefined)


    const currentLapRef = useRef<Lap>({
        start: 0
    })

    const getNowTimestamp = () => (new Date()).getTime()

    const startTimer = () => {
        const newTime = getNowTimestamp()
        currentLapRef.current = { start: newTime }

        const newRun: Run = {
            overallStart: newTime,
            laps: [],
            currentLapIndex: 0,
        }
        setRun(newRun)

        setDiffInterval(setInterval(looper, 50)) // TODO: make a ref..
    }

    const looper = () => {
        const newTime = getNowTimestamp()

        if (currentLapRef) {
            const originalStart = currentLapRef.current.start;

            currentLapRef.current = {
                start: originalStart,
                duration: newTime - originalStart
            }
        }

        setCurrentTime(newTime)
    }

    const stopTimer = () => {
        endLap()
        currentLapRef.current = {
            start: 0,
            duration: 0,
        }
        clearInterval(diffInterval)
        setDiffInterval(undefined)
        setCurrentTime(undefined)
    }

    const endLap = () => {
        currentLapRef.current = {
            start: currentLapRef.current.start,
            end: getNowTimestamp(),
            duration: currentLapRef.current.duration,
        }
        if (run) {
            const newRun: Run = {
                overallStart: run.overallStart,
                laps: [...run.laps, currentLapRef.current],
                currentLapIndex: run.currentLapIndex + 1,
            }
            setRun(newRun)
        }
    }

    const nextLap = () => {
        endLap()
        currentLapRef.current = {
            start: getNowTimestamp(),
            duration: 0,
        }
    }



    return (
        <View style={styles.container}>
            <Text>
                Counter
            </Text>
            {/* {!!currentLapRef?.current?.difference && currentLapRef.current.difference > 0 && (
                <Text>
                    { currentLapRef?.current?.difference?.toString()}
                </Text>
            )} */}
            {!!currentLapRef?.current?.duration && currentLapRef.current.duration > 0 && (
                <Text>
                    { msDifferenceToCounter(currentLapRef.current.duration)}
                </Text>
            )}

            <View>
                {run?.laps && (
                    run.laps.map(lap => (
                        <Text>
                            {lap.duration}
                        </Text>
                    ))
                )}
            </View>
            <AppButton
                onPress={startTimer}
                title="Start Timer"
            />
            <AppButton
                onPress={stopTimer}
                title="Stop Timer"
            />
            <AppButton
                onPress={nextLap}
                title="LAP"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#2d1584',
    }
});
