import { View, Text, PermissionsAndroid, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';

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
     <View >
      <Text style={{color : 'black'}}>Mapbox</Text>
      <MapView style={{flex : 1}}
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
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",

  },
  myMap: {
    flex: 2,
    backgroundColor: "black",
    width: "100%",
    marginTop: 30,
    marginBottom: 30,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});