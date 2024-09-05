import { Animated, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'
import statusBarHeight from '../utils/getStatusBarHeight'
import { AntDesign } from '@expo/vector-icons'
import { TextInput } from 'react-native-paper'
import useAnimatedPress from '../utils/animatedPress'

const LoginScreen = ({navigation}:any) => {
  const [ email,setEmail ]  = useState("");
  const [ password,setPassword ]  = useState("");
  const [ showPassword,setShowPassword ] = useState(false);

  const loginBtnAnimatedPress = useAnimatedPress("transparent", COLORS.WhiteRGBA30, 200, 400);

  const handleSubmit = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return alert("Please enter a valid email address.");
    } 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Pressable onPress={()=>{navigation.goBack()}} style={{position:"absolute",left:SPACING.space_8,top:0}}>
            <AntDesign name="close" size={FONTSIZE.size_30} color={COLORS.White} style={{padding:SPACING.space_8,borderRadius:BORDERRADIUS.radius_25}}/>
          </Pressable>
        <View style={{flex:1}}>
          <Text style={[styles.textWhite22Bold,{textAlign:"center"}]} numberOfLines={1}>
              Log in
          </Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",gap:SPACING.space_4}}>
          <View style={styles.logoContainer}>
              <Text style={[styles.logo,styles.textWhite20Bold,,{color:COLORS.Black}]}>M</Text>
          </View>
          <Text style={[styles.textWhite20Bold,{color:COLORS.OrangeRed}]}>
              unchyroll
          </Text>
        </View>
        <View style={{gap:SPACING.space_6}}>
          <Text style={styles.textWhite18Bold}>Classic anime jams,epic movies and endless shows.They're all here!</Text>
        </View>
        <View style={{gap:SPACING.space_16}}>
          <TextInput
            label="Email"
            value={email}
            keyboardType = "email-address"
            onChangeText={text => setEmail(text)}
            cursorColor = {COLORS.OrangeRed}
            selectionColor = {COLORS.OrangeRed}
            outlineColor = {COLORS.OrangeRed}
            underlineColor = {COLORS.White}
            activeUnderlineColor = {COLORS.OrangeRed}
            textColor = {COLORS.White}
            activeOutlineColor = {COLORS.OrangeRed}
            selectionHandleColor = {COLORS.OrangeRed}
            theme={{
              colors: {
                onSurfaceVariant : COLORS.WhiteRGBA60,
                surfaceVariant : COLORS.WhiteRGBA10,
              },
            }}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={!showPassword ? 'eye-off' : 'eye'}
                color={COLORS.White} 
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            cursorColor = {COLORS.OrangeRed}
            selectionColor = {COLORS.OrangeRed}
            outlineColor = {COLORS.OrangeRed}
            underlineColor = {COLORS.White}
            activeUnderlineColor = {COLORS.OrangeRed}
            textColor = {COLORS.White}
            activeOutlineColor = {COLORS.OrangeRed}
            selectionHandleColor = {COLORS.OrangeRed}
            theme={{
              colors: {
                onSurfaceVariant : COLORS.WhiteRGBA60,
                surfaceVariant : COLORS.WhiteRGBA10,
              },
            }}
          />
        </View>
        <Animated.View 
          style={[styles.loginBtn,
              (email&&password)?{backgroundColor:COLORS.OrangeRed}:{backgroundColor:COLORS.Black}
          ]}
        >
          <Animated.View 
              style={[
                  (email&&password)?{}:{borderWidth:SPACING.space_2,borderColor:COLORS.DimGrey},
                  (email&&password)?{backgroundColor:loginBtnAnimatedPress.backgroundColor}:{}
              ]}
          >
            <Pressable disabled={!(email&&password)} onPress={handleSubmit}
                style={[(email&&password)?{padding:SPACING.space_12}:{padding:SPACING.space_10}]}
                onPressIn={loginBtnAnimatedPress.animateColorPressIn}
                onPressOut={loginBtnAnimatedPress.animateColorPressOut}
            >
                <Text 
                    style={[
                        styles.loginBtnText,(email&&password)?{color:COLORS.Black}:{color:COLORS.DimGrey}
                    ]}
                >LOG IN</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
        <View>
          <TouchableOpacity activeOpacity={.8} onPress={()=>{navigation.navigate("Register")}} style={{padding:SPACING.space_4}}>
            <Text style={[styles.textWhite16Bold,{color:COLORS.OrangeRed}]}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor:COLORS.Black,
    paddingTop : statusBarHeight + SPACING.space_8,
  },
  header : {
    flexDirection : "row",
    padding:SPACING.space_15,
    gap : SPACING.space_15,
    alignItems:"center",
  },
  textWhite22Bold : {
    fontSize:FONTSIZE.size_22,
    fontFamily:FONTFAMILY.lato_bold,
    color:COLORS.White,
  },
  textWhite20Bold : {
      fontFamily : FONTFAMILY.lato_black,
      fontSize : FONTSIZE.size_24,
      color : COLORS.White,
      textAlign:"center"
  },
  textWhite18Bold : {
    fontFamily : FONTFAMILY.lato_bold,
    fontSize : FONTSIZE.size_16,
    color : COLORS.White,
    textAlign:"center"
  },
  textWhite16Bold : {
    fontFamily : FONTFAMILY.lato_bold,
    fontSize : FONTSIZE.size_16,
    color : COLORS.White,
    textAlign:"center"
  },
  mainContainer : {
    padding:SPACING.space_15,
    gap : SPACING.space_15,
  },
  logoContainer : {
      backgroundColor:COLORS.OrangeRed,
      borderRadius:BORDERRADIUS.radius_25
  },
  logo : {
      padding:SPACING.space_8,
      paddingHorizontal:SPACING.space_10,
  },
  loginBtn : {
      marginTop : SPACING.space_15
  },
  loginBtnText : {
      fontFamily : FONTFAMILY.lato_black,
      fontSize : FONTSIZE.size_14,
      textTransform:"uppercase",
      alignSelf : "center"
  }
})