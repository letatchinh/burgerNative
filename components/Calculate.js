import { ActivityIndicator, Alert, View} from 'react-native'
import React from 'react'
import ItemCalculate from './ItemCalculate'
import AppButton from './AppButton'
import { useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { AddOrderSerive } from '../apis/service'
export default function Calculate({navigation}) {
  const burgerInfo = useSelector(state => state.burger)
  const user = useSelector(state => state.user.user) || null
  const {isLoading,mutate} = useMutation({
    mutationFn: newOrder => {
      return AddOrderSerive(newOrder)
    },
    onError: (error, variables, context) => {
   console.log(error);
    },
    onSuccess: (data, variables, context) => {
      Alert.alert(
        "Success",
        `Order Success`,
        [
          { text: "OK" }
        ]
      );
    },
  })
  const addOrder = () => {
    if(user){
      const newOrder = {
        email : user.username,
        order : burgerInfo.order,
        price : burgerInfo.totalBill,
        timeStamp : Date.now()
      }
      mutate(newOrder)
    }
    else{
      navigation.navigate("Login")
    }
  
  }
  return (
    <View style={{justifyContent : 'center' , alignItems : 'center' , marginTop : 20}}>
      <View style={{width : '70%',borderWidth : 1 , padding : 5 , marginBottom : 10 ,borderRadius : 10}}>
      <ItemCalculate price={0.2} item="salad"/>
      <ItemCalculate price={0.5} item="bacon"/>
      <ItemCalculate  price={0.6} item="cheese"/>
      <ItemCalculate price={1} item="meat"/>
      </View>
      {isLoading ? <ActivityIndicator size="large" /> :  <AppButton title="Check out" onPress={addOrder}/>}
     
    </View>
  )
}