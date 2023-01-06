import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigateApp } from './BottomNavigateApp';
import Login from '../Screen/Login';
import Register from '../Screen/Register';
import ConfirmOrder from '../Screen/ConfirmOrder';
import SearchBoxAddress from '../Screen/SearchBoxAddress';
import { useSelector } from 'react-redux';
import HomeScreen from '../Screen/HomeScreen';
import DetailOrder from '../Screen/DetailOrder';
import SearchAddress from '../Screen/SearchAddress';
const Stack = createStackNavigator();
export default function NavigationContainor() {
    const user = useSelector(state => state.user.user)
    console.log(user,"user");
  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={user ? BottomNavigateApp : HomeScreen}
        options={{
          title: 'Home',
          headerShown : false
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
        name="Register"
        component={Register}
        options={{
          title: 'Register',
        }}
      />
      {/* <Stack.Screen
        name="YourOrder"
        component={YourOrder}
        options={{
          title: 'YourOrder',
        }}
      /> */}
      <Stack.Screen
        name="ConfirmOrder"
        component={ConfirmOrder}
        options={{
          title: 'ConfirmOrder',
        }}
      />
      <Stack.Screen
        name="SearchAddress"
        component={SearchAddress}
        options={{
          headerStyle: {
            backgroundColor: '#30BB6F',
          },
          headerTintColor: '#999',
          headerTitleStyle: {
             textAlign  : 'center'
          },
          title : ""
        }}
      />
      <Stack.Screen
        name="enterAddress"
        component={SearchBoxAddress}
        options={{
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#999',
          headerTitleStyle: {
             textAlign  : 'center'
          },
          title: 'Nhập Địa chỉ',
        }}
      />
      <Stack.Screen
        name="orderDetails"
        component={DetailOrder}
        options={{
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#999',
          headerTitleStyle: {
             textAlign  : 'center'
          },
        }}
      />
    </Stack.Navigator>
    {/* {<Login />} */}
    </NavigationContainer>
  )
}