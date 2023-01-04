import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function AppButton({ onPress, title , disable,style }) {
  return (
    <TouchableOpacity disabled={disable} onPress={onPress} style={{...styles.appButtonContainer,...style , borderColor : !disable ? "#2296F3" : "#999" , backgroundColor : 'white'}}>
    <Text style={{...styles.appButtonText , color : !disable ? "#2296F3" : "#999"}}>{title}</Text>
  </TouchableOpacity>
  )
}
const styles = StyleSheet.create({

    appButtonContainer: {
        // marginTop : 10,
      elevation: 8,
    //   backgroundColor: "#009688",
    borderWidth : 1,
    borderColor :  '#2296F3',
      borderRadius: 10,
      paddingVertical: 7,
      paddingHorizontal: 12
    },
    appButtonText: {
      fontSize: 16,
      color: "#2296F3",
      fontWeight: "bold",
      alignSelf: "center",
    //   textTransform: "uppercase"
    }
  });