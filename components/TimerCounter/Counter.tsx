import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { ButtonArea } from './ButtonArea'
import { CurrentLapTicker } from './CurrentLapTicker';
import { LapsList } from './LapsList';

// 10 digit timestamp is milliseconds aka unix_timestamp
// 

import { storeData } from '../../stores/asyncStore'

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
    currentLapIndex: number
    isDone: boolean,
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
            isDone: false
        }
        setRun(newRun)

        setDiffInterval(setInterval(looper, 50)) // TODO: make a ref..
    }

    const looper = () => {
        const newTime = getNowTimestamp()

        if (currentLapRef) {
            const originalStart = currentLapRef.current.start;
            const newDuration = newTime - originalStart;

            currentLapRef.current = {
                start: originalStart,
                duration: newDuration,
            }
        }

        setCurrentTime(newTime)
    }

    const stopTimer = () => {
        const newRun = endLap(true)
        if (newRun) {
            storeData({ newRun })
        }

        currentLapRef.current = {
            start: 0,
            duration: 0,
        }
        clearInterval(diffInterval)
        setDiffInterval(undefined)
        setCurrentTime(undefined)
    }

    const endLap = (theEnd?: boolean) => {
        currentLapRef.current = {
            start: currentLapRef.current.start,
            end: getNowTimestamp(),
            duration: currentLapRef.current.duration,
        }
        debugger
        if (run) {
            const laps = [...run.laps, currentLapRef.current]
            const overallDuration = laps.reduce((prev, curr) => prev + (curr.duration || 0), 0)

            const newRun: Run = {
                overallStart: run.overallStart,
                laps,
                currentLapIndex: run.currentLapIndex + 1,
                overallDuration,
                isDone: !!theEnd,
            }
            // ^here, need to save this^ to state-mgr/local-storage/db

            console.log({ overallDuration })
            setRun(newRun)

            return newRun
        }
    }

    const nextLap = () => {
        endLap()
        currentLapRef.current = {
            start: getNowTimestamp(),
            duration: 0,
        }
    }

    const isRunning = !(currentLapRef?.current?.start === 0)
    const overallDuration = (run?.overallDuration || 0) + (currentLapRef?.current?.duration || 0)

    console.log({ overallDuration })

    return (
        <View style={styles.container}>
            <CurrentLapTicker
                duration={currentLapRef?.current?.duration}
                overallDuration={overallDuration}
                isFirstLap={!!run?.laps?.length}
            />

            <LapsList
                laps={run?.laps}
                isDone={!!run?.isDone}
                overallDuration={run?.overallDuration}
            />

            <ButtonArea
                isRunning={isRunning}
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
