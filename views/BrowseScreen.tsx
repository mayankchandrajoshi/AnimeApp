import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import AllAnimeScreen from './AllAnimeScreen'
import { COLORS } from '../themes/themes'
import MainHeader from '../components/MainHeader'
import GenresScreen from './GenresScreen'
import GenreAnimeScreen from './GenreAnimeScreen'
import SimulcastSeasonScreen from './SimulcastSeasonScreen'
import ScreenSelectionCarousal from '../components/ScreenSelectionCarousal'
import MusicScreen from './MusicScreen'

const Screens = [
  {
    name: "All anime",
    component: (navigation: any) => <AllAnimeScreen navigation={navigation} />
  },
  {
    name: "Simulcasts",
    component: (navigation: any) => <SimulcastSeasonScreen navigation={navigation} />
  },
  {
    name: "Anime Genres",
    component: (navigation: any) => <GenresScreen navigation={navigation} />
  },
  // {
  //   name: "Music",
  //   component: (navigation: any) => <MusicScreen navigation={navigation} />
  // },
];

const BrowseScreen = ({navigation}:any) => {
  
  return (
    <View style={{flex:1,backgroundColor : COLORS.Black}}>
      <MainHeader screenName="Browse" searchFunction={()=>{
          navigation.navigate('Search',{query:null});
        }}
        SWFFunction={()=>{
          navigation.navigate('SWFModal');
        }}/>
      <ScreenSelectionCarousal screens={Screens} navigation={navigation} />
    </View>
  )
}


const styles = StyleSheet.create({

})

export default BrowseScreen