import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { convertAddressFirst } from '../Constan/functionAddress';
import { useDispatch } from 'react-redux';
import { addAddressUserSelect } from '../redux/userSlice';

const IconRight = <Icon name="right" size={16} color="#999" />;
const IconLocaltionItem = (
  <Ionicons name="location" size={25} color="#DF493A" />
);

export default function ItemSearchAddress({item,navigation}) {
    const dispatch = useDispatch()
    const handleSelectAddress = () => {
        dispatch(addAddressUserSelect(item))
        navigation.navigate("enterAddress")
    }
  return (
    <TouchableOpacity onPress={handleSelectAddress} activeOpacity={0.9} style={styles.userAddress}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center',width : '100%' , justifyContent : 'space-between' }}>
          <Text style={{fontWeight: '800', fontSize: 18, marginHorizontal: 5}}>
            {IconLocaltionItem}
          </Text>
          <View style={{flexGrow : 1 , overflow : 'hidden'}}>
            <Text style={{fontWeight : '800' , color : 'black' }}> {convertAddressFirst(item.place)}</Text>
            <Text style={{ maxWidth : '95%',  color : 'black'}} numberOfLines={1}> {item.place}</Text>
          </View>
        </View>
        <Text style={{marginLeft : -7}}>{IconRight}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  userAddress: {
    marginHorizontal: 10,
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#999',
  },
});
