import {View, Text, PermissionsAndroid, StyleSheet, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { useSelector } from 'react-redux';

export default function Mapbox() {
  const address = useSelector(state => state.user.address.latLong) || {}
  const permission = useSelector(state => state.user.address.permission)  || ""
  // const [state, setState] = useState(false);
  // const resquestPermissonLocation = async () => {
  //   if (Platform.OS === 'ios') {
  //     Geolocation.getCurrentPosition(info => {
  //       const {latitude, longitude} = info.coords;
  //     });
  //   } else {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         {
  //           title: 'Device current location permission',
  //           message: 'Allow app to get your current location',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         Geolocation.getCurrentPosition(info => {
  //           const {latitude, longitude} = info.coords;
  //         });
  //       } else {
  //         console.log('Location permission denied');
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   // Geolocation.requestAuthorization()

  //   resquestPermissonLocation();
  // }, []);
  return (
    permission && <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE}
       style={styles.map}
       region={{
         latitude: address.latitude,
         longitude: address.longitude,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}>
       <Marker
         coordinate={{
           latitude: address.latitude,
           longitude: address.longitude,
           latitudeDelta: 0.015,
           longitudeDelta: 0.0121,
         }}
       />
     </MapView>
 </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
