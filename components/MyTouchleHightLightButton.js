import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'

export default function MyTouchleHightLightButton({onLongPress,onPress,title}) {
  return (
    <TouchableHighlight underlayColor="#87CEFA" style={styles.longButton} onPress={onPress}   onLongPress={onLongPress}>
    <View >
      <Text style={{color : "#1E90FF"}}>{title}</Text>
    </View>
  </TouchableHighlight>
  )
}
const styles = StyleSheet.create({
    longButton : {
      borderWidth : 1,
      borderColor : '#1E90FF',
      padding : 10,
      borderRadius : 10,
      marginHorizontal : 10
    }
  })