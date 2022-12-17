
import {View, Text, SafeAreaView, StyleSheet, Button} from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Burger from '../components/Burger';
import Calculate from '../components/Calculate';
import AppButton from '../components/AppButton';
export default function HomeScreen({ navigation }) {
  const [state,setState] = useState(false)
  return (
    <SafeAreaView >
  <View style={{justifyContent : 'space-between' , alignItems : 'center' , flexDirection : 'row' , padding : 10}}>
    <Button onPress={() => navigation.navigate('YourOrder')} title='Your order'/>
    {state ?  <Button  title='Logout'/> :  <Button onPress={() => navigation.navigate('Login')}  title='Login'/>}
   
    {/* <AntDesign name='logout' size={22}/> */}
  </View>
  <View>
    <Burger />
    <Calculate onPress={() => navigation.navigate('ConfirmOrder')}/>
  </View>
  

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1'
  },
  buttonsContainer: {
    padding: 10
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8
  }
});