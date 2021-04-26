/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RunTimerScreen from '../screens/RunTimerScreen';
import HistoryScreen from '../screens/HistoryScreen';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator() {

  return (
    <Tab.Navigator
      initialRouteName="Run Timer"
      activeColor="#FFF"
      // labelStyle={{ fontSize: 12 }}
      // style={{ backgroundColor: 'tomato' }}
      shifting={true}
    >
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Run Timer"
        component={RunTimerScreen}
        options={{
          tabBarLabel: 'Running',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="clock" color={color} size={26} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}
