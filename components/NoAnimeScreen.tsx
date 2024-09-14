import { Animated, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'
import useAnimatedPress from '../utils/animatedPress'

const { width } = Dimensions.get("screen")

interface Props {
    heading : string,
    subHeading : string,
    navigation : any
}

const NoAnimeScreen:React.FC<Props> = ({heading,subHeading,navigation}) => {

    const {backgroundColor,animateColorPressIn,animateColorPressOut} = useAnimatedPress("transparent", COLORS.BlackRGB30,300,400);

    return (
        <View
            style={[styles.container]}
        >
            <AntDesign name="frown" size={FONTSIZE.size_30*5} color={COLORS.OrangeRed} style={{alignSelf : "center"}} />
            <Text style={styles.heading}>{heading}</Text>
            <Text style={styles.subHeading}>{subHeading}</Text>
            <View style={styles.buttonContainer}>
                <Animated.View style={[styles.animatedContainer,{backgroundColor}]}>
                    <Pressable onPress={()=>{navigation.navigate("Browse")}} onPressIn={animateColorPressIn} onPressOut={animateColorPressOut} style={{width:"100%",alignItems:"center"}}>
                        <Text style={styles.buttonText}>BROWSE ALL</Text>
                    </Pressable>
                </Animated.View>
            </View>
        </View>
    )
}

export default NoAnimeScreen

const styles = StyleSheet.create({
    container : {
        flex:1,
        width:width,
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
    },
    buttonContainer : {
        backgroundColor : COLORS.OrangeRed,
        marginTop : SPACING.space_15,
    },
    animatedContainer : {
        justifyContent : "center",
        alignItems : "center",
    },
    buttonText : {
        fontFamily : FONTFAMILY.lato_black,
        fontSize : FONTSIZE.size_14,
        textTransform : "uppercase",
        padding:SPACING.space_15,
    }
})