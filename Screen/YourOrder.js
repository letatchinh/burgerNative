import { View, Text, SafeAreaView, ScrollView, Button, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import AppButton from '../components/AppButton'
import ItemOrders from '../components/ItemOrders'
import { useInfiniteQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import {  getOrderByEmailInfinityScroll } from '../apis/service'
import { IOScrollView, InView } from 'react-native-intersection-observer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { removeItem, _retrieveData } from '../AsynStored'
import { removeUser } from '../redux/userSlice'
import messaging from '@react-native-firebase/messaging';

export default function YourOrder({ navigation }) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user) || null
  const {data,isFetchingNextPage , isFetching,refetch, hasNextPage , fetchNextPage } = useInfiniteQuery(
    [user && user.username],
    ({ pageParam = 1 }) => getOrderByEmailInfinityScroll({pageParam,email : user.username}),
    {
      getNextPageParam :(_lastPage , pages) => {
        if(pages) if(pages.length < _lastPage.pages){
          return pages.length + 1
        }
        else{
          return undefined
        }
       
      },
      enabled : user !== null,
      cacheTime : 0
    },
  );
    const logout = () => {
      removeItem()
      dispatch(removeUser())
      navigation.navigate("Home")
    }
    useEffect(() => {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });
  
      return unsubscribe;
    }, []);
  return (
    <SafeAreaView style={{flex : 1}}>
    <IOScrollView style={{padding : 10}}>
    <View style={{justifyContent : 'flex-end' , alignItems : 'center' , flexDirection : 'row'}}>
      <AppButton onPress={logout} title='Log out'/>
    </View>
    <View style={{justifyContent : 'center' , alignItems : 'center'}}>
    {data && data.pages && data.pages.map(e => e.arrResponse.map((e,i) =>  <ItemOrders key={i} orders={e}/>))}
    </View>
    <InView onChange={(inView) => inView && fetchNextPage()}>
    <Button disabled={!hasNextPage} onPress={fetchNextPage} title='next'/>
    </InView>
    {isFetching &&  !isFetchingNextPage &&<ActivityIndicator size="large" />}
        {isFetchingNextPage && <ActivityIndicator />}
   
  </IOScrollView>  
    </SafeAreaView>
  )
}