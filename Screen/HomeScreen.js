
import {View, Text, SafeAreaView, Alert} from 'react-native';
import React, { useCallback, useEffect } from 'react';
import Burger from '../components/Burger';
import Calculate from '../components/Calculate';
import {  useSelector } from 'react-redux';
import HeaderApp from '../layout/HeaderApp';
import messaging from '@react-native-firebase/messaging';

export default function HomeScreen({ navigation }) {
  const totalBill = useSelector(state => state.burger.totalBill)

  
  async function getToken(){
    const token = await messaging().getToken()
    console.log(token,"token")
  }
  useEffect(() => {
    async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    
  }
  else{
    console.log(enabled);
  }
}
const handleRequest = async() => {
 await requestUserPermission()
 await getToken()
 messaging().onNotificationOpenedApp(remoteMess => {
  Alert.alert("Open")
  console.log("Open")
 })
 const unsubcribe = messaging().onMessage(async (mess) => {
  console.log("FOREGROUND",mess);
  Alert.alert("NOTIFY Foreground")
 })
 return unsubcribe
}
handleRequest()
  },[])
     
  return (
    <SafeAreaView >
    <HeaderApp navigation={navigation}/>
  <View>
    <Burger />
   <View style={{justifyContent : 'center' , alignItems : 'center' , marginTop : 20}}>
   <View style={{flexDirection : 'row' , justifyContent : 'space-between' , alignItems : 'center' , width : '70%' , borderRadius : 10 , borderWidth : 1 , padding : 10}}>
      <Text style={{color : 'black'}}>Total</Text>
      <Text style={{color : 'black'}}>{totalBill}$</Text>
    </View>
   </View>
    <Calculate onPress={() => navigation.navigate('ConfirmOrder')}/>
  </View>
  

    </SafeAreaView>
  );
}
