import AsyncStorage from '@react-native-async-storage/async-storage';
import { proxy } from 'valtio'
import { Run } from '../components/TimerCounter/Counter';

interface RunHistory {
    runs: Run[],
    runInProgress?: Run,
}
const runHistory = proxy<RunHistory>({
    runs: [],
    runInProgress: undefined,
})

// need valtio
export interface StoreDataFn {
    newRun?: Run,
    runInProgress?: Run
}
export const storeData = async ({ newRun, runInProgress }: StoreDataFn) => {
    try {
        runHistory.runs = newRun ? [...runHistory.runs, newRun] : runHistory.runs;
        runHistory.runInProgress = runInProgress ? runInProgress : undefined;
        const runHistoryString = JSON.stringify(runHistory)
        await AsyncStorage.setItem('@run_history', runHistoryString)
    } catch (e) {
        console.error(e)
    }
}

export const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@run_history')
        if (value !== null) {
            const newRunHistory: RunHistory = JSON.parse(value);

            runHistory.runs = newRunHistory.runs;
            runHistory.runInProgress = newRunHistory.runInProgress;
        }
    } catch (e) {
        console.error(e)
    }
}
