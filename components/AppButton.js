import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function AppButton({ onPress, title , disable,style , backgroundColor , colorText,icon }) {
  return (
    <TouchableOpacity activeOpacity={0.5} disabled={disable} onPress={onPress} style={{...styles.appButtonContainer,...style , borderColor : !disable ? "#2296F3" : "#999" , backgroundColor : backgroundColor ? backgroundColor : 'white' , borderColor :  backgroundColor ? backgroundColor :  '#2296F3',}}>
    <Text style={{...styles.appButtonText , color : !disable ? colorText ? colorText : "#2296F3" : "#999"}}>{title} {icon}</Text>
  </TouchableOpacity>
  )
}
const styles = StyleSheet.create({

    appButtonContainer: {
        // marginTop : 10,
      elevation: 8,
    //   backgroundColor: "#009688",
    borderWidth : 1,
   
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