/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

// import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import RunTimerScreen from '../screens/RunTimerScreen';
import HistoryScreen from '../screens/HistoryScreen';
// import { BottomTabParamList } from '../types';
import { Appbar, Avatar } from 'react-native-paper';

// import { TouchableOpacity, Text } from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();


export const Header = ({ scene, previous, navigation }: any) => {
  const { options } = scene.descriptor;
  // const title =
  //   options.headerTitle !== undefined
  //     ? options.headerTitle
  //     : options.title !== undefined
  //       ? options.title
  //       : scene.route.name;

  return (
    <Appbar.Header theme={{ colors: { primary: 'purple' } }}>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.pop}
          color={'white'}
        />
      ) : (null
        // <Text>
        //   {scene.route}
        // </Text>
        // <TouchableOpacity
        //   onPress={() => {
        //     navigation.openDrawer();
        //   }}
        // >
        //   <Avatar.Image
        //     size={40}
        //     source={{
        //       uri:
        //         'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
        //     }}
        //   />
        // </TouchableOpacity>
      )}
      {/* <Appbar.Content
        title={
          previous ? title : <MaterialCommunityIcons name="twitter" size={40} />
        }
      /> */}
    </Appbar.Header>
  );
};

// const Stack = createStackNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {

  return ( //replace contents with myTabs contents
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
    // <Stack.Navigator
    //   initialRouteName="Run Timer"
    //   headerMode="screen"
    //   screenOptions={{
    //     header: ({ scene, previous, navigation }) => (
    //       <Header scene={scene} previous={previous} navigation={navigation} />
    //     ),
    //   }}
    // >
    //   <Stack.Screen
    //     name="Run Timer"
    //     component={RunTimerScreen}
    //     options={{ headerTitle: 'Run Timer' }}
    //   />
    //   <Stack.Screen
    //     name="History"
    //     component={HistoryScreen}
    //     options={{ headerTitle: 'History' }}
    //   />
    // </Stack.Navigator>
  );
}
