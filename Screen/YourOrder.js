import { View, Text, SafeAreaView, ScrollView, Button, ActivityIndicator, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ItemOrders from '../components/ItemOrders'
import { useInfiniteQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import {  getOrderByEmailInfinityScroll } from '../apis/service'
import { removeItem, _retrieveData } from '../AsynStored'
import { removeUser } from '../redux/userSlice'
import messaging from '@react-native-firebase/messaging';
import ModalLoading from '../components/ModalLoading'

export default function YourOrder({ navigation }) {
  const dispatch = useDispatch()
  const [dataShow,setDataShow] = useState([])
  const user = useSelector(state => state.user.user) || null
  const {data,isFetchingNextPage , isFetching, hasNextPage , fetchNextPage } = useInfiniteQuery(
    [user && user.username],
    ({ pageParam = 1 }) => getOrderByEmailInfinityScroll({pageParam,email : user.username}),
    {
      getNextPageParam :(_lastPage , pages) => {
        if(_lastPage && _lastPage.pages){
          if(pages.length < _lastPage.pages){
            return pages.length + 1
          }
          else{
            return undefined
          }
        }
       
      },
      enabled : user !== null,
      cacheTime : 0
    },
  );
  useEffect(() => {
    const newData = []
    data && data.pages && data.pages.map(e => e && e.arrResponse && e.arrResponse.map((e,i) =>  newData.push(e)))
    setDataShow(newData)
  },[data])
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
    
  {isFetching &&  !isFetchingNextPage &&<ActivityIndicator size="large" />}
  <FlatList
    data={dataShow}
    renderItem={(orders) => <ItemOrders orders={orders}/>}
    ListFooterComponent={() => <View style={{display : !hasNextPage ? "none" : 'flex'}}>
      <ModalLoading loading={isFetchingNextPage}/>
    </View>}
    onEndReached={fetchNextPage}
    onEndReachedThreshold={0}
  />

  
    </SafeAreaView>
  )
}