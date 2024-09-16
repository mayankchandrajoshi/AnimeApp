import { Animated, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes';
import useAnimatedPress from '../utils/animatedPress';
import statusBarHeight from '../utils/getStatusBarHeight';
import * as NavigationBar from 'expo-navigation-bar'
import userStore from '../store/userStore';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';

const LogoutScreen = ({navigation}:any) => {

  const { logout } = userStore();
  const [ isLoggingOut,setIsLoggingOut ] = useState(false);

  const { backgroundColor: backgroundColorLogoutBtn,animateColorPressIn: animateColorPressInLogoutBtn,animateColorPressOut: animateColorPressOutLogoutBtn } = useAnimatedPress(COLORS.OrangeRed90, COLORS.OrangeRed60,200,400);

  const { backgroundColor: backgroundColorCancelBtn,animateColorPressIn: animateColorPressInCancelBtn,animateColorPressOut: animateColorPressOutCancelBtn } = useAnimatedPress(COLORS.WhiteRGBA20, COLORS.WhiteRGBA15,200,400);

  useEffect(()=>{
    NavigationBar.setBackgroundColorAsync(COLORS.Black);
  },[])


  const handleLogout = async() => {
    setIsLoggingOut(true);
    try {
      await SecureStore.deleteItemAsync('JWTToken');
      logout();
    } catch (error:any) {
      if(error?.response?.data?.message) {
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
        })
      }
      else {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'An error occurred.'
        });
      }
    }
    finally{
      setIsLoggingOut(false);
    }
  }

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
          <Pressable disabled={isLoggingOut} onPress={handleLogout} onPressIn={animateColorPressInLogoutBtn} onPressOut={animateColorPressOutLogoutBtn} style={styles.btn}>
            {
              !isLoggingOut?(
                <Text style={styles.btnText}>LOG OUT</Text>
              ):(
                <ActivityIndicator size={FONTSIZE.size_18} color={COLORS.WhiteRGBA75}/>
              )
            }
          </Pressable>
        </Animated.View>
        <Animated.View style={[{backgroundColor:backgroundColorCancelBtn,borderRadius : BORDERRADIUS.radius_4}]}>
          <Pressable disabled={isLoggingOut} onPress={()=>{navigation.goBack()}} onPressIn={animateColorPressInCancelBtn} onPressOut={animateColorPressOutCancelBtn} style={styles.btn}>
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