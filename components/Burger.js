import { View, Text } from 'react-native'
import React from 'react'
import ItemBurger from './ItemBurger'

export default function Burger() {
  return (
    <View style={{justifyContent : 'center' , alignItems : 'center' , marginTop : 50}}>
      <ItemBurger width="80%" backgroundColor="#E79F4D" height={45} borderRadius={10} />
      <ItemBurger width="80%" backgroundColor="#84A165" height={20} borderRadius={10} text="Salad"/>
      <ItemBurger width="80%" backgroundColor="#A06634" height={20} borderRadius={5} text="Bacon"/>
      <ItemBurger width="90%" backgroundColor="#E6C362" height={25} borderRadius={50} text="Cheese"/>
      <ItemBurger width="80%" backgroundColor="#55170A" height={25} borderRadius={50} text="Meat"/>
      <ItemBurger width="80%" backgroundColor="#E79F4D" height={35} borderRadius={10}/>
    </View>
  )
}