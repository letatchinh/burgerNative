
import {View, Text, SafeAreaView, StyleSheet, Button} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
  <View style={{justifyContent : 'space-between' , alignItems : 'center' , flexDirection : 'row' , padding : 10}}>
    <Button title='Your order'/>
    <Button  title='Logout'/>
    {/* <AntDesign name='logout' size={22}/> */}
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