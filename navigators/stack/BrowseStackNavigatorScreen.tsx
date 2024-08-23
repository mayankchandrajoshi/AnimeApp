import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BrowseScreen from '../../views/BrowseScreen';
import AnimeDetailsScreen from '../../views/AnimeDetailsScreen';
import CharacterDetailsScreen from '../../views/CharacterDetailsScreen';
import VoiceActorDetailsScreen from '../../views/VoiceActorDetailsScreen';
import SearchScreen from '../../views/SearchScreen';
import GenresAnimeScreen from '../../views/GenreAnimeScreen';
import SWFFilterScreen from '../../views/SWFFilterScreen';

const BrowseStack = createNativeStackNavigator();

const BrowseStackNavigatorScreen = () => {
  return (
    <BrowseStack.Navigator
      initialRouteName='Browse'
      screenOptions={{
        headerShown: false,
      }}
    >
      <BrowseStack.Screen 
        name="Browse" 
        component={BrowseScreen} 
        options={{animation: 'slide_from_right'}}
      />
      <BrowseStack.Screen
        name="GenreAnime"
        component={GenresAnimeScreen}
        options={{animation: 'slide_from_right'}}
      />
    </BrowseStack.Navigator>
  )
}

export default BrowseStackNavigatorScreen

const styles = StyleSheet.create({})