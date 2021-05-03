import { Text } from '../components/Themed';
import * as React from 'react';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    milliseconds: {
        color: 'darkgray',
    }
});

export const getNowTimestamp = () => (new Date()).getTime()

export const msDifferenceToCounter = (duration: number, hideMilliseconds?: boolean, hideJSX?: boolean) => {
    let seconds: string | number = Math.floor((duration / 1000) % 60);
    let minutes: string | number = Math.floor((duration / (1000 * 60)) % 60);
    let hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let milliseconds: string | number = parseInt(((duration % 1000) / 10).toString());

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    const hh = hours !== '00' ? `${hours}:` : '';
    const mm = minutes ? `${minutes}:` : ''
    const ss = `${seconds ? `${seconds}` : ''}`;
    const ms = `${!hideMilliseconds ? `:${milliseconds}` : ''}`

    return hideJSX ? `${hh}${mm}${ss}${ms}` : (<Text>{hh}{mm}{ss}<Text style={styles.milliseconds}>{ms}</Text></Text>);

}