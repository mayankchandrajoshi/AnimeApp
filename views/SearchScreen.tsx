import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Animated, Vibration, Dimensions, StatusBar} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationTypes';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes';
import useAnimatedPress from '../utils/animatedPress';
import { searchAnime } from '../api/apicalls';
import axios from 'axios';
import swfFilterStore from '../store/swfFilterStore';
import AnimeCardGrid from '../components/AnimeCardGrid';
import FilterModal from '../components/FilterModal';
import SortModal from '../components/SortModal';
import { animeRatingFilter, animeTypeFilter, sortFilter } from '../constants/filters';
import statusBarHeight from '../utils/getStatusBarHeight';
import * as NavigationBar from 'expo-navigation-bar';

const { width } = Dimensions.get("screen")

type SearchScreenRouteProp = RouteProp<RootStackParamList, 'Search'>;

const getSearchAnime = async(query:string,sortBy:number,animeType:number,animeRating:number,animeGenres:number[],minScore:number,sortOrder:"asc"|"desc",isSWFEnabled:true|false,page:number=1)=>{
  try {
      const  { data } = await axios.get(searchAnime(query,animeTypeFilter[animeType].filter,minScore,animeRatingFilter[animeRating].filter,animeGenres,sortFilter[sortBy].sortBy,sortOrder,isSWFEnabled,page));
      return data;
  } catch (error) {
      console.error(
          error,
      );
  }
}

const SearchScreen = ({navigation}:any) => {

  const route = useRoute<SearchScreenRouteProp>();

  const [ queryInput,setQueryInput ] = useState<string|null>(route.params.query);
  const [ query,setQuery ] = useState<string|null>(route.params.query);

  const { isSWFEnabled } = swfFilterStore();

  const [ isLoadingData,setLoadingData ] = useState(true);
  const [ isAllDataLoaded,setAllDataLoaded ] = useState(false);

  const [ sortBy,setSortBy ] = useState<number>(6);
  const [ sortOrder,setSortOrder ] = useState<"asc"|"desc">("asc");
  const [ animeType,setAnimeType ] = useState<number>(0);
  const [ animeRating,setAnimeRating ] = useState<number>(0);
  const [ animeGenres,setAnimeGenres ] = useState<number[]>([]);
  const [ minScore,setMinScore ] = useState<number>(0);
  const [ page,setPage ] = useState(1);

  const [ searchedAnime,setSearchedAnime ] = useState<any[]>([]);

  const [ showFilterModal,setShowFilterModal ] = useState(false);
  const [ showSortModal,setShowSortModal ] = useState(false);

  const [ showBackBtnTooltip,setShowBackBtnTooltip ] = useState(false);

  const { backgroundColor: backgroundColorBackBtn,animateColorPressIn: animateColorPressInBackBtn,animateColorPressOut: animateColorPressOutBackBtn } = useAnimatedPress("transparent", COLORS.WhiteRGBA15,200,400);

  const { backgroundColor: backgroundColorRemoveBtn,animateColorPressIn: animateColorPressInRemoveBtn,animateColorPressOut: animateColorPressOutRemoveBtn } = useAnimatedPress("transparent", COLORS.WhiteRGBA15,200,400);

  const sortAnimatedPress = useAnimatedPress("transparent", COLORS.WhiteRGBA15, 200, 400);
  const filterAnimatedPress = useAnimatedPress("transparent", COLORS.WhiteRGBA15, 200, 400);

  const translateXFilterModal = useRef(new Animated.Value(width)).current;

  const openFiltersModal = () => {
    setShowFilterModal(true);
    Animated.timing(translateXFilterModal, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
    
  const closeFiltersModal = () => {
    Animated.timing(translateXFilterModal, {
      toValue: width, 
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowFilterModal(false));
  };
  
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
    NavigationBar.setBackgroundColorAsync(COLORS.Black);
  })

  useEffect(()=>{
    const queryHandler = setTimeout(() => {
      setQuery(queryInput);
    }, 500);

    return () => {
      clearTimeout(queryHandler);
    };
  },[queryInput])

  
  useEffect(()=>{
    setLoadingData(true);
    if(!query) return;
    
    setTimeout(()=>{
      (
        async()=>{
          const  data  = await getSearchAnime(query,sortBy,animeType,animeRating,animeGenres,minScore,sortOrder,isSWFEnabled,1);
          setSearchedAnime(data.data);
  
          setLoadingData(false);
          setPage(2);
          setAllDataLoaded(false);
  
          if(!data.pagination.has_next_page){
            setAllDataLoaded(true);
          }
        }
      )();
    },500)
  },[query,sortBy,animeType,animeRating,animeGenres,minScore,sortOrder,isSWFEnabled])


  const fetchMoreAnime = async (page:number) =>{

    if(isAllDataLoaded||!query) return;

    const data = await getSearchAnime(query,sortBy,animeType,animeRating,animeGenres,minScore,sortOrder,isSWFEnabled,page);
    setPage(page+1);
    setSearchedAnime((prevData)=>prevData.concat(data.data));
    if(!data.pagination.has_next_page){
      setAllDataLoaded(true);
    }
  }

  const viewAnime = (id:number)=>{
    navigation.push('AnimeDetails', {id});
  }

  return (
    <View style={styles.container}>
      {
        statusBarHeight===0&&<StatusBar barStyle={'light-content'} backgroundColor={COLORS.DullBlack} 
      />
      }
      <View style={styles.header}>
        <Animated.View style={[{backgroundColor:backgroundColorBackBtn,padding:SPACING.space_8,borderRadius:BORDERRADIUS.radius_20}]}>
          <Pressable onPress={()=>navigation.goBack()} onPressIn={animateColorPressInBackBtn} onPressOut={()=>{animateColorPressOutBackBtn();setTimeout(()=>setShowBackBtnTooltip(false),700)}} onLongPress={()=>{Vibration.vibrate(100);setShowBackBtnTooltip(true)}}>
            <MaterialIcons name="arrow-back" size={FONTSIZE.size_24} color={COLORS.White} />
            {showBackBtnTooltip && <Text style={[styles.iconToolTip,{ width : 70 }]}>
              Back
          </Text>}
          </Pressable>
        </Animated.View>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={COLORS.WhiteRGBA60}
          selectionColor={COLORS.OrangeRed}
          value={queryInput?queryInput:""}
          onChangeText={(newText) =>setQueryInput(newText)}
        />
        {(query&&query.length>0)&&(
            <Animated.View style={[{backgroundColor:backgroundColorRemoveBtn,padding:SPACING.space_8,borderRadius:BORDERRADIUS.radius_20}]}>
              <Pressable onPress={()=>setQueryInput(null)} onPressIn={animateColorPressInRemoveBtn} onPressOut={animateColorPressOutRemoveBtn}>
                <AntDesign name="close" size={FONTSIZE.size_24} color={COLORS.White} />
              </Pressable>
          </Animated.View>
        )}
      </View>
      <View style={[styles.filterIconContainer,{alignSelf:"flex-end"}]}>
          <Animated.View style={[styles.filterIconButton,{ backgroundColor : sortAnimatedPress.backgroundColor }]}>
              <Pressable onPress={openSortModal}
                  onPressIn={ sortAnimatedPress.animateColorPressIn }
                  onPressOut={ sortAnimatedPress.animateColorPressOut }
              >
                  <MaterialCommunityIcons name="sort-variant" size={FONTSIZE.size_24} color={COLORS.White} />
              </Pressable>
          </Animated.View>
          <Animated.View style={[styles.filterIconButton,{ backgroundColor : filterAnimatedPress.backgroundColor }]}>
              <Pressable onPress={openFiltersModal}
                  onPressIn={ filterAnimatedPress.animateColorPressIn }
                  onPressOut={ filterAnimatedPress.animateColorPressOut }
              >
                  <AntDesign name="filter" size={FONTSIZE.size_24} color={COLORS.White} />
              </Pressable>
          </Animated.View>
      </View>
      <FilterModal animeType={animeType} setAnimeType={setAnimeType} animeRating={animeRating} setAnimeRating={setAnimeRating} animeGenres={animeGenres}  setAnimeGenres={setAnimeGenres}  minScore ={minScore} setMinScore={setMinScore} translateXFilterModal={translateXFilterModal} showModal={showFilterModal} closeModal={closeFiltersModal}/>
      <SortModal sortBy={sortBy} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} translateXSortModal={translateXSortModal} showModal={showSortModal} closeModal={closeSortModal}/>
      {!query?<ScrollView style={styles.animeListContainer}></ScrollView>:(
        <AnimeCardGrid isLoadingData={isLoadingData} isAllDataLoaded={isAllDataLoaded} animeList={searchedAnime} fetchMoreAnime={fetchMoreAnime} page={page} viewAnime={viewAnime} navigation={navigation}/>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:COLORS.Black,
    flex:1
  },
  header : {
    flexDirection : 'row',
    gap : SPACING.space_8,
    paddingHorizontal : SPACING.space_8,
    paddingTop:statusBarHeight + SPACING.space_8,
    paddingBottom : SPACING.space_8,
    backgroundColor : COLORS.DullBlack,
    alignItems : "center"
  },
  input : {
    fontFamily : FONTFAMILY.lato_bold,
    fontSize : FONTSIZE.size_20,
    color : COLORS.White,
    flex:1
  },
  animeListContainer : {
    flex:1
  },
  filterIconContainer : {
    flexDirection : "row",
    gap : SPACING.space_2,
    paddingTop:SPACING.space_4,
    paddingRight : SPACING.space_3,
  },
  filterIconButton : {
    paddingVertical : SPACING.space_12,
    paddingHorizontal : SPACING.space_12,
  },
  iconToolTip : {
      position : "absolute",
      bottom:'-160%',
      left : "0%",
      textAlign : "center",
      backgroundColor : COLORS.White,
      fontSize:FONTSIZE.size_14,
      fontFamily:FONTFAMILY.lato_regular,
      color:COLORS.Black,
      paddingHorizontal : SPACING.space_16,
      paddingVertical:SPACING.space_8,
      borderRadius : SPACING.space_2,
      elevation: 5,
      shadowColor: COLORS.Black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  }
})

export default SearchScreen