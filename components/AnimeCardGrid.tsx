import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'
import AnimeCardSkeleton from './AnimeCardSkeleton'
import AnimeCard from './AnimeCard'
import NoAnimeScreen from './NoAnimeScreen'

const { width } = Dimensions.get("screen");

interface AnimeCardGridProps {
    isLoadingData : boolean,
    isAllDataLoaded : boolean,
    animeList : any[],
    page : number,
    fetchMoreAnime : (page:number)=>void,
    viewAnime : (id :number)=> void,
    navigation : any
}

const AnimeCardGrid:React.FC<AnimeCardGridProps> = ({isLoadingData,isAllDataLoaded,animeList,page,fetchMoreAnime,viewAnime,navigation}) => {
  return (
    <View style={styles.container}>
        {isLoadingData?<FlatList data={new Array(16)} numColumns={2} keyExtractor={(item,index) => String(index)}
            style={[styles.cardsWrapper,{ paddingHorizontal:SPACING.space_15 }]} 
            columnWrapperStyle = {styles.cardsWrapperRow}
            renderItem={({item})=><AnimeCardSkeleton/>}
        />:(
            animeList.length!==0?<FlatList data={animeList} numColumns={2}
            onEndReached={()=>fetchMoreAnime(page)}  
            onEndReachedThreshold={0.8}
            keyExtractor={(item,index) => String(index)}
            style={[styles.cardsWrapper]} 
            columnWrapperStyle = {styles.cardsWrapperRow}
            renderItem={({item,index})=><View style={styles.cardWrapper}><AnimeCard id={item.mal_id} name ={item.title_english?item.title_english:item.title} image_url ={item.images.jpg.large_image_url?item.images.jpg.large_image_url:item.images.jpg.image_url} type ={item.type} width={(width/2)-(SPACING.space_15+SPACING.space_10/2)} index={index%2} isBoundaryCard={true} viewAnime={(id:number)=>{viewAnime(id)}} /></View>}
            ListFooterComponent={
                !isAllDataLoaded ? <View style={{paddingVertical:SPACING.space_15}}><ActivityIndicator size="large" color={COLORS.OrangeRed}/></View> : null
            }
            />:<NoAnimeScreen heading="No Anime found" subHeading='Explore more anime' navigation={navigation}/>
        )}
</View>
  )
}

export default AnimeCardGrid

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: COLORS.Black,
    },
    cardsWrapper : {
        backgroundColor:COLORS.Black,
        gap:SPACING.space_10,
        marginTop : SPACING.space_6
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