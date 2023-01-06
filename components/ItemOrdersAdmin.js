import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import EvilIcons  from 'react-native-vector-icons/EvilIcons';
import AppButton from './AppButton';
const IconLocaltion =  <EvilIcons name="location" size={30} color="#1E90FF"/>
export default function ItemOrdersAdmin({orders,navigation}) {
  const {order,address} = orders.item
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
      <Text style={{color  : 'black'}}>{IconLocaltion} : {address.place}</Text>
      <View style={{justifyContent : 'space-between' , flexDirection : 'row' , marginTop : 40}}>
        <Text style={{color : 'black'}}>Price</Text>
        <Text style={{color : 'black'}}>{orders.item.price}</Text>
      </View>
      <AppButton onPress={() => navigation.navigate("orderDetails",{param : orders.item})} title="Xem thêm"/>
    </ScrollView>
  )
}