import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import watchListStore from '../store/watchListStore'
import { COLORS, SPACING } from '../themes/themes';
import AnimeCardSkeleton from '../components/AnimeCardSkeleton';
import NoAnimeScreen from '../components/NoAnimeScreen';
import AnimeCard from '../components/AnimeCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationTypes';

const { width } = Dimensions.get("screen");

const MyWatchListScreen = ({navigation}:any) => {
  
  const [ isLoadingData,setLoadingData ] = useState(true);

  const { watchList } = watchListStore();

  useEffect(()=>{
    setTimeout(()=>{
      setLoadingData(false);
    },500)
  },[])

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
        watchList.length === 0?<NoAnimeScreen heading='Your WatchList needs some love.' subHeading="Let's fill it up with awesome anime" navigation={navigation}/>:(
          <FlatList data={watchList} numColumns={2}
            keyExtractor={(item,index) => String(index)}
            style={[styles.cardsWrapper]} 
            columnWrapperStyle = {styles.cardsWrapperRow}
            renderItem={({item,index})=><View style={styles.cardWrapper}><AnimeCard id={item.id} name ={item.name} image_url ={item.image_url} type ={item.type} width={(width/2)-(SPACING.space_15+SPACING.space_10/2)} index={index%2} isBoundaryCard={true} viewAnime={(id:number)=>{navigation.push('AnimeDetails', {id})}} /></View>}
            />
        )
      }
    </View>
  )
}

export default MyWatchListScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
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