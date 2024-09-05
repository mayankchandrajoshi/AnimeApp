import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../themes/themes'

const AppLoadingScreen = () => {
    return (
        <View style={{flex:1,backgroundColor:COLORS.Black,justifyContent:"center",alignItems:"center"}}>
            <Image source={require("../assets/splash.png")} resizeMode='contain'/>
        </View>
    )
}

export default AppLoadingScreen

const styles = StyleSheet.create({})