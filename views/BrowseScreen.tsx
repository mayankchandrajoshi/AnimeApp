import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import AllAnimeScreen from './AllAnimeScreen'
import { COLORS, FONTSIZE } from '../themes/themes'
import MainHeader from '../components/MainHeader'
import GenresScreen from './GenresScreen'
import GenreAnimeScreen from './GenreAnimeScreen'
import SimulcastSeasonScreen from './SimulcastSeasonScreen'
import ScreenSelectionCarousal from '../components/ScreenSelectionCarousal'
import MusicScreen from './MusicScreen'
import estimateTextWidth from '../utils/estimateTextWidth'

const Screens = [
  {
    name: "All anime",
    component: (navigation:any)=><AllAnimeScreen navigation={navigation}/>,
    width : estimateTextWidth("All anime".toUpperCase(),FONTSIZE.size_12)+30-2 
  },
  {
    name: "Simulcasts",
    component: (navigation:any)=><SimulcastSeasonScreen navigation={navigation}/>,
    width : estimateTextWidth("Simulcasts".toUpperCase(),FONTSIZE.size_12)+30-2 
  },
  {
    name: "Anime Genres",
    component: (navigation:any)=><GenresScreen navigation={navigation}/>,
    width : estimateTextWidth("Anime Genres".toUpperCase(),FONTSIZE.size_12)+30-2 
  },
  {
    name: "Music",
    component: MusicScreen,
    width : estimateTextWidth("Music".toUpperCase(),FONTSIZE.size_12)+30-2 
  },
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
      <ScreenSelectionCarousal screens={Screens} navigation={navigation}/>
    </View>
  )
}


const styles = StyleSheet.create({

})

export default BrowseScreen