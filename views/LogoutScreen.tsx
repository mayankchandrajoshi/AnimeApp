import { Animated, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes';
import useAnimatedPress from '../utils/animatedPress';
import statusBarHeight from '../utils/getStatusBarHeight';
import * as NavigationBar from 'expo-navigation-bar'

const LogoutScreen = ({navigation}:any) => {

  const { backgroundColor: backgroundColorLogoutBtn,animateColorPressIn: animateColorPressInLogoutBtn,animateColorPressOut: animateColorPressOutLogoutBtn } = useAnimatedPress(COLORS.OrangeRed90, COLORS.OrangeRed60,200,400);

  const { backgroundColor: backgroundColorCancelBtn,animateColorPressIn: animateColorPressInCancelBtn,animateColorPressOut: animateColorPressOutCancelBtn } = useAnimatedPress(COLORS.WhiteRGBA20, COLORS.WhiteRGBA15,200,400);

  useEffect(()=>{
    NavigationBar.setBackgroundColorAsync(COLORS.Black);
  },[])

  return (
    <View style={styles.container}>
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text style={{
          fontFamily : FONTFAMILY.lato_bold,
          fontSize : FONTSIZE.size_20,
          color : COLORS.WhiteRGBA60,
          textAlign:"center"
        }}>
          Are you sure you want to logout?We cant  notify you for new anime recommendations.
        </Text>
      </View>
      <View style={{paddingHorizontal:SPACING.space_16,paddingBottom:SPACING.space_56,gap:SPACING.space_15}}>
        <Animated.View style={[{backgroundColor:backgroundColorLogoutBtn,borderRadius : BORDERRADIUS.radius_4}]}>
          <Pressable onPress={()=>{}} onPressIn={animateColorPressInLogoutBtn} onPressOut={animateColorPressOutLogoutBtn} style={styles.btn}>
            <Text style={styles.btnText}>LOG OUT</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={[{backgroundColor:backgroundColorCancelBtn,borderRadius : BORDERRADIUS.radius_4}]}>
          <Pressable onPress={()=>{navigation.goBack()}} onPressIn={animateColorPressInCancelBtn} onPressOut={animateColorPressOutCancelBtn} style={styles.btn}>
            <Text style={styles.btnText}>CANCEL</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  )
}

export default LogoutScreen

const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor:COLORS.Black,
    paddingHorizontal : SPACING.space_16,
    paddingTop : statusBarHeight + SPACING.space_16
  },
  btn : {
    padding:SPACING.space_16,
  },
  btnText : {
    fontFamily : FONTFAMILY.lato_bold,
    fontSize : FONTSIZE.size_16,
    color : COLORS.WhiteRGBA75,
    textAlign:"center"
  }
})