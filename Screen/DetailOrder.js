import { View, Text } from 'react-native'
import React from 'react'
import MapItemOrderAdmin from '../components/MapItemOrderAdmin';

export default function DetailOrder({route}) {
  return (
    <View style={{flex : 1}}>
        <MapItemOrderAdmin addressUser={route.params.param}/>
     </View>
  )
}