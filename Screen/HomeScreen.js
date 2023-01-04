
import {View, Text, SafeAreaView, Alert, Image, StyleSheet, ScrollView, PermissionsAndroid} from 'react-native';
import React, {  useEffect, useState } from 'react';
import Calculate from '../components/Calculate';
import {  useDispatch, useSelector } from 'react-redux';
import HeaderApp from '../layout/HeaderApp';
import messaging from '@react-native-firebase/messaging';
import { addAddress, addToken } from '../redux/userSlice';
import Geolocation from '@react-native-community/geolocation';
import axiosClient from '../Constan/AxiosConfig';
import ModalConfirmOrder from '../components/ModalConfirmOrder';
// import Geolocation from '@react-native-community/geolocation';
export default function HomeScreen({ navigation }) {
  const totalBill = useSelector(state => state.burger.totalBill)
  const dispatch = useDispatch()
  async function getToken(){
    const token = await messaging().getToken()
    dispatch(addToken(token))
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
const resquestPermissonLocation = async () => {
  if (Platform.OS === 'ios') {
    Geolocation.getCurrentPosition(async(info) => {
      const {latitude, longitude} = info.coords;
      const res = await axiosClient.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAqT8WYorXQrrDXxg2WzqLAEScpB0ZZgwc`)
      dispatch(addAddress({latLong : {latitude, longitude} , place : res.data.results[0].formatted_address}))
    });
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Device current location permission',
          message: 'Allow app to get your current location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(async(info) => {
          const {latitude, longitude} = info.coords;
          const res = await axiosClient.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAqT8WYorXQrrDXxg2WzqLAEScpB0ZZgwc`)
          dispatch(addAddress({latLong : {latitude, longitude} , place : res.data.results[0].formatted_address , permission : true}))
        });
      } else {
        console.log('Location permission denied');
        dispatch(addAddress({permission : false}))

      }
    } catch (err) {
      console.warn(err);
    }
  }
};
resquestPermissonLocation()
  },[])
     
  return (
    <SafeAreaView >
    <ScrollView>
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
    <Calculate navigation={navigation}/>
  </View>
    </ScrollView>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  imageBurger : {
    width : 400,
    height : 400,
  }
})