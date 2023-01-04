import { ActivityIndicator, Alert, View} from 'react-native'
import React, { useState } from 'react'
import ItemCalculate from './ItemCalculate'
import AppButton from './AppButton'
import { useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { AddOrderSerive } from '../apis/service'
import ModalConfirmOrder from './ModalConfirmOrder'
import axiosClient from '../Constan/AxiosConfig'
import { titleAddOrder } from '../Constan/NotifyCation'
export default function Calculate({navigation}) {
  const burgerInfo = useSelector(state => state.burger)
  const user = useSelector(state => state.user.user) || null
  const token = useSelector(state => state.user.token) || null
  const address = useSelector(state => state.user.address) || null
  const [modalVisible, setModalVisible] = useState(false);

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
  const onPress = () => {
    // navigation.navigate("location");

  }
  const addOrder = () => {
    setModalVisible(true)
  }
  const handleConfirmOrder = async() => {
  // if(user){
  //     const newOrder = {
  //       email : user.username,
  //       order : burgerInfo.order,
  //       price : burgerInfo.totalBill,
  //       timeStamp : Date.now(),
  //       address
  //     }
  //     mutate(newOrder)
  //   }
  //   else{
  //     navigation.navigate("Login")
  //   }
  const res = await axiosClient.post("/sendFirebaseReactNative",{title : titleAddOrder , body : "order nè" , token })
  console.log(res);
  }
  return (
    <View style={{justifyContent : 'center' , alignItems : 'center' , marginTop : 20}}>
        <ModalConfirmOrder confirmOrder={handleConfirmOrder} navigation={navigation} modalVisible={modalVisible} setModalVisible={(state) => setModalVisible(state)} />

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