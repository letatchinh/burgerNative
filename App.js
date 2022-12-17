import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
/* eslint-disable */


import { NavigationContainer } from '@react-navigation/native';

import React from 'react';

import HomeScreen from './Screen/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Screen/Login';
import YourOrder from './Screen/YourOrder';
import ConfirmOrder from './Screen/ConfirmOrder';
const Stack = createStackNavigator();

const App = () => {
  return (
    <>
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="YourOrder"
        component={YourOrder}
        options={{
          title: 'YourOrder',
        }}
      />
      <Stack.Screen
        name="ConfirmOrder"
        component={ConfirmOrder}
        options={{
          title: 'ConfirmOrder',
        }}
      />
    </Stack.Navigator>
    {/* {<Login />} */}
    </NavigationContainer>
    </>
  );
};
export default App;
