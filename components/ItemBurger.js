import { View, Text } from 'react-native'
import React from 'react'

export default function ItemBurger({width,backgroundColor,height,borderRadius,text}) {
  return (
    <View style={{width : width , backgroundColor : backgroundColor , height : height , alignItems : 'center' , justifyContent : 'center' , margin : 2 ,borderRadius : borderRadius}}>
      <Text style={{color : 'white'}}>{text}</Text>
    </View>
  )
}