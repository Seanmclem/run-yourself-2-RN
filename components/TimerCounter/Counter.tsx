import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { AppButton } from '../AppButton';

import dayjs from 'dayjs'

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

const getMllisecondsFromDate = (newDate: Date) => newDate.getTime()

interface DateTimeDiff {
    start: number,
    end?: number,
    difference?: number,
}

interface Lap {
    dateTimeDiff: DateTimeDiff[],
}

interface Run {
    laps: Lap[],
    // isDone: boolean,
}

export const Counter = () => {
    // const [times, setTimes] = useState<DateTimeDiff[]>([])
    const [currentTime, setCurrentTime] = useState<number>()

    const [runningTotal, setRunningTotal] = useState<number>(0)

    const [diffInterval, setDiffInterval] = useState<any>(undefined)
    // const [currentTicker, setCurrentTicker] = useState<{
    //     time: number,
    //     diff: number
    // }>({
    //     time: 0,
    //     diff: 0
    // })

    const hat = useRef<DateTimeDiff>({
        start: 0
    })


    const startTimer = () => {
        setDiffInterval(setInterval(looper, 50))
    }

    const looper = () => {
        const newTime = (new Date()).getTime()

        console.log('ran', {
            ...hat.current,
        })

        if (hat) {
            const newStart = hat.current.start || newTime;

            hat.current = {
                start: newStart,
                difference: newTime - newStart
            }
        }

        setCurrentTime(newTime)

        // setTimeDiff({
        //     start: origStart > 0 ? origStart : newTime,
        //     difference: newTime - (timeDiff.start)
        // })
    }

    const stopTimer = () => {
        if (true) {
            hat.current = { start: 0 }
            clearInterval(diffInterval)
            setDiffInterval(undefined)
            setCurrentTime(undefined)
            // setTimeDiff({
            //     start: timeDiff.start,
            //     end: currentTicker.time,
            //     difference: currentTicker.diff,
            // })

            //setTimeDiff(undefined) // REMOVE
        }
    }



    return (
        <View style={styles.container}>
            <Text>
                Counter
            </Text>
            {/* {!!hat?.current?.difference && hat.current.difference > 0 && (
                <Text>
                    { hat?.current?.difference?.toString()}
                </Text>
            )} */}
            {!!hat?.current?.difference && hat.current.difference > 0 && (
                <Text>
                    { msDifferenceToCounter(hat.current.difference)}
                </Text>
            )}
            {/* {timeDiff?.difference && timeDiff.difference > 0 && (
                <Text>
                    ticker { timeDiff.difference}
                </Text>
            )} */}
            {/* {timeDiff?.end && (
                <Text>
                    { timeDiff.end.toString()}
                </Text>
            )} */}
            {/* {timeDiff?.difference && timeDiff.difference > 0 && (
                <Text>
                    ticker { timeDiff.difference}
                </Text>
            )} */}
            <AppButton
                onPress={startTimer}
                title="Start Timer"
            />
            <AppButton
                onPress={stopTimer}
                title="Stop Timer"
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
