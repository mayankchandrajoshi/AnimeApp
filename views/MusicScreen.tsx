import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const { width } = Dimensions.get("screen")

const MusicScreen = ({navigation}:any) => {
  return (
    <View style={{width}}>
      <Text>MusicScreen</Text>
    </View>
  )
}

export default MusicScreen

const styles = StyleSheet.create({})