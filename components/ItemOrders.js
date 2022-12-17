import { View, Text } from 'react-native'
import React from 'react'

export default function ItemOrders() {
  return (
    <View style={{borderWidth  : 1 ,borderRadius : 10 , padding : 20 , width : '90%' , margin : 10 , justifyContent : 'space-between'}}>
      <View>
      <View style={{justifyContent : 'space-between' , flexDirection : 'row'}}>
        <Text>Salad</Text>
        <Text>1</Text>
      </View>
      <View style={{justifyContent : 'space-between' , flexDirection : 'row'}}>
        <Text>Salad</Text>
        <Text>1</Text>
      </View>
      </View>
      <View style={{justifyContent : 'space-between' , flexDirection : 'row' , marginTop : 40}}>
        <Text>Price</Text>
        <Text>4$</Text>
      </View>
    </View>
  )
}