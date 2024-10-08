import { Dimensions, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'
import swfFilterStore from '../store/swfFilterStore';
import statusBarHeight from '../utils/getStatusBarHeight';
import * as NavigationBar from 'expo-navigation-bar';

const { height } = Dimensions.get("screen");

const SWFFilterScreen = () => {

    const { isSWFEnabled,enableSWF,disableSWF } = swfFilterStore();

    const [ swfEnabled, setSwfEnabled] = useState(isSWFEnabled);

    useEffect(()=>{
        NavigationBar.setBackgroundColorAsync(COLORS.Black);
    },[])

    useEffect(() => {
        const handler = setTimeout(() => {
            swfEnabled?enableSWF():disableSWF();
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [swfEnabled]);

  return (
    <View style = {styles.screenContainer}>
        <View style = {styles.headerContainer}>
            <Text style = {styles.headerText}>SWF Settings</Text>
        </View>
        <View style = {styles.contentContainer}>
            <Text style = {styles.sectionHeading}>Safe Browsing</Text>
            <TouchableOpacity activeOpacity={.8} 
                onPress={()=>setSwfEnabled(true)}
                style = {styles.filterContainer}
            >
                <View style = {[
                    styles.radioWrapper,
                    swfEnabled?{borderColor : COLORS.Lime}:{borderColor : COLORS.WhiteRGBA60}
                ]}
                >
                    <View style = {[
                        styles.radioInnerCircle,
                        swfEnabled?{backgroundColor : COLORS.Lime}:{backgroundColor : COLORS.Black}
                    ]}></View>
                </View>
                <View style = {styles.filterDetailsWrapper}>
                    <View style = {styles.filterHeader}>
                        <Text style={[styles.filterLabel,{backgroundColor:COLORS.Lime}]}>SFW</Text>
                        <Text style={styles.filterDescription}>Safe for work </Text>
                    </View>
                    <View>
                        <Text style = {styles.filterDetails}>
                            The system will try to avoid comics with Hentai anime from appearing in the list.
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.8} 
                onPress={()=>setSwfEnabled(false)}
                style = {styles.filterContainer}
            >
                <View style = {[
                    styles.radioWrapper,
                    !swfEnabled?{borderColor : COLORS.Red}:{borderColor : COLORS.WhiteRGBA60}
                ]}
                >
                    <View style = {[
                        styles.radioInnerCircle,
                        !swfEnabled?{backgroundColor : COLORS.Red}:{backgroundColor : COLORS.Black}
                    ]}></View>
                </View>
                <View style = {styles.filterDetailsWrapper}>
                    <View style = {{ flexDirection : "row",gap:SPACING.space_15 }}>
                        <Text style={[styles.filterLabel,{backgroundColor:COLORS.Red}]}>NSFW</Text>
                        <Text style={styles.filterDescription}>Not Safe for work </Text>
                    </View>
                    <View>
                        <Text style = {styles.filterDetails}>
                        The system does not block Hentai Anime.
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default SWFFilterScreen

const styles = StyleSheet.create({
    screenContainer : {
        flex:1,
        backgroundColor : COLORS.Black,
        paddingTop : statusBarHeight + SPACING.space_15, 
    },
    headerContainer : {
        marginHorizontal : SPACING.space_15,
        paddingVertical : SPACING.space_15,
        alignItems : 'center',
        borderBottomWidth : 1,
        borderBottomColor : COLORS.WhiteRGBA75
    },
    headerText : {
        fontFamily : FONTFAMILY.lato_bold,
        fontSize : FONTSIZE.size_24,
        color : COLORS.White
    },
    contentContainer : {
        marginHorizontal : SPACING.space_15,
        paddingVertical : SPACING.space_15,
        marginTop : SPACING.space_28,
        gap : SPACING.space_28
    },
    sectionHeading : {
        fontFamily : FONTFAMILY.lato_bold,
        fontSize : FONTSIZE.size_20,
        color : COLORS.White
    },
    filterContainer : {
        flexDirection : "row",
        alignItems : "flex-start",
        gap : SPACING.space_16
    },
    radioWrapper : {
        width : SPACING.space_4*9,
        height : SPACING.space_4*9,
        padding : SPACING.space_6,
        borderWidth : 1,
        borderRadius : BORDERRADIUS.radius_20,
    },
    radioInnerCircle : {
        flex:1,
        borderRadius : BORDERRADIUS.radius_15,
        backgroundColor : COLORS.Lime
    },
    filterDetailsWrapper : {
        flex : 1,
        gap : SPACING.space_12,
        paddingVertical : SPACING.space_6
    },
    filterHeader : {
        flexDirection : "row"
        ,gap:SPACING.space_15
    },
    filterLabel : {
        fontFamily : FONTFAMILY.lato_bold,
        fontSize : FONTSIZE.size_14,
        color : COLORS.Black,
        paddingVertical : SPACING.space_4,
        paddingHorizontal : SPACING.space_8,
        borderRadius : BORDERRADIUS.radius_8
    },
    filterDescription : {
        fontFamily : FONTFAMILY.lato_regular,
        fontSize : FONTSIZE.size_16,
        color : COLORS.WhiteRGBA75

    },
    filterDetails : {
        fontFamily : FONTFAMILY.lato_regular,
        fontSize : FONTSIZE.size_14,
        color : COLORS.WhiteRGBA60,
    }
})