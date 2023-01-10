import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ItemInfoUser({title,value,icon}) {
  return (
    <View>
      <View style={{flexDirection : 'row' , justifyContent : 'space-between' , alignItems : 'center' , margin : 15 , padding : 10  , borderBottomWidth : .2 , borderBottomColor : '#999'}}>
    <View>
      <Text style={{fontWeight : '400'}}>{title}</Text>
      <Text style={{fontWeight : '800'}}>{value}</Text>
    </View>
    <TouchableOpacity>
    <Text>{icon}</Text>
    </TouchableOpacity>
  </View>
  {/* <View style={{flexDirection : 'row'}}>
    <TouchableOpacity>
      <Text>Save</Text>
    </TouchableOpacity>
    <TouchableOpacity>
    <Text>Cancel</Text>
    </TouchableOpacity>
  </View> */}
    </View>
  )
}