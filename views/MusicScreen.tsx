import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'

const { width } = Dimensions.get("screen")

const MusicScreen = ({navigation}:any) => {
  return (
    <View style={{flex:1,width,justifyContent:"center",alignItems:"center",gap:SPACING.space_10}}>
      <MaterialIcons name="timer" size={FONTSIZE.size_30*5} color={COLORS.OrangeRed} />
      <Text style={{fontSize:FONTSIZE.size_24,fontFamily:FONTFAMILY.lato_bold,color:COLORS.White,}}>Will be available soon</Text>
    </View>
  )
}

export default MusicScreen

const styles = StyleSheet.create({})