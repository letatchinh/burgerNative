import {View, Text, PermissionsAndroid, StyleSheet, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export default function Mapbox() {
  const [info, setInfo] = useState(null);
  const [state, setState] = useState(false);
  const resquestPermissonLocation = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.getCurrentPosition(info => {
        const {latitude, longitude} = info.coords;
        setInfo({latitude, longitude});
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
          Geolocation.getCurrentPosition(info => {
            const {latitude, longitude} = info.coords;
            setInfo({latitude, longitude});
          });
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  useEffect(() => {
    // Geolocation.requestAuthorization()

    resquestPermissonLocation();
  }, []);
  return (
    <View style={styles.container}>
      {!state ? (
        <Button style={{position : 'absolute', top : 50}}
          onPress={() => {
            resquestPermissonLocation();
            setState(!state);
          }}
          title="Get Your Location"
        />
      ) : info ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: info.latitude,
            longitude: info.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{
              latitude: info.latitude,
              longitude: info.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            // image={{uri: 'custom_pin'}}
          />
        </MapView>
      ) : null}
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
