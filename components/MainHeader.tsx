import { Animated, Pressable, StatusBar, StyleSheet, Text, Vibration, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes';
import swfFilterStore from '../store/swfFilterStore';
import { Fontisto } from '@expo/vector-icons';
import statusBarHeight from '../utils/getStatusBarHeight';
import useAnimatedPress from '../utils/animatedPress';

interface headerProps  {
    screenName : string,
    searchFunction : ()=>void,
    SWFFunction : () =>void
}

const MainHeader:React.FC<headerProps> = ({screenName,searchFunction,SWFFunction}) => {

    const [ showSearchTooltip,setShowSearchTooltip ] = useState(false);

    const { isSWFEnabled } = swfFilterStore();

    const { backgroundColor: searchBtnBackgroundColor,animateColorPressIn: animateColorPressInSearchBtn,animateColorPressOut: animateColorPressOutSearchBtn } = useAnimatedPress("transparent", COLORS.WhiteRGBA15,200,400);
    
  return (
    <View style={styles.headerContainer}>
        <View style={styles.screenNameContainer}>
            <Text style={styles.screenName}>{screenName}</Text>
        </View>
        <View style={styles.subContainer}>
            <Pressable 
                style={[
                    styles.swfContainer,
                    isSWFEnabled?{backgroundColor:COLORS.Lime}:{backgroundColor:COLORS.Red}
                ]}
                onPress={SWFFunction}
            >
                <Text style={styles.swf}>
                    {
                        isSWFEnabled?"SWF":"NSWF"
                    }
                </Text>
            </Pressable>
            <Animated.View style={[{backgroundColor:searchBtnBackgroundColor,borderRadius:SPACING.space_24}]}>
                <Pressable 
                    style={styles.searchIconContainer}
                    onPress={(searchFunction)}
                    onPressIn={animateColorPressInSearchBtn}
                    onPressOut={()=>{animateColorPressOutSearchBtn();setTimeout(()=>setShowSearchTooltip(false),700)}}
                    onLongPress={()=>{Vibration.vibrate(100);setShowSearchTooltip(true)}}
                >
                    <Fontisto name="search" size={FONTSIZE.size_22} color={COLORS.White} />
                    {showSearchTooltip && <Text style={[styles.iconToolTip,{ width : 80 }]}>
                        Search
                    </Text>}
                </Pressable>
            </Animated.View>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    headerContainer : {
        paddingLeft : SPACING.space_15,
        paddingRight : SPACING.space_8,
        paddingTop:statusBarHeight + SPACING.space_8,
        paddingBottom : SPACING.space_8,
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor : COLORS.Black
    },
    screenNameContainer : {

    },
    screenName : {
        fontSize:FONTSIZE.size_20,
        fontFamily:FONTFAMILY.lato_bold,
        color:COLORS.White,
    },
    subContainer : {
        flexDirection:"row",
        gap:SPACING.space_10,
        alignItems : "center"
    },
    swfContainer : {
        paddingVertical:SPACING.space_4,
        paddingHorizontal : SPACING.space_8,
        borderRadius : BORDERRADIUS.radius_8
    },
    swf : {
        fontFamily : FONTFAMILY.lato_bold,
        fontSize : FONTSIZE.size_16,
        color : COLORS.White
    },
    searchIconContainer : {
        padding:SPACING.space_8,
        borderRadius : SPACING.space_16
    },
    iconToolTip : {
        position : "absolute",
        bottom:'-180%',
        right : "-0%",
        textAlign : "center",
        backgroundColor : COLORS.White,
        fontSize:FONTSIZE.size_14,
        fontFamily:FONTFAMILY.lato_regular,
        color:COLORS.Black,
        paddingHorizontal : SPACING.space_16,
        paddingVertical:SPACING.space_8,
        borderRadius : SPACING.space_2,
        elevation: 5,
        shadowColor: COLORS.Black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
})

export default MainHeader