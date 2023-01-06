import {View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import EvilIcons  from 'react-native-vector-icons/EvilIcons';
import ItemSearchAddress from '../components/ItemSearchAddress';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const IconLocaltion =  <EvilIcons name="location" size={35} color="#1E90FF"/>
export default function SearchAddress({navigation}) {
    const { getItem } = useAsyncStorage('listAddressUser');
    const [listAddressUser,setListAddressUser] = useState([])
    const readItemFromStorage = async () => {
        const item = await getItem();
        setListAddressUser(JSON.parse(item));
      };
    useEffect(() => {
        readItemFromStorage()
    },[])
    return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.titleTop}>
          <Text style={{fontWeight: '700', fontSize: 20}}>Address Ship</Text>
          <Text>We will ship everywhere</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("enterAddress")} activeOpacity={0.9} style={styles.enterAddress}>
    <Text style={{fontWeight : '800' ,fontSize : 18}}>{IconLocaltion} Enter...  </Text>
        </TouchableOpacity>
        <View>
        {listAddressUser?.map((e,i) =>  <ItemSearchAddress navigation={navigation}  key={i} item={e}/>)}
      
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  titleTop: {
    padding: 40,
    backgroundColor: '#0aa44c4f',
  },
  enterAddress: {
    marginHorizontal : 20,
    borderRadius : 10,
    backgroundColor : 'white',
    padding: 20,
    transform : [{translateY : -30}],
    shadowColor: 'black',

    shadowOpacity: 0.2,
    shadowRadius: 20,

    elevation: 5,
  },
  userAddress : {
    marginHorizontal : 20,
    padding : 10,
    borderBottomWidth : 0.5,
    borderColor : '#999'
  }
});
