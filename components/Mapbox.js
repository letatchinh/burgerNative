import { View, Text, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';

export default function Mapbox() {
    const [info,setInfo] = useState({})
    
    useEffect(() => {
        // Geolocation.requestAuthorization()
        const resquestPermissonLocation = async() => {
            if(Platform.OS === 'ios'){
                Geolocation.getCurrentPosition((info => {
                    const {latitude,longitude} = info.coords
                    setInfo({latitude,longitude})
                }));
              }else{
                try {
                 const granted = await PermissionsAndroid.request(
                   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                   {
                     title: 'Device current location permission',
                     message:
                       'Allow app to get your current location'
                    
                   },
                 );
                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    Geolocation.getCurrentPosition((info => {
                        const {latitude,longitude} = info.coords
                        setInfo({latitude,longitude})
                    }));
                 } else {
                   console.log('Location permission denied');
                 }
               } catch (err) {
                 console.warn(err);
               }
              }
        }
        resquestPermissonLocation()

    },[])
    console.log(info);
  return (
    <View>
      <Text>Mapbox</Text>
    </View>
  )
}