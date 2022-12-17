import { View, Text, Button } from 'react-native'
import React from 'react'
import ItemCalculate from './ItemCalculate'
import AppButton from './AppButton'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function Calculate({onPress}) {
  return (
    <View style={{justifyContent : 'center' , alignItems : 'center' , marginTop : 70}}>
      <View style={{width : '70%',borderWidth : 1 , padding : 5 , marginBottom : 10 ,borderRadius : 10}}>
      <ItemCalculate />
      <ItemCalculate />
      <ItemCalculate />
      <ItemCalculate />
      </View>
      {/* <Button title='Check out'/> */}
      <AppButton title="Check out" onPress={onPress}/>
    </View>
  )
}