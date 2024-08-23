import { Animated, Dimensions, Pressable, StyleSheet, Text, Vibration, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BrowseStackParamList } from '../types/navigationTypes';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes';
import useAnimatedPress from '../utils/animatedPress';
import SortModal from '../components/SortModal';
import AnimeCardGrid from '../components/AnimeCardGrid';
import swfFilterStore from '../store/swfFilterStore';
import { searchAnime } from '../api/apicalls';
import { sortFilter } from '../constants/filters';
import axios from 'axios';
import statusBarHeight from '../utils/getStatusBarHeight'

const { width } = Dimensions.get("screen")

type GenreAnimeScreenRouteProp = RouteProp<BrowseStackParamList,  'GenreAnime'>;

const getSearchAnime = async(genreId:number,sortBy:number,sortOrder:"asc"|"desc",isSWFEnabled:true|false,page:number=1)=>{
  try {
      const  { data } = await axios.get(searchAnime(null,null,0,null,[genreId],sortFilter[sortBy].sortBy,sortOrder,isSWFEnabled,page));
      return data;
  } catch (error) {
      console.error(
          error,
      );
  }
}

const GenreAnimeScreen = ({navigation}:any) => {
  const route = useRoute<GenreAnimeScreenRouteProp>();
  const { id,name } = route.params;

  const [ isLoadingData,setLoadingData ] = useState(true);
  const [ isAllDataLoaded,setAllDataLoaded ] = useState(false);

  const [ sortBy,setSortBy ] = useState<number>(6);
  const [ sortOrder,setSortOrder ] = useState<"asc"|"desc">("asc");
  const [ page,setPage ] = useState(1); 

  const [ genreAnimeList,setGenreAnimeList ] = useState<any[]>([]);

  const [ showSortModal,setShowSortModal ] = useState(false);

  const { isSWFEnabled } = swfFilterStore();

  const { backgroundColor: backgroundColorBackBtn,animateColorPressIn: animateColorPressInBackBtn,animateColorPressOut: animateColorPressOutBackBtn } = useAnimatedPress("transparent", COLORS.WhiteRGBA15,200,400);

  const sortAnimatedPress = useAnimatedPress("transparent", COLORS.WhiteRGBA15, 200, 400);

  const translateXSortModal = useRef(new Animated.Value(width)).current;

  const openSortModal = () => {
    setShowSortModal(true);
    Animated.timing(translateXSortModal, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  
  const closeSortModal = () => {
    Animated.timing(translateXSortModal, {
      toValue: width, 
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowSortModal(false));
  };

  useEffect(()=>{
    setLoadingData(true);
    const animeSearchHandler = setTimeout(()=>{(
        async()=>{
            const  data  = await getSearchAnime(id,sortBy,sortOrder,isSWFEnabled,1);
            setGenreAnimeList(data.data);
        
            setLoadingData(false);
            setPage(2);
            setAllDataLoaded(false);
        
            if(!data.pagination.has_next_page){
                setAllDataLoaded(true);
            }
        }
    )()},500)

    return (()=>{
        clearTimeout(animeSearchHandler);
    })
  },[id,sortBy,sortOrder,isSWFEnabled]);

  const fetchMoreAnime = async (page:number) =>{
    if(isAllDataLoaded) return;

    const data = await getSearchAnime(id,sortBy,sortOrder,isSWFEnabled,page);
    setPage(page+1);
    setGenreAnimeList((prevData)=>prevData.concat(data.data));

    if(!data.pagination.has_next_page){
        setAllDataLoaded(true);
    }
  }

  const viewAnime = (id:number)=>{
      navigation.push('AnimeDetails', {id});
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headingContainer}>
          <Animated.View style={[{backgroundColor:backgroundColorBackBtn,padding:SPACING.space_8,borderRadius:BORDERRADIUS.radius_20}]}>
            <Pressable onPress={()=>navigation.goBack()} onPressIn={animateColorPressInBackBtn} onPressOut={animateColorPressOutBackBtn} onLongPress={()=>Vibration.vibrate(100)}>
              <MaterialIcons name="arrow-back" size={FONTSIZE.size_24} color={COLORS.White} />
            </Pressable>
          </Animated.View>
          <Text style={styles.heading}>{name}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.sortHeader}>
          <View>
            <Text style={[styles.heading,{fontSize:FONTSIZE.size_16}]}>{sortFilter[sortBy].name}</Text>
          </View>
          <Animated.View style={[styles.filterIconButton,{ backgroundColor : sortAnimatedPress.backgroundColor }]}>
              <Pressable onPress={openSortModal}
                  onPressIn={ sortAnimatedPress.animateColorPressIn }
                  onPressOut={ sortAnimatedPress.animateColorPressOut }
              >
                  <MaterialCommunityIcons name="sort-variant" size={FONTSIZE.size_24} color={COLORS.White} />
              </Pressable>
        </Animated.View>
        </View>
        <AnimeCardGrid isLoadingData={isLoadingData} isAllDataLoaded={isAllDataLoaded} animeList={genreAnimeList} fetchMoreAnime={fetchMoreAnime} page={page} viewAnime={viewAnime} navigation={navigation}/>
        <SortModal sortBy={sortBy} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} translateXSortModal={translateXSortModal} showModal={showSortModal} closeModal={closeSortModal}/>
      </View>
    </View>
  )
}

export default GenreAnimeScreen

const styles = StyleSheet.create({
  container : {
    backgroundColor:COLORS.Black,
    flex:1
  },
  header : {
    flexDirection : 'row',
    gap : SPACING.space_8,
    paddingHorizontal : SPACING.space_8,
    paddingVertical : SPACING.space_4,
    alignItems : "center",
    justifyContent:"space-between",
    borderBottomWidth : 1,
    borderBottomColor : COLORS.WhiteRGBA30
  },
  headingContainer : {
    flexDirection : 'row',
    gap : SPACING.space_16,
    alignItems : "center",
    paddingTop : statusBarHeight
  },
  heading : {
    fontFamily : FONTFAMILY.lato_bold ,
    color : COLORS.White,
    fontSize : FONTSIZE.size_20,
  },
  sortHeader : {
    flexDirection : 'row',
    gap : SPACING.space_8,
    paddingHorizontal : SPACING.space_8,
    paddingRight : SPACING.space_4,
    paddingLeft : SPACING.space_15,
    alignItems : "center",
    justifyContent:"space-between",
    marginTop : SPACING.space_2
  },
  filterIconButton : {
    paddingVertical : SPACING.space_12,
    paddingHorizontal : SPACING.space_12,
  },
})