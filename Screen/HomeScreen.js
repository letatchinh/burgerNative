
import {View, Text, SafeAreaView, Button} from 'react-native';
import React, { useCallback, useEffect } from 'react';
import Burger from '../components/Burger';
import Calculate from '../components/Calculate';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function HomeScreen({ navigation }) {
  const user = useSelector(state => state.user.user)
  const totalBill = useSelector(state => state.burger.totalBill)
const dispatch =useDispatch()
const _retrieveData = useCallback(async () => {
  try {
    const value = await AsyncStorage.getItem('userBurger');
    if (value !== null) {
      // We have data!!
      dispatch(addUser(JSON.parse(value)))
    }
  } catch (error) {
    // Error retrieving data
  }
},[user])
useEffect(() => {
  _retrieveData()
},[_retrieveData])
  return (
    <SafeAreaView >
  <View style={{justifyContent : 'space-between' , alignItems : 'center' , flexDirection : 'row' , padding : 10}}>
  {user ?  <Button onPress={() => navigation.navigate('YourOrder')} title='Your order'/> : <Button title='Home'/>}
   
    {user ?  <View style={{flexDirection : 'row' , alignItems : 'center'}}>
    <Text>Hello , {user.name}</Text>
    <Button onPress={() => dispatch(removeUser())}  title='Logout'/>
    </View> :  <Button onPress={() => navigation.navigate('Login')}  title='Login'/>}
  </View>
  <View>
    <Burger />
   <View style={{justifyContent : 'center' , alignItems : 'center' , marginTop : 20}}>
   <View style={{flexDirection : 'row' , justifyContent : 'space-between' , alignItems : 'center' , width : '70%' , borderRadius : 10 , borderWidth : 1 , padding : 10}}>
      <Text>Total</Text>
      <Text>{totalBill}$</Text>
    </View>
   </View>
    <Calculate onPress={() => navigation.navigate('ConfirmOrder')}/>
  </View>
  

    </SafeAreaView>
  );
}
