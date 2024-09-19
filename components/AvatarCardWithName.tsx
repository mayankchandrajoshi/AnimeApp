import { Animated, Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'


const { width } = Dimensions.get("screen")

const AvatarCardWithName:React.FC<{id:number,image:string,name:string,navigate:()=>VideoDecoderInit}> = ({id,image,name,navigate}) => {
    const cardOpacity = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.parallel([
            Animated.timing(cardOpacity, {
                toValue: 0.8,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePressOut = () => {
        Animated.parallel([
            Animated.timing(cardOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };
    return (
        <Animated.View style={[styles.animatedWrapper,{opacity:cardOpacity}]}>
            <Pressable onPress={navigate} style={styles.wrapper} onPressIn={handlePressIn}
            onPressOut={handlePressOut}>
                <Image source={{uri:image}} alt='avatar' style={styles.image}/>
                <Text style={styles.text} numberOfLines={2}>{name}</Text>
            </Pressable>
        </Animated.View>
    )
}

export default AvatarCardWithName

const styles = StyleSheet.create({
    animatedWrapper : {
        flex:1,
        borderRadius : BORDERRADIUS.radius_10,
        backgroundColor : COLORS.Black,
    },
    wrapper : {
        flex:1,
        padding:SPACING.space_10,
        gap:SPACING.space_10,
        backgroundColor:COLORS.WhiteRGBA15,
        borderRadius:BORDERRADIUS.radius_10,
        maxWidth:width/3-SPACING.space_15,
    },
    image : {
        borderRadius:width/3,
        aspectRatio:1
    },
    text : {
        color:COLORS.White,
        fontFamily:FONTFAMILY.lato_bold,
        fontSize:FONTSIZE.size_14,
        textAlign:"center"
    }
})