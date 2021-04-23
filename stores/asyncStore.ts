import AsyncStorage from '@react-native-async-storage/async-storage';
import { Run } from '../components/TimerCounter/Counter';

let runHistory: Run[] = []

export const storeData = async (newRun: Run) => {
    try {
        const runHistoryString = JSON.stringify([...runHistory, newRun])
        await AsyncStorage.setItem('@run_history', runHistoryString)
    } catch (e) {
        console.error(e)
    }
}

export const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@run_history')
        if (value !== null) {
            const parsed = JSON.parse(value);
            const newRunHistory = parsed?.length ? parsed : [];
            runHistory = [...newRunHistory]
            return runHistory
        }
    } catch (e) {
        console.error(e)
    }
}
