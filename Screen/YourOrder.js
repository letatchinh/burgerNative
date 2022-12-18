import { View, Text, SafeAreaView, ScrollView, Button, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import AppButton from '../components/AppButton'
import ItemOrders from '../components/ItemOrders'
import { useInfiniteQuery } from 'react-query'
import { useSelector } from 'react-redux'
import {  getOrderByEmailInfinityScroll } from '../apis/service'
import { IOScrollView, InView } from 'react-native-intersection-observer'

export default function YourOrder() {
  const user = useSelector(state => state.user.user) || null
  const {data,isFetchingNextPage , isFetching,refetch, hasNextPage , fetchNextPage } = useInfiniteQuery(
    [user.username],
    ({ pageParam = 1 }) => getOrderByEmailInfinityScroll({pageParam,email : user.username}),
    {
      getNextPageParam :(_lastPage , pages) => {
        if(pages.length < _lastPage.pages){
          return pages.length + 1
        }
        else{
          return undefined
        }
      },
      enabled : user !== null
    },
  );
  return (
    <SafeAreaView style={{flex : 1}}>
    <IOScrollView style={{padding : 10}}>
    <View style={{justifyContent : 'space-between' , alignItems : 'center' , flexDirection : 'row'}}>
      <Text>Orders</Text>
      <AppButton title='Log out'/>
    </View>
    <View style={{justifyContent : 'center' , alignItems : 'center'}}>
    {data && data.pages.map(e => e.arrResponse.map((e,i) =>  <ItemOrders key={i} orders={e}/>))}
    </View>
    {isFetching &&  !isFetchingNextPage &&<ActivityIndicator size="large" />}
        {isFetchingNextPage && <ActivityIndicator />}
       
        
    <InView onChange={(inView) => inView && fetchNextPage()}>
    <Button disabled={!hasNextPage} onPress={fetchNextPage} title='next'/>
    </InView>
  </IOScrollView>  
    </SafeAreaView>
  )
}