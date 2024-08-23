import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import watchedListStore from '../store/watchedListStore'
import { COLORS, SPACING } from '../themes/themes';
import AnimeCardSkeleton from '../components/AnimeCardSkeleton';
import NoAnimeScreen from '../components/NoAnimeScreen';
import AnimeCard from '../components/AnimeCard';

const { width } = Dimensions.get("screen");

const MyWatchedListScreen = ({ navigation }:any) => {
  
    const [ isLoadingData,setLoadingData ] = useState(true);

    const { watchedList } = watchedListStore();

    useEffect(()=>{
        setTimeout(()=>{
        setLoadingData(false);
        },500)
    },[])

    const viewAnime = (id:number)=>{
        navigation.push('AnimeDetails', {id});
    }

    if(isLoadingData){
        return (
            <View style={styles.container}>
                <FlatList data={new Array(16)} numColumns={2} keyExtractor={(item,index) => String(index)}
                    style={[styles.cardsWrapper,{ paddingHorizontal:SPACING.space_15 }]} 
                    columnWrapperStyle = {styles.cardsWrapperRow}
                    renderItem={({item})=><AnimeCardSkeleton/>}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
        {
            watchedList.length === 0?<NoAnimeScreen heading='Your WatchedList needs some love.' subHeading="Let's watch awesome anime" navigation={navigation}/>:(
            <FlatList data={watchedList} numColumns={2}
                keyExtractor={(item,index) => String(index)}
                style={[styles.cardsWrapper]} 
                columnWrapperStyle = {styles.cardsWrapperRow}
                renderItem={({item,index})=><View style={styles.cardWrapper}><AnimeCard id={item.id} name ={item.name} image_url ={item.image_url} type ={item.type} width={(width/2)-(SPACING.space_15+SPACING.space_10/2)} index={index%2} isBoundaryCard={true} viewAnime={(id:number)=>{viewAnime(id)}} /></View>}
                />
            )
        }
        </View>
    )
}

export default MyWatchedListScreen

const styles = StyleSheet.create({
    container: {
        flex : 1,
        width:width,
        backgroundColor: COLORS.Black
    },
    cardsWrapper : {
        backgroundColor:COLORS.Black,
        gap:SPACING.space_10,
        marginTop : SPACING.space_10
    },
    cardsWrapperRow : {
        gap:SPACING.space_10,
        backgroundColor:COLORS.Black
    },
    cardWrapper: {
        flex: 1,
        marginBottom: SPACING.space_12,
    }
})