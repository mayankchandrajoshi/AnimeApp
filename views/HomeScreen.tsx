import { View, Text, Dimensions, ScrollView, StyleSheet, ActivityIndicator, Animated, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes';
import CustomHomeHeader from '../components/CustomHomeHeader';
import { animeDetails, searchAnime, seasonalAnime, topAnime } from '../api/apicalls';
import axios from 'axios';
import { AnimeOrderFilter, AnimeRating, AnimeSeason, AnimeSortFilter, AnimeType, Months } from '../enums/enums';
import swfFilterStore from '../store/swfFilterStore';
import MainScreenPoster from '../components/MainScreenPoster';
import AnimeHorizontalFlatList from '../components/AnimeHorizontalFlatList';
import statusBarHeight from '../utils/getStatusBarHeight'

const { width,height } = Dimensions.get("screen")

const getPosterAnime = async(id:number) =>{
  try {
    let { data } = await axios.get(animeDetails(id));
    return data;
  } catch (error) {
    console.error(
      error,
    );
  }
}

const getTopAiringAnimeList = async (isSWFEnabled:boolean) => {
  try {
    let { data } = await axios.get(topAnime(null,AnimeSortFilter.Airing,null,isSWFEnabled,1,20));
    return data;
  } catch (error) {
    console.error(
      error,
    );
  }
};

const getCurrentSeasonalAnimeList = async (isSWFEnabled:boolean) => {
  try {
    let currentSeason:AnimeSeason;
    const currentMonth = new Date().getMonth();

    if(currentMonth<=3){
      currentSeason = AnimeSeason.Winter
    }
    else if(currentMonth<=6){
      currentSeason = AnimeSeason.Spring
    }
    else if(currentMonth<=9){
      currentSeason = AnimeSeason.Summer
    }
    else {
      currentSeason = AnimeSeason.Fall
    }
  
    let { data } = await axios.get(seasonalAnime(new Date().getFullYear(),currentSeason,isSWFEnabled,1,20))
    
    return data;
  } catch (error) {
    console.error(
      error,
    );
  }
};

const getMoviesAnimeList = async (isSWFEnabled:boolean) => {
  try {
    let { data } = await axios.get(searchAnime(null,AnimeType.Movie,0,null,[],AnimeOrderFilter.Favorites,"desc",isSWFEnabled));
    return data;
  } catch (error) {
    console.error(
      error,
    );
  }
};

const getGenreAnimeList = async  (genreId:number,isSWFEnabled:boolean) => {
  try {
    let { data } = await axios.get(searchAnime(null,null,0,null,[genreId],AnimeOrderFilter.Favorites,"desc",isSWFEnabled));
    return data;
  } catch (error) {
    console.error(
      error,
    );
  }
};

const getKidsAnimeList = async () => {
  try {
    let { data } = await axios.get(searchAnime(null,null,0,AnimeRating.Children,[],AnimeOrderFilter.Favorites,"desc"));
    return data;
  } catch (error) {
    console.error(
      error,
    );
  }
};

const HomeScreen = ({navigation}:any) => {
  const [ posterAnime,setPosterAnime ] = useState<any>(null);
  const [ topAiringAnimeList,setTopAiringAnimeList ] = useState<any[]>([]);
  const [ currentSeasonalAnimeList,setCurrentSeasonalAnimeList ] = useState<any[]>([]);
  const [ moviesAnimeList,setMoviesAnimeList ] =  useState<any[]>([]);
  const [ romanceAnimeList,setRomanceAnimeList ] = useState<any[]>([]);
  const [ kidsAnimeList,setKidsAnimeList ] = useState<any[]>([]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const { isSWFEnabled } = swfFilterStore();

  const backgroundColor = scrollY.interpolate({
      inputRange: [0, height/3],
      outputRange: ['transparent',COLORS.Black],
      extrapolate: 'clamp',
  });

  const viewAnime = (id:number)=>{
    navigation.push('AnimeDetails', {id});
  }

  useEffect(()=>{
    (async()=>{
      const { data:posterAnimeData } =  await getPosterAnime(52635);
      setPosterAnime(posterAnimeData);
    })();
  },[])

  useEffect(()=>{
    (async()=>{
      const { data:topAiringAnime } =  await getTopAiringAnimeList(isSWFEnabled);
      setTopAiringAnimeList(topAiringAnime);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const { data:moviesAnimeData } =  await getMoviesAnimeList(isSWFEnabled);
      setMoviesAnimeList(moviesAnimeData)

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { data:seasonalAnimeData } =  await getCurrentSeasonalAnimeList(isSWFEnabled);
      setCurrentSeasonalAnimeList(seasonalAnimeData);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { data:romanceAnime } =  await getGenreAnimeList(22,isSWFEnabled);
      setRomanceAnimeList(romanceAnime)

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { data:kidsAnime } =  await getKidsAnimeList();
      setKidsAnimeList(kidsAnime)
    })();
  },[isSWFEnabled])


  if(!posterAnime||topAiringAnimeList.length===0){
    return (
      <View style={styles.container}>
        <CustomHomeHeader 
          searchFunction={()=>{
            navigation.navigate('Search',{query:null});
          }}
          SWFFunction={()=>{
            navigation.navigate('SWFModal');
          }}
          backgroundColor = {backgroundColor}
        />
        <ScrollView
          style={styles.scrollViewContainer}
          bounces={false}
          contentContainerStyle={styles.scrollViewContentContainer}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false } 
          )}
          scrollEventThrottle={16} 
        >
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={"large"} color={COLORS.OrangeRed}/>
          </View>
      </ScrollView>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <CustomHomeHeader 
        searchFunction={()=>{
          navigation.navigate('Search',{query:null});
        }}
        SWFFunction={()=>{
          navigation.navigate('SWFModal');
        }}
        backgroundColor = {backgroundColor}
      />
      <ScrollView
        style={styles.scrollViewContainer}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } 
        )}
        scrollEventThrottle={16} 
      > 
        <MainScreenPoster id={posterAnime.mal_id} name = {posterAnime.title} image_url = {posterAnime.images.jpg.large_image_url} synopsis = {posterAnime.synopsis} genres = {
          posterAnime.genres.map((genre:any)=>{
            return genre.name
          })
        } type = {posterAnime.type} viewAnime={(id:number)=>{viewAnime(id)}}/>

        <AnimeHorizontalFlatList heading='Top Airing Anime' animeList={topAiringAnimeList} navigation={navigation}/>

        {moviesAnimeList.length!==0&&<AnimeHorizontalFlatList heading='Most Favorite Anime Movies' animeList={moviesAnimeList} navigation={navigation}/>}

        {currentSeasonalAnimeList.length!==0&&<AnimeHorizontalFlatList heading={`${Months[new Date().getMonth()]} ${new Date().getFullYear()} Seasonal Sampler`} animeList={currentSeasonalAnimeList} navigation={navigation}/>}

        {romanceAnimeList.length!==0&&<AnimeHorizontalFlatList heading='Romance Anime' animeList={romanceAnimeList} navigation={navigation}/>}

        {kidsAnimeList.length!==0&&<AnimeHorizontalFlatList heading='Kids Anime' animeList={kidsAnimeList} navigation={navigation}/>}

        {
          currentSeasonalAnimeList.length===0||topAiringAnimeList.length===0||kidsAnimeList.length===0?<View style={styles.footer}>
            <ActivityIndicator size={"large"} color={COLORS.OrangeRed}/>
          </View>:(
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Your have reached the end of the feed
              </Text>
              <TouchableOpacity activeOpacity={0.8} style={styles.footerBtn} onPress={()=>navigation.navigate('Browse')}>
                <Text style={styles.footerBtnText}>View All</Text>
              </TouchableOpacity>
            </View>)
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1,
  },
  scrollViewContentContainer : {
    flex : 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:statusBarHeight,
  },
  cardContainer : {
    gap: SPACING.space_10,
  },
  footer : {
    flex : 1,
    gap : SPACING.space_20,
    alignItems : "center",
    paddingVertical : SPACING.space_28,
  },
  footerText : {
    fontFamily : FONTFAMILY.lato_bold,
    fontSize : FONTSIZE.size_16,
    color : COLORS.White,
  },
  footerBtn : {
    backgroundColor : COLORS.OrangeRed,
    paddingVertical : SPACING.space_12,
    minWidth : width/2,
  },
  footerBtnText : {
    fontFamily : FONTFAMILY.lato_bold,
    fontSize : FONTSIZE.size_14,
    textTransform : "uppercase",
    textAlign : "center"
  }
})

export default HomeScreen