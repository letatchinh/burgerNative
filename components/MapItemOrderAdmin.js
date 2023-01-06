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
  export default function MapItemOrderAdmin({addressUser}) {
    const {address} = addressUser
    const origin = {
      latitude: addressStore.latitude,
      longitude: addressStore.longitude,
    };
    const destination = {
      latitude: address.latLong.latitude ,
      longitude: address.latLong.longitude ,
    };
    const mapRef = useRef(null);

    const [distanceAndDuration, setDistanceAndDuration] = useState(null);
    const EDGE_PADDING = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
    useEffect(() => {
setTimeout(() => {
  mapRef.current.fitToElements({animated : true,eedgePadding : EDGE_PADDING})
}, 500);   
},[mapRef])
    return (
      <View style={styles.container}>
    <MapView ref={mapRef}
          // loadingEnabled={true}
          
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: address.latLong.latitude || 16.0194093,
            longitude: address.latLong.longitude || 108.2290156,
            latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
          }}>
          <MapViewDirections
            origin={origin}
            destination={destination || {longitude : 108.2290156 ,latitude : 16.0194093}}
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
       {distanceAndDuration &&    <Marker key="end"   title={`You Here`} style={{alignItems: 'center'}} coordinate={destination}>
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
         
        </MapView>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
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
  