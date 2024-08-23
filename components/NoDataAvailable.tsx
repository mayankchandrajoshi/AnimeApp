import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'
import { AntDesign } from '@expo/vector-icons'

const { height } = Dimensions.get("screen")

const NoDataAvailable = ({heading,subHeading}:{heading:string,subHeading:string}) => {
  return (
    <View
        style={[styles.container]}
    >
        <AntDesign name="frown" size={FONTSIZE.size_30*5} color={COLORS.OrangeRed} style={{alignSelf : "center"}} />
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
    </View>
  )
}

export default NoDataAvailable

const styles = StyleSheet.create({
    container : {
        flex:1,
        minHeight:height*.6,
        justifyContent:"center",
        gap : SPACING.space_12,
        paddingHorizontal : SPACING.space_15,
        backgroundColor:COLORS.Black
    },
    heading : {
        alignSelf : "center",
        fontFamily : FONTFAMILY.lato_bold,
        fontSize : FONTSIZE.size_18,
        color : COLORS.White,
        marginTop : SPACING.space_8
    },
    subHeading : {
        alignSelf : "center",
        fontFamily : FONTFAMILY.lato_bold,
        fontSize : FONTSIZE.size_16,
        color : COLORS.WhiteRGBA75
    }
})