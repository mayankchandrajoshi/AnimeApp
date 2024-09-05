import { View, Text, StyleSheet, ScrollView, Animated, FlatList, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTSIZE } from '../themes/themes';
import MainHeader from '../components/MainHeader';
import MyWatchListScreen from './MyWatchListScreen';
import FavoriteListScreen from './FavoriteListScreen';
import MyWatchedListScreen from './MyWatchedListScreen';
import ScreenSelectionCarousal from '../components/ScreenSelectionCarousal';
import estimateTextWidth from '../utils/estimateTextWidth';

const Screens = [
  {
    name: "watchList",
    component: (navigation: any) => <MyWatchListScreen navigation={navigation}/>,
    width : estimateTextWidth("watchList".toUpperCase(),FONTSIZE.size_12)+30-2
  },
  {
    name: "Favorites",
    component: (navigation: any) => <FavoriteListScreen navigation={navigation}/>,
    width : estimateTextWidth("Favorites".toUpperCase(),FONTSIZE.size_12)+30-2
  },
  {
    name: "Watched",
    component: (navigation: any) => <MyWatchedListScreen navigation={navigation}/>,
    width : estimateTextWidth("Watched".toUpperCase(),FONTSIZE.size_12)+30-2
  },
];


const MyListScreen = ({navigation}:any) => {
  return (
    <View style={{
      flex:1,
      backgroundColor : COLORS.Black
    }}>
      <StatusBar translucent backgroundColor={'transparent'}/>
      <MainHeader screenName="My Lists" 
        searchFunction={()=>{
          navigation.navigate('Search',{ query : null });
        }}
        SWFFunction={()=>{
          navigation.navigate('SWFModal');
      }}/>
      <ScreenSelectionCarousal screens={Screens} navigation={navigation} />
    </View>
  )
} 

const styles = StyleSheet.create({
  loaderContainer : {
    
  },
  scrollViewContainer: {
    flex: 1,
  },
  scrollViewContentContainer : {
    flex : 1,
  },
})

export default MyListScreen