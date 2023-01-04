import { View, Text, TouchableOpacity} from 'react-native'
import React, { useCallback, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import {addUser, removeUser} from '../redux/userSlice'
import MyTouchleHightLightButton from '../components/MyTouchleHightLightButton';
import Icon from 'react-native-vector-icons/AntDesign';
import EvilIcons  from 'react-native-vector-icons/EvilIcons';
const IconLogin =  <Icon name='login'  size={20} color="#1E90FF" />
const IconLogout =  <Icon name='logout'  size={20} color="#1E90FF" />
const IconHome =  <Icon name='home'  size={20} color="#1E90FF" />
const IconLocaltion =  <EvilIcons name="location" size={22} color="#1E90FF"/>
export default function HeaderApp({ navigation }) {
  const address = useSelector(state => state.user.address) || ""
    
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
    <TouchableOpacity onPress={() => navigation.navigate("SearchAddress")} style={{maxWidth : '60%' , flexDirection : 'row' , alignItems : 'center'}}>
      <Text><EvilIcons name="location" size={22} color="#1E90FF"/></Text>
           <Text numberOfLines={1} style={{color : 'black' , fontWeight : '700'}}>  {address.place || ""}</Text>
    </TouchableOpacity>
      {user ?  <View style={{flexDirection : 'row' , alignItems : 'center'}}>
      <Text style={{color : 'black'}}>Hello , {user.name}</Text>
      <MyTouchleHightLightButton onLongPress={removeItem} title={IconLogout}/>
      </View> :  <MyTouchleHightLightButton onPress={() => navigation.navigate('Login')} title={IconLogin}/>}
    </View>
  )
}
