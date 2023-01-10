import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Mapbox from '../components/Mapbox';
import MyTouchleHightLightButton from '../components/MyTouchleHightLightButton';
import MapCustomePlace from '../components/MapCustomePlace';
import axiosClient from '../Constan/AxiosConfig';
import {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppButton from '../components/AppButton';
import {KEY_API_GOOGLE_MAP} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import {
  addAddress,
  addAddressUserSelect,
} from '../redux/userSlice';
import  {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';

const IconLocaltion = <Ionicons name="location" size={25} color="#DF493A" />;
const IconSearch = <Icon name="search1" size={20} color="#999" />;
const IconArrowright = <Icon name="arrowright" size={20} color="black" />;

const SearchBoxAddress = ({navigation}) => {
  const {getItem, setItem} = useAsyncStorage('listAddressUser');
  const addressUserSelect = useSelector(state => state.user.addressUserSelect);
  const dispatch = useDispatch();
  const SetAsynStored = async item => {
    const value = await getItem();
    if (value !== null) {
      const parseValue = JSON.parse(value);
      const flag = parseValue.some(e => e.place === item.place);
      if (!flag) {
        if (parseValue.length >= 6) {
          parseValue.splice(0, 1, item);
        } else {
          parseValue.push(item);
        }
        await setItem(JSON.stringify(parseValue));
      }
    } else {
      await setItem(JSON.stringify([item]));
    }
  };
  const handleConfirmAddress = () => {
    dispatch(
      addAddress({
        place: addressUserSelect.place,
        latLong: {
          latitude: addressUserSelect.location.latitude,
          longitude: addressUserSelect.location.longitude,
        },
      }),
    );
    navigation.navigate('HomeScreen');
  };
  return (
    <View style={{padding: 20, flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
          justifyContent: 'flex-end',
        }}>
        <MyTouchleHightLightButton
          onPress={() => {
            Geolocation.getCurrentPosition(async info => {
              const {latitude, longitude} = info.coords;
              const res = await axiosClient.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KEY_API_GOOGLE_MAP}`,
              );
              dispatch(
                addAddressUserSelect({
                  location: {latitude, longitude},
                  place: res.data.results[0].formatted_address,
                }),
              );
            });
          }}
          title="Lấy Địa chỉ hiện tại"
          style={{alignSelf: 'center'}}
        />
        <AppButton
          onPress={handleConfirmAddress}
          style={{marginRight: 20 }}
          title="Confirm Address"
          icon={IconArrowright}
        />
      </View>

      <GooglePlacesAutocomplete
        renderLeftButton={() => IconSearch}
        placeholder="Địa chỉ hiện tại của bạn ở đâu ?"
        query={{key: KEY_API_GOOGLE_MAP, language: 'vi'}}
        textInputProps={{
          placeholderTextColor: 'black',
          returnKeyType: 'search',
        }}
        styles={{
          container: {
            flex: 1,
            paddingHorizontal: 5,
          },
          textInputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 10,
            paddingHorizontal: 10,
          },
          textInput: {
            // backgroundColor: 'white',
            height: 44,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            flex: 1,
            color: 'black',
          },

          poweredContainer: {
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderColor: '#c8c7cc',
            borderTopWidth: 0.5,
          },
          powered: {},
          listView: {},
          row: {
            backgroundColor: '#FFFFFF',
            padding: 13,
            height: 44,
            flexDirection: 'row',
          },
          separator: {
            height: 0.5,
            backgroundColor: '#c8c7cc',
          },
          description: {color: 'black'},
          loader: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 20,
          },
        }}
        onPress={async (data, details = null) => {
          const res = await axiosClient.get(
            `https://maps.googleapis.com/maps/api/geocode/json?place_id=${data.place_id}&key=${KEY_API_GOOGLE_MAP}`,
          );
          await SetAsynStored({
            place: res.data.results[0].formatted_address,
            location: {
              latitude: res.data.results[0].geometry.location.lat,
              longitude: res.data.results[0].geometry.location.lng,
            },
          });
          dispatch(
            addAddressUserSelect({
              location: {
                latitude: res.data.results[0].geometry.location.lat,
                longitude: res.data.results[0].geometry.location.lng,
              },
              place: res.data.results[0].formatted_address,
            }),
          );
        }}
      />
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            padding: 20,
            position: 'absolute',
            top: 20,
            left: 10,
            right: 10,
            zIndex: 100000,
          }}
          onPress={() => {
            console.log('does not work');
          }}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
      {addressUserSelect && (
        <MapCustomePlace
          address={{
            latitude: addressUserSelect.location.latitude,
            longitude: addressUserSelect.location.longitude,
          }}
        />
      )}
      {/* <View style={styles.ConfirmBox}>
        <View style={{backgroundColor : '#000',marginTop : 50  , width : '80%', paddingHorizontal : 10 , paddingVertical : 15 , borderRadius : 10}}>
        <View style={{flexDirection : 'row' , alignItems : 'center'}}>
        <Text >{IconLocaltion}</Text>
        <Text style={{color : 'white'}}>{addressUserSelect.place}</Text>
        </View>
        </View>
        <AppButton onPress={() => {
          handleConfirmAddress();
          navigation.navigate("HomeScreen")
        }} style={{marginTop : 20 }} title="Confirm Address"/>
      </View> */}
    </View>
  );
};
export default SearchBoxAddress;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ConfirmBox: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: '80%',
    zIndex: 10,
    backgroundColor: '#ffffffab',
    alignItems: 'center',
  },
});
