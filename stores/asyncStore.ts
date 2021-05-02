import { proxy } from 'valtio'
import { Run } from '../components/TimerCounter/Counter';

interface RunHistoryStore {
    run_history: Run[],
    runInProgress?: Run,
}
export const runHistoryStore = proxy<RunHistoryStore>({
    run_history: [],
    runInProgress: undefined,
})
