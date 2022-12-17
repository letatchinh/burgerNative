import { View, Text, Button } from 'react-native'
import React from 'react'
import AppButton from './AppButton'
import { useDispatch, useSelector } from 'react-redux'
import { decrementByAmount, incrementByAmount } from '../redux/burgerSlice'

export default function ItemCalculate({item,price}) {
  const dispatch = useDispatch()
  const burger = useSelector(state => state.burger.order[item])
  return (
    <View style={{justifyContent : 'space-between' , flexDirection : 'row' , alignItems : 'center' , margin : 5}}>
      <Text style={{textTransform : 'capitalize'}}>{item} ({price} $)</Text>
      <View style={{flexDirection : 'row' , alignItems : 'center' , justifyContent : 'space-between' , width : '40%'}}>
        <AppButton disable={burger === 0}  onPress={() => dispatch(decrementByAmount({name : item,price}))} title='-'/>
        <Text>{burger}</Text>
        <AppButton onPress={() => dispatch(incrementByAmount({name : item,price}))} title='+'/>
      </View>
    </View>
  )
}