import {View, Text, PermissionsAndroid, StyleSheet, Button, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { useSelector } from 'react-redux';
import { addressStore } from '../Constan/Map';

export default function MapCustomePlace({address}) {
  console.log(address);
  return (
    <View style={styles.container}>
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
           latitude: addressStore.latitude,
           longitude: addressStore.longitude,
           latitudeDelta: 0.015,
           longitudeDelta: 0.0121,
         }}
         title="Cửa hàng HamberGer Chính"
         
       >
        <Image  source={require("../assets/burgerStore.webp")}
    style={{width: 26, height: 28}}
    resizeMode="contain"/>
       </Marker>
       <Marker
         coordinate={{
           latitude: address.latitude,
           longitude: address.longitude,
           latitudeDelta: 0.015,
           longitudeDelta: 0.0121,
         }}
         title="Your Address"
       />
       
     </MapView>
 </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 150,
    left: 10,
    right: 10,
    bottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex : -1
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
