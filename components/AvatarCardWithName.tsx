import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'


const { width } = Dimensions.get("screen")

const AvatarCardWithName:React.FC<{id:number,image:string,name:string,navigate:()=>VideoDecoderInit}> = ({id,image,name,navigate}) => {
  return (
    <Pressable onPress={navigate} style={styles.wrapper}>
        <Image source={{uri:image}} alt='avatar' style={styles.image}/>
        <Text style={styles.text} numberOfLines={2}>{name}</Text>
    </Pressable>
  )
}

export default AvatarCardWithName

const styles = StyleSheet.create({
    wrapper : {
        flex:1,
        padding:SPACING.space_10,
        gap:SPACING.space_10,
        backgroundColor:COLORS.WhiteRGBA15,
        borderRadius:SPACING.space_10,
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