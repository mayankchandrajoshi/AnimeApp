import { ActivityIndicator, Animated, Dimensions, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { animeEpisodes } from '../api/apicalls';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes';
import NoDataAvailable from './NoDataAvailable';
import { MaterialIcons } from '@expo/vector-icons';
import { Rect } from 'react-native-svg';
import ContentLoader from 'react-content-loader/native';

const { width } = Dimensions.get("screen");

const getAnimeEpisodes = async(id:number,page:number)=>{
    try {
        const { data } = await axios.get(animeEpisodes(id,page));
        return data;
    } catch (error) {
        console.log(error);
    }
}

const AnimeEpisodesList = ({id,navigation}:{id:number,navigation:any}) => {

    const [ isLoadingData,setLoadingData ] = useState(true);
    const [ isAllDataLoaded,setAllDataLoaded ] = useState(true);
    const [ animeEpisodes,setAnimeEpisodes ] = useState<any[]>([]);
    const [ page,setPage ] = useState(1);

    useEffect(()=>{
        setLoadingData(true);
        const listenerId = setTimeout(()=>{
            (
                async()=>{
                const  data  = await getAnimeEpisodes(id,1);
                setAnimeEpisodes(data.data);
        
                setLoadingData(false);
                setPage(2);
                setAllDataLoaded(false);
        
                if(!data.pagination.has_next_page){
                    setAllDataLoaded(true);
                }
                }
            )();
        },500)

        return ()=>{
            clearTimeout(listenerId);
        }
    },[id])
    
    
    const fetchMoreEpisodes = async (page:number) =>{

        if(isAllDataLoaded) return;

        const data = await getAnimeEpisodes(id,page);
        setPage(page+1);
        setAnimeEpisodes((prevData)=>[...prevData,...data.data]);

        if(!data.pagination.has_next_page){
            setAllDataLoaded(true);
        }
    }

    return (
        <View style={styles.container}>
            {isLoadingData?<FlatList data={new Array(16)} keyExtractor={(item,index) => String(index)}
            style={[styles.cardsWrapper]}
            contentContainerStyle={{gap:SPACING.space_8}}
            renderItem={({item})=>(
                <ContentLoader
                    speed={1}
                    width={width - SPACING.space_15*2}
                    height={FONTSIZE.size_16+SPACING.space_10*2}
                    viewBox={`0 0 ${width - SPACING.space_15*2} ${FONTSIZE.size_16+SPACING.space_10*2}`}
                    backgroundColor={COLORS.DullBlack}
                    foregroundColor={COLORS.Grey}
                    >
                    <Rect x="0" y="0" rx={BORDERRADIUS.radius_8} ry={BORDERRADIUS.radius_8} width={width - SPACING.space_15*2} height={FONTSIZE.size_16+SPACING.space_10*2} />
                </ContentLoader>
            )}
        />:(
            animeEpisodes.length!==0?<FlatList data={animeEpisodes}
            onEndReached={()=>fetchMoreEpisodes(page)}  
            onEndReachedThreshold={0.8}
            keyExtractor={(item,index) => String(index)}
            style={[styles.cardsWrapper]} 
            renderItem={({item,index})=>(
                <TouchableOpacity activeOpacity={.8} onPress={()=>navigation.navigate("EpisodesDetails",{animeId:id,episodeId:item.mal_id})}>
                    <Animated.View style={styles.cardWrapper}>
                        <Text style={styles.cardTitle}>
                            Ep {item.mal_id}
                        </Text>
                        <View style={{flex:1}}>
                            <Text style={styles.cardTitle} numberOfLines={1}>
                                {item.title}
                            </Text>
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={SPACING.space_20} color={COLORS.White} />
                    </Animated.View>
                </TouchableOpacity>
            )}
            ListFooterComponent={
                !isAllDataLoaded ? <View style={{paddingVertical:SPACING.space_15}}><ActivityIndicator size="large" color={COLORS.OrangeRed}/></View> : null
            }
            />:<NoDataAvailable heading='No Data Available' subHeading='Will be updated shortly'/>
        )}
        </View>
    )
}

export default AnimeEpisodesList

const styles = StyleSheet.create({
    container: {
        width:width,
        backgroundColor: COLORS.Black,
        padding:SPACING.space_15
    },
    cardsWrapper : {
        backgroundColor:COLORS.Black,
    },
    cardWrapper: {
        flex: 1,
        flexDirection:"row",
        alignItems : "center",
        gap:SPACING.space_10,
        marginBottom: SPACING.space_8,
        paddingVertical : SPACING.space_10,
        paddingHorizontal : SPACING.space_10,
        backgroundColor: COLORS.WhiteRGBA15,
        borderRadius : BORDERRADIUS.radius_8
    },
    cardTitle : {
        fontFamily: FONTFAMILY.lato_regular,
        fontSize: FONTSIZE.size_16,
        color: COLORS.White
    }
})