/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import RunTimerScreen from '../screens/RunTimerScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { BottomTabParamList } from '../types';
import { Appbar, Avatar } from 'react-native-paper';
import { TouchableOpacity, Text } from 'react-native';

const Header = ({ scene, previous, navigation }: any) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
        ? options.title
        : scene.route.name;

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

const BottomTabs = createStackNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {

  return (
    <BottomTabs.Navigator
      initialRouteName="Run Timer"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <BottomTabs.Screen
        name="Run Timer"
        component={RunTimerScreen}
        options={{ headerTitle: 'Run Timer' }}
      />
      <BottomTabs.Screen
        name="History"
        component={HistoryScreen}
        options={{ headerTitle: 'History' }}
      />
    </BottomTabs.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
// function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
//   return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
// }

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
