import { View, Text} from 'react-native'
import React, { useCallback, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import {addUser, removeUser} from '../redux/userSlice'
import MyTouchleHightLightButton from '../components/MyTouchleHightLightButton';
import Icon from 'react-native-vector-icons/AntDesign';
const IconLogin =  <Icon name='login'  size={20} color="#1E90FF" />
const IconLogout =  <Icon name='logout'  size={20} color="#1E90FF" />
const IconHome =  <Icon name='home'  size={20} color="#1E90FF" />
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
    {/* {user ?  <MyTouchleHightLightButton onPress={() => navigation.navigate('YourOrder')} title="Your Order"/> : <MyTouchleHightLightButton title={IconHome}/>} */}
    <View></View>
      {user ?  <View style={{flexDirection : 'row' , alignItems : 'center'}}>
      <Text style={{color : 'black'}}>Hello , {user.name}</Text>
      {/* <Button onPress={removeItem}  title='Logout'/> */}
      <MyTouchleHightLightButton onLongPress={removeItem} title={IconLogout}/>
      </View> :  <MyTouchleHightLightButton onPress={() => navigation.navigate('Login')} title={IconLogin}/>}
    </View>
  )
}
