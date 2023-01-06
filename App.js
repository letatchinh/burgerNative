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
import { Provider, useSelector } from 'react-redux'
import { store } from './redux/store';
import { QueryClient, QueryClientProvider } from 'react-query'
import Register from './Screen/Register';
import { BottomNavigateApp } from './navigator/BottomNavigateApp';
import SearchBoxAddress from './Screen/SearchBoxAddress';
import NavigationContainor from './navigator/NavigationContainor';


const queryClient = new QueryClient()

const App = () => {
  return (
    <>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>

  <NavigationContainor />
  
    </QueryClientProvider>
    </Provider>
    </>
    
  );
};
export default App;
