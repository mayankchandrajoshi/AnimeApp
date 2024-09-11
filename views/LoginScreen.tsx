import { Animated, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'
import statusBarHeight from '../utils/getStatusBarHeight'
import { AntDesign } from '@expo/vector-icons'
import { ActivityIndicator, TextInput } from 'react-native-paper'
import useAnimatedPress from '../utils/animatedPress'
import userStore from '../store/userStore'
import axios from 'axios'
import { userInterface } from '../interface/commonInterface'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

const LoginScreen = ({navigation}:any) => {
  const [ email,setEmail ]  = useState("");
  const [ password,setPassword ]  = useState("");
  const [ showPassword,setShowPassword ] = useState(false);
  const [ isLoginInProcess,setIsLoginInProcess ] = useState(false);

  const { login } = userStore();

  const loginBtnAnimatedPress = useAnimatedPress("transparent", COLORS.WhiteRGBA30, 200, 400);

  const handleSubmit = async () => {
    setIsLoginInProcess(true);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setIsLoginInProcess(false);
      return Toast.show({
        type: ALERT_TYPE.WARNING,
        textBody: 'Please enter a valid email address.',
      })
    } 

    try {
      const config = { headers: { "Content-Type": "application/json" },withCredentials: true };
      
      await axios.post('https://anime-backend-delta.vercel.app/api/v1/login',{
        email,password
      },config)

      const { data:{user} }:{ data :{user:userInterface}} = await axios.get('https://anime-backend-delta.vercel.app/api/v1/me',{
        ...config,
      });

      login(user);

    } catch (error:any) {
      if(error.response.data.message) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          textBody: error.response.data.message,
        })
      }
      else {
        console.log(error);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          textBody: "An error occurred.",
        })
      }
    }
    finally{
      setIsLoginInProcess(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Pressable onPress={()=>{navigation.goBack()}} style={{position:"absolute",left:SPACING.space_8,top:0,zIndex:10,padding:SPACING.space_8,borderRadius:BORDERRADIUS.radius_25}}>
            <AntDesign name="close" size={FONTSIZE.size_30} color={COLORS.White}/>
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
              ((email&&password)&&!isLoginInProcess)?{backgroundColor:COLORS.OrangeRed}:{backgroundColor:COLORS.Black}
          ]}
        >
          <Animated.View 
              style={[
                  ((email&&password)&&!isLoginInProcess)?{}:{borderWidth:SPACING.space_2,borderColor:COLORS.DimGrey},
                  ((email&&password)&&!isLoginInProcess)?{backgroundColor:loginBtnAnimatedPress.backgroundColor}:{}
              ]}
          >
            <Pressable disabled={(!(email&&password)||isLoginInProcess)} onPress={handleSubmit}
                style={[((email&&password)&&!isLoginInProcess)?{padding:SPACING.space_12}:{padding:SPACING.space_10}]}
                onPressIn={loginBtnAnimatedPress.animateColorPressIn}
                onPressOut={loginBtnAnimatedPress.animateColorPressOut}
            >
                {!isLoginInProcess?<Text 
                    style={[
                        styles.loginBtnText,((email&&password)&&!isLoginInProcess)?{color:COLORS.Black}:{color:COLORS.DimGrey}
                    ]}
                >LOG IN</Text>:(
                  <ActivityIndicator size={FONTSIZE.size_18} color={COLORS.DimGrey} />
                )}
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