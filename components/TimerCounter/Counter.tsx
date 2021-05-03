import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { runHistoryStore } from '../../stores/asyncStore'

import { View } from '../../components/Themed';
import { ButtonArea } from './ButtonArea'
import { CurrentLapTicker } from './CurrentLapTicker';
import { LapsList } from './LapsList';


// 10 digit timestamp is milliseconds aka unix_timestamp
// 

import { Spacer } from '../Spacer';
import { getNowTimestamp } from '../../utils/functions';
import { RUN_HISTORY, RUN_IN_PROGRESS } from '../../conts_types_etc/constants';

export interface Lap {
    start: number,
    end?: number,
    duration?: number,
}

export interface Run {
    overallStart: number,
    overallEnd?: number,
    laps: Lap[],
    currentLapIndex?: number //remove me, use last lap duh wtf
}

export const Counter = () => {
    useEffect(() => {
        initRunInProgress()
    }, [])

    const initRunInProgress = async () => {
        const runInProgress_storage = await AsyncStorage.getItem(RUN_IN_PROGRESS)

        if (runInProgress_storage !== null) {
            const newRunHistory: Run = JSON.parse(runInProgress_storage);
            runHistoryStore.runInProgress = newRunHistory;
            const lastLap = runHistoryStore.runInProgress?.laps[runHistoryStore.runInProgress.laps.length - 1]
            const completed = !!(lastLap && lastLap?.duration)
            const isResuming = true

            startTimer({ isResuming, completed })
        }
    }


    const [_, setCurrentTime] = useState<number>() // ticker for state updates
    const [diffInterval, setDiffInterval] = useState<any>(undefined)

    interface IStartTimerFn { isResuming?: boolean, completed?: boolean }
    const startTimer = ({ isResuming, completed }: IStartTimerFn) => {
        const isNewRun = isResuming !== true; //

        if (isNewRun) {
            const newTime = getNowTimestamp()
            const firstLap = { start: newTime }

            runHistoryStore.runInProgress = {
                overallStart: newTime,
                laps: [firstLap],
            }
            AsyncStorage.setItem(RUN_IN_PROGRESS, JSON.stringify(runHistoryStore.runInProgress))
        }

        !completed && setDiffInterval(setInterval(looper, 50)) // TODO: make a ref..
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
            AsyncStorage.setItem(RUN_IN_PROGRESS, JSON.stringify(runHistoryStore.runInProgress))
        }
    }

    const nextLap = () => {
        completeLap()
        startNewLap()
    }

    const completeRun = () => {
        clearInterval(diffInterval)
        setDiffInterval(undefined)
        setCurrentTime(undefined)
        AsyncStorage.setItem(RUN_IN_PROGRESS, JSON.stringify(runHistoryStore.runInProgress))
        runHistoryStore.runInProgress && (runHistoryStore.run_history = [...(runHistoryStore.run_history || []), runHistoryStore.runInProgress])
        AsyncStorage.setItem(RUN_HISTORY, JSON.stringify(runHistoryStore.run_history))
    }

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
