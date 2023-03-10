
import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Burger from '../components/Burger';
import Calculate from '../components/Calculate';
import {  useSelector } from 'react-redux';
import HeaderApp from '../layout/HeaderApp';
export default function HomeScreen({ navigation }) {
  const totalBill = useSelector(state => state.burger.totalBill)
  return (
    <SafeAreaView >
    <HeaderApp navigation={navigation}/>
  <View>
    <Burger />
   <View style={{justifyContent : 'center' , alignItems : 'center' , marginTop : 20}}>
   <View style={{flexDirection : 'row' , justifyContent : 'space-between' , alignItems : 'center' , width : '70%' , borderRadius : 10 , borderWidth : 1 , padding : 10}}>
      <Text>Total</Text>
      <Text>{totalBill}$</Text>
    </View>
   </View>
    <Calculate onPress={() => navigation.navigate('ConfirmOrder')}/>
  </View>
  

    </SafeAreaView>
  );
}
