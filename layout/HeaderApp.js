import { View, Text, Button, TouchableHighlight, StyleSheet } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import {addUser, removeUser} from '../redux/userSlice'

export default function HeaderApp({ navigation }) {
    
    const user = useSelector(state => state.user.user)
const dispatch =useDispatch()
const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('userBurger');
    if (value !== null) {
      dispatch(addUser(JSON.parse(value)))
    }
  } catch (error) {
  }
}
const removeItem = async () => {
  try {
    await AsyncStorage.removeItem('userBurger');
    dispatch(removeUser())
  } catch (error) {
  }
}
useEffect(() => {
  _retrieveData()
},[])

  return (
    <View style={{justifyContent : 'space-between' , alignItems : 'center' , flexDirection : 'row' , padding : 10}}>
    {user ?  <Button onPress={() => navigation.navigate('YourOrder')} title='Your order'/> : <Button title='Home'/>}
      {user ?  <View style={{flexDirection : 'row' , alignItems : 'center'}}>
      <Text style={{color : 'black'}}>Hello , {user.name}</Text>
      {/* <Button onPress={removeItem}  title='Logout'/> */}
      <TouchableHighlight underlayColor="#87CEFA" style={styles.longButton}   onLongPress={removeItem}>
          <View >
            <Text style={{color : "#1E90FF"}}>Log Out</Text>
          </View>
        </TouchableHighlight>
      </View> :  <Button onPress={() => navigation.navigate('Login')}  title='Login'/>}
    </View>
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