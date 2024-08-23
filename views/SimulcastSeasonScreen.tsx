import { ActivityIndicator, Animated, Dimensions, FlatList, Pressable,ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AnimeSeason } from '../enums/enums';
import { seasonInterface } from '../interface/commonInterface';
import useAnimatedPress from '../utils/animatedPress';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes';
import SeasonsListModal from '../components/SeasonsListModal';
import { AntDesign } from '@expo/vector-icons';
import swfFilterStore from '../store/swfFilterStore';
import axios from 'axios';
import { seasonalAnime } from '../api/apicalls';
import AnimeCardGrid from '../components/AnimeCardGrid';

const { width } = Dimensions.get("screen")

const getSeasonalAnime = async(selectedSeason:seasonInterface,isSWFEnabled:boolean,page:number)=>{
  try {
    let { data } = await axios.get(seasonalAnime(selectedSeason.year,selectedSeason.season,isSWFEnabled,page));
    return data;
  } catch (error) {
    console.error(
      error,
    );
  }
}

const SimulcastSeasonScreen = ({navigation}:any) => {
  const [ isLoadingData,setLoadingData ] = useState(true);
  const [ isAllDataLoaded,setAllDataLoaded ] = useState(false);
  const [ isShowModal,setIsShowModal ] = useState(false);
  const [ page,setPage ] = useState(1);
  const [ selectedSeason,setSelectedSeason ] = useState<seasonInterface>({
    year:2023,
    season:AnimeSeason.Fall
  })
  
  const [ seasonalAnime,setSeasonalAnime ] = useState<any[]>([]);

  const { isSWFEnabled} = swfFilterStore();

  const {backgroundColor,animateColorPressIn,animateColorPressOut,} = useAnimatedPress("transparent", COLORS.WhiteRGBA15,200,400);

  useEffect(()=>{
    setLoadingData(true);
    setTimeout(()=>{
      (
        async()=>{
          const  data  = await getSeasonalAnime(selectedSeason,isSWFEnabled,1);
          setSeasonalAnime(data.data);
  
          setLoadingData(false);
          setPage(2);
          setAllDataLoaded(false);
  
          if(!data.pagination.has_next_page){
            setAllDataLoaded(true);
          }
        }
      )();
    },500)
  },[selectedSeason.season,selectedSeason.year,isSWFEnabled])


  const fetchMoreAnime = async (page:number) =>{

    if(isAllDataLoaded) return;

    const data = await getSeasonalAnime(selectedSeason,isSWFEnabled,page);
    setPage(page+1);
    setSeasonalAnime((prevData)=>prevData.concat(data.data));
    if(!data.pagination.has_next_page){
      setAllDataLoaded(true);
    }
  }

  const viewAnime = (id:number)=>{
    navigation.push('AnimeDetails', {id});
  }

  return (
    <View style={styles.container}>
      <SeasonsListModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason}/>
      <Animated.View style={[
            { backgroundColor }
        ]}>
          <Pressable onPress={()=>setIsShowModal(true)} onPressIn={animateColorPressIn} onPressOut={animateColorPressOut}>
            <View style={styles.header}>
              <AntDesign name="caretdown" size={FONTSIZE.size_10} color={COLORS.White} />
              <Text style={styles.selectedSeason}>
                {`${selectedSeason.season} ${selectedSeason.year}`}
              </Text>
            </View>
          </Pressable>
        </Animated.View>
      <AnimeCardGrid isLoadingData={isLoadingData} isAllDataLoaded={isAllDataLoaded} animeList={seasonalAnime} fetchMoreAnime={fetchMoreAnime} page={page} viewAnime={viewAnime} navigation={navigation}/>
    </View>
  )
}
  
  
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black,
  },
  header : {
    flexDirection : "row",
    alignItems : "center",
    paddingHorizontal : SPACING.space_15,
    paddingVertical : SPACING.space_18,
    gap : SPACING.space_15
  },
  selectedSeason : {
    fontFamily : FONTFAMILY.lato_bold,
    fontSize : FONTSIZE.size_16,
    color : COLORS.White,
    textTransform : "capitalize"
  }
})
  
export default SimulcastSeasonScreen