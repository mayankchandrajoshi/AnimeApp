import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'


const { width } = Dimensions.get("screen")

const CharacterAvatarCard:React.FC<{id:number,characterImg:string,name:string,navigation:any}> = ({id,characterImg,name,navigation}) => {
  return (
    <Pressable onPress={()=>{navigation.navigate("CharacterDetails",{id})}} style={styles.wrapper}>
        <Image source={{uri:characterImg}} alt='character_image' style={styles.image}/>
        <Text style={styles.text} numberOfLines={2}>{name}</Text>
    </Pressable>
  )
}

export default CharacterAvatarCard

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