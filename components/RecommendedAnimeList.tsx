import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { animeRecommendation } from '../api/apicalls';
import AnimeCardGrid from './AnimeCardGrid';
import { COLORS, SPACING } from '../themes/themes';
import AnimeNameCardSkeleton from './AnimeNameCardSkeleton';
import AnimeNameCard from './AnimeNameCard';
import NoAnimeScreen from './NoAnimeScreen';

const { width,height } = Dimensions.get("screen");


const getRecommendedAnime = async(id:number)=>{
    try {
        const { data } = await axios.get(animeRecommendation(id));
        return data;
    } catch (error) {
        console.error(
        error,
        );
    }
}

const RecommendedAnimeList = ({id,navigation}:{id:number,navigation:any}) => {
    
    const [ isLoadingData,setIsLoadingData ] = useState<boolean>(true);
    const [ recommendedAnime,setRecommendedAnime ] = useState<any[]>([]);

    useEffect(()=>{
        setIsLoadingData(true);
        (async()=>{
            const { data } = await getRecommendedAnime(id);
            
            setRecommendedAnime(data);

            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsLoadingData(false);
        })();
    },[id])

    return (
        <View style={styles.container}>
            {isLoadingData?<FlatList data={new Array(17)} numColumns={3} keyExtractor={(item,index) => String(index)}
                style={styles.cardsWrapper} 
                columnWrapperStyle = {styles.cardsWrapperRow}
                contentContainerStyle = {{gap:SPACING.space_10}}
                renderItem={({item})=><AnimeNameCardSkeleton width={(width-(SPACING.space_15*2+SPACING.space_6*2))/3}/>}
            />:(
                recommendedAnime.length!==0?(
                <FlatList data={recommendedAnime} numColumns={3}
                    keyExtractor={(item,index) => String(index)}
                    style={[styles.cardsWrapper]} 
                    columnWrapperStyle = {styles.cardsWrapperRow}
                    contentContainerStyle = {{gap:SPACING.space_10}}
                    renderItem={({item,index})=><AnimeNameCard id={item.entry.mal_id} name ={item.entry.title_english||item.entry.title} image_url ={item.entry.images.jpg.large_image_url||item.entry.images.jpg.image_url}  width={(width-(SPACING.space_15*2+SPACING.space_6*2))/3} viewAnime={(id:number)=>{navigation.push('AnimeDetails', {id})}} />}
                />):<NoAnimeScreen heading="No Anime found" subHeading='Explore more anime' navigation={navigation}/>
            )}
        </View>
    )
}

export default RecommendedAnimeList

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: COLORS.Black,
        width:width,
        minHeight:height*.6,
        paddingVertical : SPACING.space_15
    },
    cardsWrapper : {
        flex:1,
        backgroundColor:COLORS.Black,
        gap:SPACING.space_10,
    },
    cardsWrapperRow : {
        gap:SPACING.space_6,
        backgroundColor:COLORS.Black,
        paddingHorizontal:SPACING.space_15,
    },
})