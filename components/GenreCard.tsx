import { Animated, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes';
import useAnimatedPress from '../utils/animatedPress';

const GenreCard= ({item,navigation}:{item:{
    id:number,
    name:string,
    icon :  React.JSX.Element,
    backGroundImg : any,
  },navigation:any}) =>{
  
    const {backgroundColor,animateColorPressIn,animateColorPressOut} = useAnimatedPress(COLORS.BlackRGB60, COLORS.DarkGrey80,500,500);
  
    return (
      <ImageBackground
        source={item.backGroundImg }
        style={styles.backgroundImg}
      > 
        <Animated.View style={[{flex:1,backgroundColor}]}>
          <Pressable onPress={()=>navigation.push("GenreAnime",{id:item.id,name:item.name})} onPressIn={animateColorPressIn} onPressOut={animateColorPressOut} style={[styles.genreContainer]}>
            {item.icon}
            <Text style={styles.genre}>{item.name}</Text>
          </Pressable>
        </Animated.View>
      </ImageBackground>
    )
  }

export default GenreCard

const styles = StyleSheet.create({ 
    backgroundImg : {
        flex:1,
        aspectRatio:1.7,
        marginBottom:SPACING.space_8,
    },
    genreContainer : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap:SPACING.space_6
    },
    genre : {
        fontFamily : FONTFAMILY.lato_regular,
        fontSize : FONTSIZE.size_12,
        textTransform : "uppercase",
        color : COLORS.White
    }
})