import { View, Text, Button } from 'react-native'
import React from 'react'
import AppButton from './AppButton'

export default function ItemCalculate() {
  return (
    <View style={{justifyContent : 'space-between' , flexDirection : 'row' , alignItems : 'center' , margin : 5}}>
      <Text>ItemCalculate</Text>
      <View style={{flexDirection : 'row' , alignItems : 'center' , justifyContent : 'space-between' , width : '40%'}}>
        <AppButton title='-'/>
        <Text>1</Text>
        <AppButton title='+'/>
      </View>
    </View>
  )
}