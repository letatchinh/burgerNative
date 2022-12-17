import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import AppButton from '../components/AppButton'
import ItemOrders from '../components/ItemOrders'

export default function YourOrder() {
  return (
    <SafeAreaView style={{flex : 1}}>
    <ScrollView style={{padding : 10}}>
    <View style={{justifyContent : 'space-between' , alignItems : 'center' , flexDirection : 'row'}}>
      <Text>Orders</Text>
      <AppButton title='Log out'/>
    </View>
    <View style={{justifyContent : 'center' , alignItems : 'center'}}>
        <ItemOrders />
        <ItemOrders />
        <ItemOrders />
        <ItemOrders />
        <ItemOrders />
        <ItemOrders />
    </View>
    </ScrollView>
       
    </SafeAreaView>
  )
}