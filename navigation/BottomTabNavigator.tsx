/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import RunTimerScreen from '../screens/RunTimerScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { BottomTabParamList, RunTimerScreenTabParamList, TabTwoParamList } from '../types';

const BottomTabs = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTabs.Navigator
      initialRouteName="Run Timer"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTabs.Screen
        name="Run Timer"
        component={RunTimerScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTabs.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTabs.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
// const Stack = createStackNavigator<RunTimerScreenTabParamList>();

// function RunTimerScreenTabNavigator() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="RunTimerScreen"
//         component={RunTimerScreen}
//         options={{ headerTitle: 'Run Timer' }}
//       />
//       <Stack.Screen
//         name="c"
//         component={HistoryScreen}
//         options={{ headerTitle: 'Run History' }}
//       />
//     </Stack.Navigator>
//   );
// }
