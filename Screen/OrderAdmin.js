import { View, Text, SafeAreaView, ScrollView, Button, ActivityIndicator, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ItemOrders from '../components/ItemOrders'
import { useInfiniteQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import {  getAllOrderInfinityScroll, getOrderByEmailInfinityScroll } from '../apis/service'
import { removeItem, _retrieveData } from '../AsynStored'
import { removeUser } from '../redux/userSlice'
import messaging from '@react-native-firebase/messaging';
import ModalLoading from '../components/ModalLoading'
import ItemOrdersAdmin from '../components/ItemOrdersAdmin'

export default function OrderAdmin({ navigation }) {
  const dispatch = useDispatch()
  const [dataShow,setDataShow] = useState([])
  const [refreshing,SetRefreshing] = useState(false)
  const user = useSelector(state => state.user.user) || null
  const {data,isFetchingNextPage , isFetching, hasNextPage , fetchNextPage ,refetch } = useInfiniteQuery(
    [user && user.username],
    ({ pageParam = 1 }) => getAllOrderInfinityScroll({pageParam,email : user.username}),
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
    renderItem={(orders) => <ItemOrdersAdmin navigation={navigation} orders={orders}/>}
    ListFooterComponent={() => <View style={{display : !hasNextPage ? "none" : 'flex'}}>
      <ModalLoading loading={isFetchingNextPage}/>
    </View>}
    onEndReached={fetchNextPage}
    onEndReachedThreshold={0.5}
    refreshing={refreshing}
    onRefresh={() => {
      refetch()
    }}
  />

  
    </SafeAreaView>
  )
}