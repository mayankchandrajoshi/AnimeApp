import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'
import statusBarHeight from '../utils/getStatusBarHeight'
import axios from 'axios'
import { animeSingleEpisode } from '../api/apicalls'
import { RootStackParamList } from '../types/navigationTypes'
import { RouteProp, useRoute } from '@react-navigation/native'

type EpisodeDetailsScreenRouteProp = RouteProp<RootStackParamList, 'EpisodesDetails'>;

const getEpisodeData = async(id:number,episode:number) =>{
    try {
        const { data } = await axios.get(animeSingleEpisode(id,episode));
        return data;
    } catch (error) {
        console.log(error);
    }
}

const EpisodesDetailsScreen = ({navigation}:any) => {

    const { animeId,episodeId } = useRoute<EpisodeDetailsScreenRouteProp>().params;

    const [ episodeData,setEpisodeData ]  = useState<any>();

    useEffect(()=>{
        (async()=>{
            const { data } = await getEpisodeData(animeId,episodeId);
            setEpisodeData(data);
        })();
    },[animeId,episodeId])

    return (
        <View style={styles.showDetailsModal}>
            <View style={styles.animeDetailsModalHeader}>
                <Pressable onPress={() => navigation.goBack()}>
                    <AntDesign name="close" size={FONTSIZE.size_30} color={COLORS.White} />
                </Pressable>
            </View>
            {
                !episodeData? <ScrollView bounces={false} style={{flex:1}} contentContainerStyle={{flex:1,padding:SPACING.space_15,paddingBottom:SPACING.space_52}}>
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size={"large"} color={COLORS.OrangeRed}/>
                    </View>
                </ScrollView>:(
                    <ScrollView bounces={false} style={{flex:1}} contentContainerStyle={{padding:SPACING.space_15,paddingBottom:SPACING.space_52}}>
                        <Text style={[styles.textWhite20Bold,{color:COLORS.WhiteRGBA90,lineHeight:SPACING.space_24}]}>
                            {
                                episodeData.title
                            }
                            </Text>
                            <Text style={[styles.textWhite16Regular,{color:COLORS.WhiteRGBA75,lineHeight:SPACING.space_24}]}>
                            {
                                episodeData.synopsis?episodeData.synopsis:"No data available"
                            }
                        </Text>
                    </ScrollView>
                )
            }
        </View>
    )
}


export default EpisodesDetailsScreen

const styles = StyleSheet.create({
    showDetailsModal : {
        flex:1,
        backgroundColor:COLORS.Black,
        paddingTop : statusBarHeight + SPACING.space_8,
    },
    animeDetailsModalHeader : {
        flexDirection : "row",
        padding:SPACING.space_15,
        gap : SPACING.space_15,
        justifyContent:"flex-end",
    },
    textWhite20Bold : {
        fontSize:FONTSIZE.size_24,
        fontFamily:FONTFAMILY.lato_bold,
        color:COLORS.White,
        marginBottom : SPACING.space_10
    },
    textWhite16Regular : {
        fontSize:FONTSIZE.size_16,
        fontFamily:FONTFAMILY.lato_regular,
        color:COLORS.White,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})