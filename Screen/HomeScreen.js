
import {View, Text, SafeAreaView, Alert, Image, StyleSheet} from 'react-native';
import React, { useCallback, useEffect } from 'react';
import Burger from '../components/Burger';
import Calculate from '../components/Calculate';
import {  useSelector } from 'react-redux';
import HeaderApp from '../layout/HeaderApp';
import messaging from '@react-native-firebase/messaging';
import Mapbox from '../components/Mapbox';
// import Geolocation from '@react-native-community/geolocation';

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
  console.log("remoteMess",remoteMess);
 })
 messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
 const unsubcribe = messaging().onMessage(async (mess) => {
  console.log("FOREGROUND",mess);
  Alert.alert(mess.notification.body,mess.notification.title)
 })
 return unsubcribe
 
}
handleRequest()
// Geolocation.getCurrentPosition((info => console.log(info)));


  },[])
     
  return (
    <SafeAreaView >
    <HeaderApp navigation={navigation}/>
  <View>
    {/* <Burger /> */}
    <View style={{padding : 5 }}>
    <Image style={styles.imageBurger} source={require('../assets/All-American-Hamburgers_EXPS_CWAS22_29321_P2_MD_04_19_1b_v2.jpeg')}/>
    </View>
   <View style={{justifyContent : 'center' , alignItems : 'center' , marginTop : 20}}>
   <View style={{flexDirection : 'row' , justifyContent : 'space-between' , alignItems : 'center' , width : '70%' , borderRadius : 10 , borderWidth : 1 , padding : 10}}>
      <Text style={{color : 'black'}}>Total</Text>
      <Text style={{color : 'black'}}>{totalBill}$</Text>
    </View>
   </View>
    <Calculate/>
  </View>
  {/* <Mapbox /> */}

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  imageBurger : {
    width : 400,
    height : 400,
  }
})