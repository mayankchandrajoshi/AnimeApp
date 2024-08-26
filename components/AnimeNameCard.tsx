import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'

interface AnimeNameCardProps {
    id : number,
    name :string,
    image_url : string,
    width : number,
    viewAnime : (id:number)=>void
}

const AnimeNameCard:React.FC<AnimeNameCardProps> = ({id,name,image_url,width,viewAnime}) => {
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
            <TouchableOpacity
            activeOpacity={1}
            style={[
                styles.container,
                { width },
            ]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={()=>viewAnime(id)}
        >
            <Image
                style={[styles.cardImage,{ flex:1 }]}
                source={{uri: image_url}}
            />
            <View style ={styles.cardDetailsContainer}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                    {name}
                </Text>
            </View>
        </TouchableOpacity>
        </Animated.View>
    )
}

export default AnimeNameCard

const styles = StyleSheet.create({
    animatedWrapper : {
        borderRadius : BORDERRADIUS.radius_4,
        backgroundColor : COLORS.Black,
    },
    container : {
        flex : 1,
        overflow : "hidden",
        borderRadius : BORDERRADIUS.radius_4,
        borderColor : COLORS.WhiteRGBA15,
        borderWidth : 2
    },
    cardImage : {
        aspectRatio: 2 / 3,
    },
    cardDetailsContainer : {
        flex : 1,
        padding:SPACING.space_4,
    },
    cardTitle : {
        fontFamily : FONTFAMILY.lato_bold,
        fontSize : FONTSIZE.size_14,
        color : COLORS.WhiteRGBA75,
    },
})