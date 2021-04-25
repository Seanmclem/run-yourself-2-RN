import AsyncStorage from '@react-native-async-storage/async-storage';
import { proxy } from 'valtio'
import { Run } from '../components/TimerCounter/Counter';

interface RunHistory {
    runs: Run[],
    runInProgress?: Run,
}
export const runHistory = proxy<RunHistory>({
    runs: [],
    runInProgress: undefined,
})

// need valtio
export interface StoreDataFn {
    newRun?: Run,
    runInProgress?: Run
}
export const storeData = async ({ newRun, runInProgress, clearRun }: StoreDataFn & { clearRun?: boolean }) => {
    try {
        runHistory.runs = newRun ? [...runHistory.runs, newRun] : runHistory.runs;
        runHistory.runInProgress = runInProgress || clearRun ? runInProgress : undefined;

        debugger;
        const runHistoryString = JSON.stringify(runHistory)
        await AsyncStorage.setItem('@run_history', runHistoryString)
    } catch (e) {
        console.error(e)
    }
}

export const getData = async () => {
    debugger
    try {
        const value = await AsyncStorage.getItem('@run_history')
        debugger
        if (value !== null) {
            const newRunHistory: RunHistory = JSON.parse(value);

            runHistory.runs = newRunHistory.runs;
            runHistory.runInProgress = newRunHistory.runInProgress;
        }
        return true
    } catch (e) {
        console.error(e)
    }
}

export const reset = () => {
    runHistory.runs = [];
    runHistory.runInProgress = undefined;
}
