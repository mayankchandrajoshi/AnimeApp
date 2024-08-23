import { View, Text } from 'react-native'
import React from 'react'
import AnimeCharactersList from '../components/AnimeCharactersList'

const UserScreen = ({navigation}:any) => {
  return (
    <AnimeCharactersList id={21} navigation={navigation}/>
  )
}

export default UserScreen