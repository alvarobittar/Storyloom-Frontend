import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import WelcomeScreen from './WelcomeScreen';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import WatchScreen from './watchscreen';
import SerchScreen from './SerchScreen';
import MovieScreen from './moviescreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SerchScreen} />
      <Tab.Screen name="Watch" component={WatchScreen} />
      <Tab.Screen name="Register" component={RegisterScreen} />
    </Tab.Navigator>
  );
}

export default function MainScreen({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Main" component={MainTabs} options={{title: 'STORYLOOM'}} />
        <Stack.Screen name="SerchScreen" component={SerchScreen} />
        <Stack.Screen name="MovieScreen" component={MovieScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}