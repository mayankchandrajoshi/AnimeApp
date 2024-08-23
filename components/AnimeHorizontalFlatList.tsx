import { Dimensions, StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'
import AnimeCard from './AnimeCard'

const { width,height } = Dimensions.get("screen")

const AnimeHorizontalFlatList = ({heading,animeList,navigation}:{heading:string,animeList:any[],navigation:any}) => {

    const viewAnime = (id:number)=>{
        navigation.push('AnimeDetails', {id});
    }
    
  return (
    <View>
        <View style={styles.headingContainer}>
            <Text style={styles.heading}>{heading}</Text>
        </View>
        <FlatList initialNumToRender={4} data={animeList} keyExtractor={(anime:any)=>anime.mal_id}
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardContainer}
            bounces={false}
            renderItem={({item,index})=>(
                <AnimeCard id={item.mal_id} name ={item.title_english?item.title_english:item.title} image_url ={item.images.jpg.large_image_url?item.images.jpg.large_image_url:item.images.jpg.image_url} type ={item.type} width={width/2.5} index={index} isBoundaryCard={(index===animeList.length-1||index===0)?true:false} viewAnime={(id:number)=>{viewAnime(id)}} 
                />
            )}
        />
    </View>
  )
}

export default AnimeHorizontalFlatList

const styles = StyleSheet.create({
    headingContainer : {
        margin : SPACING.space_12,
        marginTop : SPACING.space_24
    },
    heading : {
        fontFamily : FONTFAMILY.lato_bold,
        color : COLORS.White,
        fontSize : FONTSIZE.size_16,
        textTransform : "uppercase"
    },
    cardContainer : {
        gap: SPACING.space_10,
    },
})