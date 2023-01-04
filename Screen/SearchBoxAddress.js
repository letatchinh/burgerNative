import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Mapbox from '../components/Mapbox';
import MyTouchleHightLightButton from '../components/MyTouchleHightLightButton';
import MapCustomePlace from '../components/MapCustomePlace';
import axiosClient from '../Constan/AxiosConfig';
import { useState } from 'react';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import AppButton from '../components/AppButton';
const IconLocaltion =  <Ionicons name="location" size={25} color="#DF493A"/>
const IconSearch =  <Icon name='search1'  size={20} color="#999" />

const SearchBoxAddress = () => {
  const [location,setLocaltion] = useState(null)
  const [placeChosse,setPlaceChosse] = useState(null)
  return (
     <View style={{padding : 20, flex : 1}}>
     <MyTouchleHightLightButton title="Lấy Địa chỉ hiện tại" style={{alignSelf : 'center' , marginBottom : 20}}/>
    
    
     <GooglePlacesAutocomplete
     renderLeftButton={() => IconSearch}
        placeholder="Địa chỉ hiện tại của bạn ở đâu ?"
        query={{key: "AIzaSyAqT8WYorXQrrDXxg2WzqLAEScpB0ZZgwc",language : 'vi'}}
        textInputProps={{
        placeholderTextColor: 'black',
        returnKeyType: "search"
      }}
        styles={{
  container: {
    flex: 1,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems : 'center',
    backgroundColor : 'white'
  },
  textInput: {
    // backgroundColor: 'white',
    height: 44,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    color : "black"
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
  listView: {
  
  },
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
  description: {color : 'black',},
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
}}
      onPress={async(data , details = null) => {
        const res = await axiosClient.get(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${data.place_id}&key=AIzaSyAqT8WYorXQrrDXxg2WzqLAEScpB0ZZgwc`)
        setPlaceChosse(res.data.results[0].formatted_address)
        setLocaltion(res.data.results[0].geometry.location)
      }}
        
      />
      {location && <MapCustomePlace address={{latitude : location.lat , longitude : location.lng}} />}
      <View style={styles.ConfirmBox}>
        <View style={{backgroundColor : 'gray',marginTop : 50  , width : '80%', padding : 20}}>
        <View style={{flexDirection : 'row' , alignItems : 'center'}}>
        <Text >{IconLocaltion}</Text>
        <Text style={{color : 'white'}}>{placeChosse}</Text>
        </View>
        </View>
        <AppButton style={{marginTop : 20 }} title="Confirm Address"/>
      </View>
     </View>
  );
};
export default SearchBoxAddress

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "white",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  ConfirmBox: {
    position : 'absolute',
    left : 0,
    right : 0,
    bottom : 0,
    top : '80%',
    zIndex : 10,
    backgroundColor : '#ffffffab',
    alignItems : 'center'
  }
});