import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {addressStore} from '../Constan/Map';
import MapViewDirections from 'react-native-maps-directions';
import {KEY_API_GOOGLE_MAP} from '@env';
import axiosClient from '../Constan/AxiosConfig';
import AppButton from './AppButton';
import { useDispatch } from 'react-redux';
import { addAddressUserSelect } from '../redux/userSlice';
export default function MapCustomePlace({address}) {
  const dispatch = useDispatch()
  const origin = {
    latitude: addressStore.latitude,
    longitude: addressStore.longitude,
  };
  const mapRef = useRef(null);
  const [statusTitleAddress, setStatusTitleAddress] = useState(true);
  const [destination, setDestination] = useState(address);
  const [AddressChange, setAddressChange] = useState(address);
  const [distanceAndDuration, setDistanceAndDuration] = useState(null);
  useEffect(() => {
    setAddressChange(address)
    setDestination(address);
  },[address])
  const handleChanges = async() => {

    setStatusTitleAddress(true)
    const res = await axiosClient.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${AddressChange.latitude},${AddressChange.longitude}&key=${KEY_API_GOOGLE_MAP}`)
    dispatch(addAddressUserSelect({location : res.data.results[0].geometry.location , place : res.data.results[0].formatted_address}))
  }
  return (
    <View style={styles.container}>
   {  address &&  <MapView ref={mapRef}
        onRegionChange={region => {
          if(timeout){
            clearTimeout(timeout)
          }
            const timeout = setTimeout(() => {
              console.log(region)
              setAddressChange(region)
            setStatusTitleAddress(false)
            },500)

        }}
        // showsMyLocationButton={false}
        loadingEnabled={true}
        
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={styles.map}
        region={{
          latitude: address.latitude,
          longitude: address.longitude,
          latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
        }}>
        <MapViewDirections
          origin={origin}
          destination={destination || {longitude : 0 ,latitude : 0}}
          apikey={KEY_API_GOOGLE_MAP}
          strokeColor="red"
          strokeWidth={5}
          onReady={result => {
            setDistanceAndDuration({
              distance: result.distance,
              duration: result.duration,
            });
          }}
          onStart={params => {
            console.log(
              `Started routing between "${params.origin}" and "${params.destination}"`,
            );
          }}
        />
     {distanceAndDuration &&    <Marker key="end"   title={`You Here`} style={{alignItems: 'center'}} coordinate={AddressChange}>
       {statusTitleAddress &&  <Text
              style={{
                color: 'black',
                fontWeight: '700',
                backgroundColor: 'white',
                padding: 10,
              }}>
              {distanceAndDuration.distance.toFixed(1)} km
            </Text>}
           {statusTitleAddress &&  <Text
              style={{color: 'black', padding: 5, backgroundColor: 'white'}}>
              {distanceAndDuration.duration.toFixed(0)} min
            </Text>}
            <Image
              source={require('../assets/markerDrag.png')}
              style={{width: 30, height: 30}}
              resizeMode="contain"
            />
        </Marker> }
        <Marker key="store"
          coordinate={{
            latitude: addressStore.latitude,
            longitude: addressStore.longitude,
            
          }}
          title="Cửa hàng HamberGer Chính">
          <Image
            source={require('../assets/burgerStore.webp')}
            style={{width: 26, height: 28}}
            resizeMode="contain"
          />
        </Marker>
        {/* {distanceAndDuration && (
          <Marker
            style={{alignItems: 'center'}}
            // draggable
            coordinate={{
              latitude: addressInput.latitude,
              longitude: addressInput.longitude,
            }}
            // onDragEnd={e => {
            //   setAddressInput(e.nativeEvent.coordinate);
            // }}
            title={`You Here`}
            >
            <Text
              style={{
                color: 'black',
                fontWeight: '700',
                backgroundColor: 'white',
                padding: 10,
              }}>
              {distanceAndDuration.distance.toFixed(1)} km
            </Text>
            <Text
              style={{color: 'black', padding: 5, backgroundColor: 'white'}}>
              {distanceAndDuration.duration.toFixed(0)} min
            </Text>
            <Image
              source={require('../assets/userMerker.png')}
              style={{width: 26, height: 28}}
              resizeMode="contain"
            />
          </Marker>
         
        )} */}
      </MapView>}
      <AppButton  onPress={() => {
            handleChanges()
      }} title="Ok"/>
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
    zIndex: -1,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  MarkerWhenDragTrue : {
    position : 'absolute',
    left : '50%',
    top : '50%',
    zIndex : 10000
  }
});
