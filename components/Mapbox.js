import { View, Text, PermissionsAndroid, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function Mapbox() {
  // enableLatestRenderer();
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
     <View >
      <Text style={{color : 'black'}}>Mapbox</Text>
      <MapView  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    // provider={PROVIDER_GOOGLE}
  />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });