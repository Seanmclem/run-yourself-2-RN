import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { runHistoryStore } from './stores/asyncStore'

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Run } from './components/TimerCounter/Counter';

export default function App() {
  useEffect(() => {
    initStores()
  }, [])

  const initStores = async () => {
    const runInProgress_storage = await AsyncStorage.getItem('@run_in_progress')

    if (runInProgress_storage !== null) {
      const newRunHistory: Run = JSON.parse(runInProgress_storage);

      runHistoryStore.runInProgress = newRunHistory;
    }
  }

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </PaperProvider>
      </SafeAreaProvider>
    );
  }
}
