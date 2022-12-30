import { View, Text, ScrollView } from 'react-native'
import React from 'react'

export default function ItemOrders({orders}) {
  const {order} = orders.item
  let ar = []
  for (const key in order) {
    if(order[key] !== 0 ) ar.push({name : key , value : order[key]}
    )
  }
  return (
    <ScrollView style={{borderWidth  : 1 ,borderRadius : 10 , padding : 20 , width : '95%' , margin : 10 }}>
      <View style={{height : 80}}>
      {ar.map((e,i) => 
      <View key={i} style={{justifyContent : 'space-between' , flexDirection : 'row'}}>
        <Text style={{color : 'black'}}>{e.name}</Text>
        <Text style={{color : 'black'}}>{e.value}</Text>
      </View>)}
      
      </View>
      <View style={{justifyContent : 'space-between' , flexDirection : 'row' , marginTop : 40}}>
        <Text style={{color : 'black'}}>Price</Text>
        <Text style={{color : 'black'}}>{orders.item.price}</Text>
      </View>
    </ScrollView>
  )
}