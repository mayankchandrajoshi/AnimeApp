import { Alert, Animated, Button, Dimensions, Image, Linking, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import statusBarHeight from '../utils/getStatusBarHeight'
import { TextInput, Tooltip } from 'react-native-paper'
import useAnimatedPress from '../utils/animatedPress'
import * as ImagePicker from 'expo-image-picker';

const { width,height } = Dimensions.get("screen")

const AccountRegisterScreen = ({navigation}:any) => {

  const [ image,setImage ] = useState<null|string>(null);
  const [ email,setEmail ]  = useState("");
  const [ password,setPassword ]  = useState("");
  const [ showPassword,setShowPassword ] = useState(false);
  const [ confirmPassword,setConfirmPassword ]  = useState("");
  const [ showConfirmPassword,setShowConfirmPassword ]  = useState(false);
  
  const createAccountBtnAnimatedPress = useAnimatedPress("transparent", COLORS.WhiteRGBA30, 200, 400);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant permission to access photos.',
        [
          {
            text: 'Open Settings',
            onPress: () => {
              Linking.openSettings();
            },
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); 
    }
  };

  const handleSubmit = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return alert("Please enter a valid email address.");
    } 
    if (password.length<8) {
      return alert("Password cannot be less than 8 character");
    } 
    if (confirmPassword!=password) {
      return alert("Password and confirm password doesn't match");
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
              Create Account
          </Text>
        </View>
      </View>
      <ScrollView style={styles.mainContainer} contentContainerStyle={{gap : SPACING.space_15,}}>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",gap:SPACING.space_4}}>
          <View style={styles.logoContainer}>
              <Text style={[styles.logo,styles.textWhite20Bold,,{color:COLORS.Black}]}>M</Text>
          </View>
          <Text style={[styles.textWhite20Bold,{color:COLORS.OrangeRed}]}>
              unchyroll
          </Text>
        </View>
        <View style={{gap:SPACING.space_6}}>
          <Text style={styles.textWhite18Bold}>Welcome to the home of anime fandom!</Text>
          <Text style={styles.textWhite18Bold}>Let's start by creating an account.</Text>
        </View>
        <View style={{gap:SPACING.space_16}}>
          <View style={{justifyContent:"center",alignItems:"center",marginVertical:SPACING.space_16}}>
            <TouchableOpacity activeOpacity={.8} onPress={pickImage}>
              {
                !image?<Image source={require("../assets/images/placeholders/profile_pic.jpg")} style={styles.userImg} />:<Image source={{ uri: image }} style={styles.userImg} />
              }
              <MaterialCommunityIcons name="camera-plus" size={FONTSIZE.size_30} color={COLORS.OrangeRed} style={{position:"absolute",right:0,bottom:0}}/>
            </TouchableOpacity>
          </View>
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
          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry={!showConfirmPassword}
            right={
              <TextInput.Icon
                icon={!showConfirmPassword ? 'eye-off' : 'eye'}
                color={COLORS.White} 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
            cursorColor = {COLORS.OrangeRed}
            selectionColor = {COLORS.OrangeRed}
            underlineColor = {COLORS.White}
            activeUnderlineColor = {COLORS.OrangeRed}
            textColor = {COLORS.White}
            outlineColor = {COLORS.OrangeRed}
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
              (image&&email&&password&&confirmPassword)?{backgroundColor:COLORS.OrangeRed}:{backgroundColor:COLORS.Black}
          ]}
        >
          <Animated.View 
              style={[
                  (image&&email&&password&&confirmPassword)?{}:{borderWidth:SPACING.space_2,borderColor:COLORS.DimGrey},
                  (image&&email&&password&&confirmPassword)?{backgroundColor:createAccountBtnAnimatedPress.backgroundColor}:{}
              ]}
          >
            <Pressable disabled={!(image&&email&&password&&confirmPassword)} onPress={handleSubmit}
                style={[(image&&email&&password&&confirmPassword)?{padding:SPACING.space_12}:{padding:SPACING.space_10}]}
                onPressIn={createAccountBtnAnimatedPress.animateColorPressIn}
                onPressOut={createAccountBtnAnimatedPress.animateColorPressOut}
            >
                <Text 
                    style={[
                        styles.loginBtnText,(image&&email&&password&&confirmPassword)?{color:COLORS.Black}:{color:COLORS.DimGrey}
                    ]}
                >CREATE ACCOUNT</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <Text style={[styles.textWhite16Bold]}>Already have an account?</Text>
          <TouchableOpacity activeOpacity={.8} onPress={()=>{navigation.navigate("Login")}} style={{padding:SPACING.space_4}}>
            <Text style={[styles.textWhite16Bold,{color:COLORS.OrangeRed}]}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default AccountRegisterScreen

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
  },
  userImg : {
    width: width<height?width/4:height/4,
    height :  width<height?width/4:height/4,
    borderRadius :  width<height?width/4:height/4,
  },
})