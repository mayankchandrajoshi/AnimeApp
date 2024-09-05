import { Animated, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes';
import useAnimatedPress from '../utils/animatedPress';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get("screen")

const AuthenticationScreen = ({navigation}:any) => {

    const { backgroundColor: backgroundColorLoginBtn,animateColorPressIn: animateColorPressInLoginBtn,animateColorPressOut: animateColorPressOutLoginBtn } = useAnimatedPress(COLORS.MustardYellow, COLORS.MustardYellow80,200,400);

    const { backgroundColor: backgroundColorCancelBtn,animateColorPressIn: animateColorPressInCancelBtn,animateColorPressOut: animateColorPressOutCancelBtn } = useAnimatedPress(COLORS.WhiteRGBA20, COLORS.WhiteRGBA15,200,400);

    return (
        <View style={styles.container}>
            <Image source={require("../assets/images/app_authentication_screenImg.png")}/>
            <LinearGradient colors={["transparent",COLORS.Black]} locations={[0.0, 0.3]} style = {styles.subContainer}>
                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",gap:SPACING.space_4}}>
                    <View style={styles.logoContainer}>
                        <Text style={[styles.logo,styles.textWhite20Bold,,{color:COLORS.Black}]}>M</Text>
                    </View>
                    <Text style={[styles.textWhite20Bold,{color:COLORS.OrangeRed}]}>
                        unchyroll
                    </Text>
                </View>
                <Text style={styles.textWhite18Bold}> All your favourite anime.All in one place</Text>
                <View style={styles.buttonsContainer}>
                    <Animated.View style={[{backgroundColor:backgroundColorLoginBtn,borderRadius : BORDERRADIUS.radius_4}]}>
                        <Pressable onPress={()=>{navigation.push("Login")}} onPressIn={animateColorPressInLoginBtn} onPressOut={animateColorPressOutLoginBtn} style={styles.btn}>
                            <Text style={[styles.textWhite14Bold,{color:COLORS.Black}]}>LOG IN</Text>
                        </Pressable>
                        </Animated.View>
                    <Animated.View style={[{backgroundColor:backgroundColorCancelBtn,borderRadius : BORDERRADIUS.radius_4}]}>
                        <Pressable onPress={()=>{}} onPressIn={animateColorPressInCancelBtn} onPressOut={animateColorPressOutCancelBtn} style={styles.btn}>
                            <Text style={styles.textWhite14Bold}>LOGIN WITH GOOGLE</Text>
                        </Pressable>
                    </Animated.View>
                </View>
                <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                    <Text style={[styles.textWhite14Bold]}>or</Text>
                    <TouchableOpacity activeOpacity={.8} onPress={()=>{navigation.push("Register")}} style={{padding:SPACING.space_4}}>
                        <Text style={[styles.textWhite14Bold,{color:COLORS.OrangeRed}]}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    )
}

export default AuthenticationScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor:COLORS.Black
    },
    subContainer : {
        padding:SPACING.space_16,
        position:"absolute",
        bottom:0,
        left:0,
        right:0,
        gap : SPACING.space_24
    },
    textWhite20Bold : {
        fontFamily : FONTFAMILY.lato_black,
        fontSize : FONTSIZE.size_24,
        color : COLORS.White,
        textAlign:"center"
    },
    textWhite18Bold : {
        fontFamily : FONTFAMILY.lato_bold,
        fontSize : FONTSIZE.size_18,
        color : COLORS.White,
        textAlign:"center"
    },
    textWhite14Bold : {
        fontFamily : FONTFAMILY.lato_bold,
        fontSize : FONTSIZE.size_14,
        color : COLORS.White,
        textAlign:"center"
    },
    logoContainer : {
        backgroundColor:COLORS.OrangeRed,
        borderRadius:BORDERRADIUS.radius_25
    },
    logo : {
        padding:SPACING.space_8,
        paddingHorizontal:SPACING.space_10,
    },
    buttonsContainer : {
        gap : SPACING.space_15
    },
    btn : {
        padding:SPACING.space_10,
    },
})