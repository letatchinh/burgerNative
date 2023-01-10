import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import EvilIcons  from 'react-native-vector-icons/EvilIcons';
import Entypo  from 'react-native-vector-icons/Entypo';
import Icon  from 'react-native-vector-icons/AntDesign';
import AppButton from './AppButton';
const IconLocaltion =  <EvilIcons name="location" size={30} color="#1E90FF"/>
const IconCheckcircle=  <Icon name="checkcircle" size={18} color="#1E90FF"/>
const IconDot  = <Entypo name="dot-single" size={18} color="black"/>
export default function ItemOrdersAdmin({orders,navigation}) {
  const {order,address} = orders.item
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  const date = new Date(orders.item.timeStamp)
  let ar = []
  for (const key in order) {
    if(order[key] !== 0 ) ar.push({name : key , value : order[key]}
    )
  }
  return (
    <View style={{ padding : 20 , width : '95%' , margin : 10 , backgroundColor : 'white' }}>
      <View style={styles.flexRow}>
      <Text style={{marginHorizontal : 5}}>{IconCheckcircle}</Text>
      <Text style={{marginLeft: 5}}>Shipped</Text>
      <Text >{IconDot}</Text>
      <Text style={{color : '#999'}}>{`${date.getHours()}:${date.getMinutes()} ${date.getDate()} , ${monthNames[date.getMonth()]}`}</Text>
      </View>
      <View style={{height : 80}}>
      {ar.map((e,i) => 
      <View key={i} style={{justifyContent : 'space-between' , flexDirection : 'row'}}>
        <Text style={{color : 'black'}}>{e.name}</Text>
        <Text style={{color : 'black'}}>x {e.value}</Text>
      </View>)}
      
      </View>
    <View style={styles.flexRow}>
    <Text style={{color  : 'black'}}>{IconLocaltion} </Text>
      <Text style={{color  : 'black'}}>{address.place}</Text>
    </View>
      <View style={{justifyContent : 'space-between' , flexDirection : 'row' , marginTop : 40}}>
        <Text style={{color : 'black'}}>Price</Text>
        <Text style={{color : 'black'}}>{orders.item.price}</Text>
      </View>
<AppButton onPress={() => navigation.navigate("orderDetails",{param : orders.item})} title="Xem thêm"/>
    </View>
  )
}
const styles = StyleSheet.create({
  flexRowBetWeen : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center'
  },
  flexRow:{
    flexDirection : 'row',
    alignItems : 'center',
  }
})