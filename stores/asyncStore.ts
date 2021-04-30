import AsyncStorage from '@react-native-async-storage/async-storage';
import { proxy } from 'valtio'
import { Run } from '../components/TimerCounter/Counter';

interface RunHistoryStore {
    previousRuns: Run[],
    runInProgress?: Run,
}
export const runHistoryStore = proxy<RunHistoryStore>({
    previousRuns: [],
    runInProgress: undefined,
})


export interface StoreDataFunctionn {
    newRun?: Run,
    runInProgress?: Run,
    clearRun?: boolean
}
export const storeData = async ({ newRun, runInProgress, clearRun }: StoreDataFunctionn) => {
    try {
        runHistoryStore.previousRuns = newRun ? [...runHistoryStore.previousRuns, newRun] : runHistoryStore.previousRuns;
        runHistoryStore.runInProgress = runInProgress ? runInProgress : runHistoryStore.runInProgress
        runHistoryStore.runInProgress = clearRun ? undefined : runHistoryStore.runInProgress;

        debugger;
        const runHistoryString = JSON.stringify(runHistoryStore)
        await AsyncStorage.setItem('@run_history', runHistoryString)
    } catch (e) {
        console.error(e)
    }
}

export const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@run_history')

        if (value !== null) {
            const newRunHistory: RunHistoryStore = JSON.parse(value);

            runHistoryStore.previousRuns = newRunHistory.previousRuns;
            runHistoryStore.runInProgress = newRunHistory.runInProgress;
        }
        return true
    } catch (e) {
        console.error(e)
    }
}

export const reset = () => {
    runHistoryStore.previousRuns = [];
    runHistoryStore.runInProgress = undefined;
}
