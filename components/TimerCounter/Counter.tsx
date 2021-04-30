import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { runHistoryStore } from '../../stores/asyncStore'

import { View } from '../../components/Themed';
import { ButtonArea } from './ButtonArea'
import { CurrentLapTicker } from './CurrentLapTicker';
import { LapsList } from './LapsList';

// 10 digit timestamp is milliseconds aka unix_timestamp
// 

import { Spacer } from '../Spacer';

export interface Lap {
    start: number,
    end?: number,
    duration?: number,
}

export interface Run {
    overallStart: number,
    overallEnd?: number,
    overallDuration?: number;
    laps: Lap[],
    currentLapIndex?: number //remove me, use last lap duh wtf
    isDone: boolean,
}

export const Counter = () => {
    const [_, setCurrentTime] = useState<number>() // ticker for state updates
    const [diffInterval, setDiffInterval] = useState<any>(undefined)

    const getNowTimestamp = () => (new Date()).getTime()

    const startTimer = (resume?: boolean) => {
        const resumingRunInProgress = resume === true;

        if (!resumingRunInProgress) {
            const newTime = getNowTimestamp()
            const firstLap = { start: newTime }

            runHistoryStore.runInProgress = {
                overallStart: newTime,
                laps: [firstLap],
                isDone: false
            }
        } else {
            //to do: something else?
        }

        setDiffInterval(setInterval(looper, 50)) // TODO: make a ref..
    }

    const looper = () => {
        const newTime = getNowTimestamp()
        setCurrentTime(newTime)
    }

    const stopTimer = () => {
        completeLap()
        completeRun()
    }

    const completeLap = () => {
        if (runHistoryStore.runInProgress) {
            const lastLapIndex = runHistoryStore.runInProgress.laps.length - 1; //NEED to use SNAPSHOT?
            const finalLap = runHistoryStore.runInProgress.laps[lastLapIndex]
            const endTime = getNowTimestamp();

            const completedLap = {
                start: finalLap.start,
                end: endTime,
                duration: endTime - finalLap.start, // maybe just use a function prototype instead... like a class but a function
            }

            runHistoryStore.runInProgress.laps[lastLapIndex] = completedLap;
        }
    }

    const startNewLap = () => {
        if (runHistoryStore.runInProgress) {
            const newLap = {
                start: getNowTimestamp(),
            }
            const existingLaps = runHistoryStore.runInProgress.laps;
            runHistoryStore.runInProgress.laps = [...existingLaps, newLap];
        }
    }

    const completeRun = () => {
        clearInterval(diffInterval)
        setDiffInterval(undefined)
        setCurrentTime(undefined) // also for runInProgress !!boolean
    }

    const nextLap = () => {
        completeLap()
        startNewLap()
    }


    // const isRunning = !!runHistoryStore.runInProgress?.laps[runHistoryStore.runInProgress.laps.length - 1].duration
    // const overallDuration = (run?.overallDuration || 0) + (currentLapRef?.current?.duration || 0)

    return (
        <View style={styles.container}>
            <Spacer
                height={50}
                width={'100%'}
            />

            <CurrentLapTicker />

            <LapsList />

            <ButtonArea
                startTimer={startTimer}
                nextLap={nextLap}
                stopTimer={stopTimer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
