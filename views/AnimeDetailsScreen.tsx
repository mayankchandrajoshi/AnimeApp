import { View, Text, StyleSheet, Pressable, ScrollView, Image, Dimensions, Animated, Vibration, Share, TouchableOpacity, Modal, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { RootStackParamList } from '../types/navigationTypes';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes';
import swfFilterStore from '../store/swfFilterStore';
import { animeDetails } from '../api/apicalls';
import axios from 'axios';
import statusBarHeight from '../utils/getStatusBarHeight';
import { LinearGradient } from 'expo-linear-gradient';
import useAnimatedPress from '../utils/animatedPress';
import QuickActionList from '../components/QuickActionList'
import watchListStore from '../store/watchListStore';
import favoriteListStore from '../store/favoriteListStore';
import watchedListStore from '../store/watchedListStore';
import AnimeCharactersList from '../components/AnimeCharactersList';
import ScreenSelectionCarousal from '../components/ScreenSelectionCarousal';
import AnimeEpisodesList from '../components/AnimeEpisodesList';
import RecommendedAnimeList from '../components/RecommendedAnimeList';
import * as NavigationBar from 'expo-navigation-bar';

const { width:windowWidth,height:windowHeight } = Dimensions.get("window");
const { width:screenWidth,height:screenHeight } = Dimensions.get("screen");

type AnimeDetailsScreenRouteProp = RouteProp<RootStackParamList, 'AnimeDetails'>;

const getAnimeDetails = async(id:number)=>{
  try {
    const { data } = await axios.get(animeDetails(id));
    return data;
  } catch (error) {
    console.error(
      error,
    );
  }
}

interface AnimeDetails {
  id: number,
  name : string,
  image_url : string,
  type : string
}

const getActionList = (id: number, name: string,image_url:string,type:string, watchList: AnimeDetails[], addToWatchList: (data :AnimeDetails) => void, removeFromWatchList: (data :AnimeDetails) => void, isAnimeInWatchList: (data: AnimeDetails) => boolean ,watchedList: AnimeDetails[], addToWatchedList: (id: AnimeDetails) => void, removeFromWatchedList: (id: AnimeDetails) => void, isAnimeInWatchedList : (data: AnimeDetails) => boolean ,favoriteList: AnimeDetails[], addToFavoriteList: (id: AnimeDetails) => void, removeFromFavoriteList: (id: AnimeDetails) => void, isAnimeInFavoriteList: (data: AnimeDetails) => boolean ) => {
  return [
      {
          id: 0,
          name: isAnimeInWatchList({id,name,image_url,type}) ? "Remove from WatchList" : "Add to WatchList",
          action: () => {
              isAnimeInWatchList({id,name,image_url,type})? removeFromWatchList({
                  id,name,image_url,type
              }) : addToWatchList({
                  id,name,image_url,type
              });
          }
      },
      {
          id: 1,
          name:  isAnimeInWatchedList({id,name,image_url,type})  ? "Remove from WatchedList" : "Add to WatchedList",
          action: () => {
              isAnimeInWatchedList({id,name,image_url,type})  ? removeFromWatchedList({
                  id,name,image_url,type
              }) : addToWatchedList({
                  id,name,image_url,type
              });
          }
      },
      {
          id: 2,
          name: isAnimeInFavoriteList({id,name,image_url,type}) ? "Remove from Favorites" : "Add to Favorites",
          action: () => {
              isAnimeInFavoriteList({id,name,image_url,type})? removeFromFavoriteList({
                  id,name,image_url,type
              }) : addToFavoriteList({
                  id,name,image_url,type
              });
          }
      },
      {
          id: 3,
          name: "Share",
          action: async () => {
          try {
              const result = await Share.share({
              message: `Check out this amazing anime: https://portfolio-mjmj.vercel.app`,
              url: 'https://portfolio-mjmj.vercel.app/',
              title: name
              });
  
              if (result.action === Share.sharedAction) {
                  console.log('Successfully shared');
              }
          } catch (error) {
              console.error('Error sharing:', error);
          }
          }
      }
      ];
}


const AnimeDetailsScreen = ({navigation}:any) => {

  const route = useRoute<AnimeDetailsScreenRouteProp>();
  const { id } = route.params;

  const Screens = [
    {
      name: "Episodes",
      component: (navigation: any) => <AnimeEpisodesList navigation={navigation} id={id} />
    },
    {
      name: "Characters",
      component: (navigation: any) => <AnimeCharactersList navigation={navigation} id={id} />
    },
    {
      name : "Recommended",
      component: (navigation: any) => <RecommendedAnimeList navigation={navigation} id={id} />
    }
  ];

  const { isSWFEnabled } = swfFilterStore();
  const { watchList,addToWatchList,removeFromWatchList,isAnimeInWatchList }  = watchListStore();
  const { favoriteList,addToFavoriteList,removeFromFavoriteList,isAnimeInFavoriteList }  = favoriteListStore();
  const { watchedList,addToWatchedList,removeFromWatchedList,isAnimeInWatchedList }  = watchedListStore();

  const [ actionList,setActionList ] = useState<any>([]);

  const [ animeDetails,setAnimeDetails ] = useState<any>(null);

  const [ showBackBtnTooltip,setShowBackBtnTooltip ] = useState(false);
  const [ showMoreOptionsBtnTooltip,setShowMoreOptionsBtnTooltip ] = useState(false);
  const [ showMoreOptions,setShowMoreOptions ] = useState(false);
  const [ showAnimeDetails,setShowAnimeDetails ] = useState(false);

  const [ moreOptionsPositionTop,setMoreOptionsPositionTop ] = useState(0);
  const [ moreOptionsPositionLeft,setMoreOptionsPositionLeft ] = useState(0);
  
  const moreOptionsRef = useRef<View>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const { backgroundColor: backgroundColorBackBtn,animateColorPressIn: animateColorPressInBackBtn,animateColorPressOut: animateColorPressOutBackBtn } = useAnimatedPress("transparent", COLORS.WhiteRGBA15,200,400);

  const { backgroundColor: backgroundColorMoreOptionsBtn,animateColorPressIn: animateColorPressInMoreOptionsBtn,animateColorPressOut: animateColorPressOutMoreOptionsBtn } = useAnimatedPress("transparent", COLORS.WhiteRGBA15,200,400);

  const { backgroundColor: backgroundColorShowDetailsBtn,animateColorPressIn: animateColorPressInShowDetailsBtn,animateColorPressOut: animateColorPressOutShowDetailsBtn } = useAnimatedPress('transparent', COLORS.WhiteRGBA15,200,400);

  useEffect(()=>{
    (async()=>{
      NavigationBar.setBackgroundColorAsync(COLORS.Black);
      const { data } = await getAnimeDetails(id);
      setAnimeDetails(data);
      setActionList(getActionList(id, data.name,data.images.jpg.large_image_url?data.images.jpg.large_image_url:data.images.jpg.image_url,data.type, watchList, addToWatchList, removeFromWatchList, isAnimeInWatchList , watchedList, addToWatchedList, removeFromWatchedList, isAnimeInWatchedList ,favoriteList, addToFavoriteList, removeFromFavoriteList,isAnimeInFavoriteList))
    })();
  },[id])

  const handleViewMenu = () => {
    moreOptionsRef.current?.measure((fx, fy, width, height, px, py) => {
        setMoreOptionsPositionLeft(px>windowWidth/2?px-(windowWidth*.47):0);
        // subtracted windowWidth*.47 so that to shift the action menu equal to its width

        setMoreOptionsPositionTop(windowHeight-py<(50*(actionList.length+1))?py-(50*actionList.length):py+height+5);
        // 50*actionList.length is so as get the height of QuickActionList component
    });
    setShowMoreOptions(true);
  }

  const backgroundColor = scrollY.interpolate({
    inputRange: [0, screenHeight*.75],
      outputRange: ['transparent',COLORS.Black],
      extrapolate: 'clamp',
  });

  if(!animeDetails) return <View style={{flex:1,backgroundColor:COLORS.Black}}>
    <LinearGradient colors={[COLORS.Black,COLORS.BlackRGB90,COLORS.BlackRGB85,COLORS.BlackRGB60,'transparent']} locations={[.25,.5,.6,.8,1]} style={[styles.subContainer]}>
      <Animated.View style={[{backgroundColor:backgroundColorBackBtn,padding:SPACING.space_8,borderRadius:BORDERRADIUS.radius_20}]}>
          <Pressable onPress={()=>navigation.goBack()} onPressIn={animateColorPressInBackBtn} onPressOut={()=>{animateColorPressOutBackBtn();setTimeout(()=>setShowBackBtnTooltip(false),700)}} onLongPress={()=>{Vibration.vibrate(100);setShowBackBtnTooltip(true)}}>
            <MaterialIcons name="arrow-back" size={FONTSIZE.size_24} color={COLORS.White} />
            {showBackBtnTooltip && <Text style={[styles.iconToolTip,{ width : 70,left : "0%", }]}>
              Back
          </Text>}
          </Pressable>
      </Animated.View>
      <View style={styles.moreOptionsContainer}>
        <Pressable 
          style={[
            styles.swfContainer,
            isSWFEnabled?{backgroundColor:COLORS.Lime}:{backgroundColor:COLORS.Red}
          ]}
          onPress={()=>{navigation.navigate('SWFModal');}}
      >
          <Text style={styles.swf}>
            {
              isSWFEnabled?"SWF":"NSWF"
            }
          </Text>
      </Pressable>
          <Pressable onPress={handleViewMenu} onPressIn={animateColorPressInMoreOptionsBtn} onPressOut={()=>{animateColorPressOutMoreOptionsBtn();setTimeout(()=>setShowMoreOptionsBtnTooltip(false),700)}} onLongPress={()=>{Vibration.vibrate(100);setShowMoreOptionsBtnTooltip(true)}}>
              <Animated.View ref={moreOptionsRef} style={[{backgroundColor:backgroundColorMoreOptionsBtn,padding:SPACING.space_8,borderRadius:BORDERRADIUS.radius_20}]}>
                <Feather name="more-vertical" size={FONTSIZE.size_24} color={COLORS.White} />
              </Animated.View>
              {showMoreOptionsBtnTooltip && <Text style={[styles.iconToolTip,{ width : 140,bottom:'-100%',right : "0%" }]}>
                More Options
            </Text>}
            </Pressable>
          {showMoreOptions&&<QuickActionList actionMenu={actionList} isShowMenu setIsShowMenu={setShowMoreOptions} top={moreOptionsPositionTop-statusBarHeight} left={moreOptionsPositionLeft}/>}
      </View>
    </LinearGradient>
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size={"large"} color={COLORS.OrangeRed}/>
    </View>
  </View>

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.Black,COLORS.BlackRGB90,COLORS.BlackRGB85,COLORS.BlackRGB60,'transparent']} locations={[.25,.5,.6,.8,1]} style={[styles.subContainer]}>
        <Animated.View style={[{backgroundColor:backgroundColorBackBtn,padding:SPACING.space_8,borderRadius:BORDERRADIUS.radius_20}]}>
            <Pressable onPress={()=>navigation.goBack()} onPressIn={animateColorPressInBackBtn} onPressOut={()=>{animateColorPressOutBackBtn();setTimeout(()=>setShowBackBtnTooltip(false),700)}} onLongPress={()=>{Vibration.vibrate(100);setShowBackBtnTooltip(true)}}>
              <MaterialIcons name="arrow-back" size={FONTSIZE.size_24} color={COLORS.White} />
              {showBackBtnTooltip && <Text style={[styles.iconToolTip,{ width : 70,left : "0%", }]}>
                Back
            </Text>}
            </Pressable>
        </Animated.View>
        <View style={styles.moreOptionsContainer}>
          <Pressable 
            style={[
              styles.swfContainer,
              isSWFEnabled?{backgroundColor:COLORS.Lime}:{backgroundColor:COLORS.Red}
            ]}
            onPress={()=>{navigation.navigate('SWFModal');}}
        >
            <Text style={styles.swf}>
              {
                isSWFEnabled?"SWF":"NSWF"
              }
            </Text>
        </Pressable>
            <Pressable onPress={handleViewMenu} onPressIn={animateColorPressInMoreOptionsBtn} onPressOut={()=>{animateColorPressOutMoreOptionsBtn();setTimeout(()=>setShowMoreOptionsBtnTooltip(false),700)}} onLongPress={()=>{Vibration.vibrate(100);setShowMoreOptionsBtnTooltip(true)}}>
                <Animated.View ref={moreOptionsRef} style={[{backgroundColor:backgroundColorMoreOptionsBtn,padding:SPACING.space_8,borderRadius:BORDERRADIUS.radius_20}]}>
                  <Feather name="more-vertical" size={FONTSIZE.size_24} color={COLORS.White} />
                </Animated.View>
                {showMoreOptionsBtnTooltip && <Text style={[styles.iconToolTip,{ width : 140,bottom:'-100%',right : "0%" }]}>
                  More Options
              </Text>}
              </Pressable>
            {showMoreOptions&&<QuickActionList actionMenu={actionList} isShowMenu setIsShowMenu={setShowMoreOptions} top={moreOptionsPositionTop-statusBarHeight} left={moreOptionsPositionLeft}/>}
        </View>
      </LinearGradient>
      <Image source={{uri:animeDetails.images.jpg.large_image_url?animeDetails.images.jpg.large_image_url:animeDetails.images.jpg.image_url}} style={styles.mainHeaderImage}/>
      <Animated.View style={[styles.mainHeaderImageOverlay,{ backgroundColor }]}></Animated.View>
      <ScrollView bounces={false} 
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } 
        )}
        scrollEventThrottle={16} 
        style={{zIndex:30}}
      >
        <View style={{width:screenWidth,height:screenHeight*.75}}></View>
        <View>
          <LinearGradient colors={['transparent',COLORS.BlackRGB60,COLORS.BlackRGB85,COLORS.Black]} locations={[.1,.3,.55,.85]} style={[styles.section1]}>
            <Text style={styles.textWhite22Regular}>
              {animeDetails.title_english?animeDetails.title_english:animeDetails.title}
            </Text>
            <View style={{flexDirection:"row",alignItems:"center",gap:SPACING.space_10}}>
              <Text style={styles.textWhite12Regular}>
                {animeDetails.type}
              </Text>
              <Text style={[styles.textWhite12Regular,{fontFamily:FONTFAMILY.lato_black}]}>
                |
              </Text>
              <Text style={[styles.textWhite12Regular,animeDetails.airing?{color:COLORS.Lime}:{color:COLORS.Red}]}>
                {animeDetails.status}
              </Text>
            </View>
          </LinearGradient>
          <View style={styles.section2}>
            <Text style={[styles.textWhite14Regular,{ color:COLORS.WhiteRGBA75 }]} numberOfLines={2}>
              {animeDetails.synopsis}
            </Text>
            <Pressable onPress={()=>setShowAnimeDetails(true)} onPressIn={animateColorPressInShowDetailsBtn} onPressOut={animateColorPressOutShowDetailsBtn}>
              <Animated.View style={[styles.showDetailsBtn,{backgroundColor:backgroundColorShowDetailsBtn}]}>
                <Text style={[styles.textWhite12Regular,{textTransform:"uppercase",color:COLORS.OrangeRed,fontFamily:FONTFAMILY.lato_bold}]}>Show Details</Text>
              </Animated.View>
            </Pressable>
            <Modal  animationType="fade"
              presentationStyle='fullScreen'
              visible={showAnimeDetails}
              onRequestClose={() => setShowAnimeDetails(false)}
            >
              <View style={styles.showDetailsModal}>
                <View style={styles.animeDetailsModalHeader}>
                  <Pressable onPress={() => setShowAnimeDetails(false)}>
                      <AntDesign name="close" size={FONTSIZE.size_30} color={COLORS.White} />
                  </Pressable>
                  <View style={{flex:1}}>
                    <Text style={[styles.textWhite20Bold]} numberOfLines={1}>
                        {animeDetails.title_english?animeDetails.title_english:animeDetails.title}
                    </Text>
                  </View>
                </View>
                <ScrollView bounces={false} contentContainerStyle={{padding:SPACING.space_15,paddingBottom:SPACING.space_52}}>
                  <Text style={[styles.textWhite16Regular,{color:COLORS.WhiteRGBA90,lineHeight:SPACING.space_24}]}>
                    {
                      (animeDetails.synopsis as string).replace('\n\n[Written by MAL Rewrite]','')
                    }
                  </Text>
                  {animeDetails.episodes&&(
                    <View style={{paddingVertical:SPACING.space_15,gap:SPACING.space_8}}>
                      <Text style={[styles.textWhite14Regular,{color:COLORS.WhiteRGBA90}]}>
                        Episodes
                      </Text>
                      <Text style={[styles.textWhite16Regular,{color:COLORS.WhiteRGBA60}]}>
                        {`${animeDetails.episodes} episodes`}
                      </Text>
                    </View>
                  )}
                  <View style={{paddingVertical:SPACING.space_15,gap:SPACING.space_8}}>
                    <Text style={[styles.textWhite14Regular,{color:COLORS.WhiteRGBA90}]}>
                      Duration
                    </Text>
                    <Text style={[styles.textWhite16Regular,{color:COLORS.WhiteRGBA60}]}>
                      {animeDetails.duration}
                    </Text>
                  </View>
                  {animeDetails.licensors.length>=1&&(
                    <View style={{paddingVertical:SPACING.space_15,gap:SPACING.space_8}}>
                      <Text style={[styles.textWhite14Regular,{color:COLORS.WhiteRGBA90}]}>
                        Publisher
                      </Text>
                      <View style={{flexDirection:"row",flexWrap:"wrap",gap:SPACING.space_8}}>
                        {
                          animeDetails.licensors.map(({name}:any,index:number)=>{
                            return (
                              <Text style={[styles.textWhite16Regular,{color:COLORS.WhiteRGBA60}]} key={index}>
                                {name} {index!==animeDetails.licensors.length-1?",":""}
                              </Text>
                            )
                          })
                        }
                      </View>
                    </View>
                  )}
                  {(animeDetails.season&&animeDetails.year)&&(
                    <View style={{paddingVertical:SPACING.space_15,gap:SPACING.space_8}}>
                      <Text style={[styles.textWhite14Regular,{color:COLORS.WhiteRGBA90}]}>
                        Released On
                      </Text>
                      <Text style={[styles.textWhite16Regular,{color:COLORS.WhiteRGBA60,textTransform:"capitalize"}]}>
                        {`${animeDetails.season} ${animeDetails.year}`}
                      </Text>
                    </View>
                  )}
                  <View style={{paddingVertical:SPACING.space_15,gap:SPACING.space_8}}>
                    <Text style={[styles.textWhite14Regular,{color:COLORS.WhiteRGBA90}]}>
                      Genres
                    </Text>
                    <View style={{flexDirection:"row",flexWrap:"wrap",gap:SPACING.space_8}}>
                      {
                        animeDetails.genres.map(({name}:any,index:number)=>{
                          return (
                            <Text style={[styles.textWhite16Regular,{color:COLORS.WhiteRGBA60}]} key={index}>
                              {name}
                            </Text>
                          )
                        })
                      }
                    </View>
                  </View>
                  {animeDetails.streaming.length>=1&&(
                    <View style={{paddingVertical:SPACING.space_15,gap:SPACING.space_8}}>
                      <Text style={[styles.textWhite14Regular,{color:COLORS.WhiteRGBA90}]}>
                        Streaming On
                      </Text>
                      <View style={{flexDirection:"row",flexWrap:"wrap",gap:SPACING.space_8}}>
                        {
                          animeDetails.streaming.map(({name}:any,index:number)=>{
                            return (
                              <Text style={[styles.textWhite16Regular,{color:COLORS.WhiteRGBA60}]} key={index}>
                                {name}
                              </Text>
                            )
                          })
                        }
                      </View>
                    </View>
                  )}
                </ScrollView>
              </View>
            </Modal>
          </View>
        </View>
        <ScreenSelectionCarousal screens={Screens} navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:COLORS.Black
  },
  subContainer : {
    position : "absolute",
    top : 0,
    left : 0,
    right : 0,
    zIndex:999,
    paddingHorizontal : SPACING.space_8,
    paddingTop : statusBarHeight + SPACING.space_8,
    paddingBottom : SPACING.space_8,
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:"center",
  },
  moreOptionsContainer : {
    flexDirection : "row",
    alignItems : "center",
    gap:SPACING.space_10
  },
  swfContainer : {
      paddingVertical:SPACING.space_4,
      paddingHorizontal : SPACING.space_8,
      borderRadius : BORDERRADIUS.radius_8
  },
  swf : {
      fontFamily : FONTFAMILY.lato_bold,
      fontSize : FONTSIZE.size_16,
      color : COLORS.White
  },
  iconToolTip : {
      position : "absolute",
      bottom:'-160%',
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
  },
  mainHeaderImage : {
    position:"absolute",
    top:0,
    width:screenWidth,
    height:screenHeight*.75,
    zIndex:5,
  },
  mainHeaderImageOverlay : {
    position:"absolute",
    top:0,
    width:screenWidth,
    height:screenHeight*.75,
    zIndex:10
  },
  section1 : {
    paddingHorizontal : SPACING.space_16,
    paddingVertical : SPACING.space_8,
    gap:SPACING.space_4
  },
  textWhite22Regular : {
    fontSize:FONTSIZE.size_22,
    fontFamily:FONTFAMILY.lato_regular,
    color:COLORS.White,
  },
  section2 : {
    backgroundColor:COLORS.Black,
    paddingHorizontal : SPACING.space_16,
    gap:SPACING.space_2,
  },
  textWhite20Bold : {
    fontSize:FONTSIZE.size_20,
    fontFamily:FONTFAMILY.lato_bold,
    color:COLORS.White,
  },
  textWhite16Regular : {
    fontSize:FONTSIZE.size_16,
    fontFamily:FONTFAMILY.lato_regular,
    color:COLORS.White,
  },
  textWhite14Regular : {
    fontSize:FONTSIZE.size_14,
    fontFamily:FONTFAMILY.lato_regular,
    color:COLORS.White,
  },
  textWhite12Regular : {
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.lato_regular,
    color:COLORS.White,
  },
  showDetailsBtn : {
    padding:SPACING.space_12,
    marginVertical:SPACING.space_8,
    marginHorizontal:"auto"
  },
  showDetailsModal : {
    flex:1,
    backgroundColor:COLORS.Black
  },
  animeDetailsModalHeader : {
    flexDirection : "row",
    padding:SPACING.space_15,
    gap : SPACING.space_15,
    alignItems:"center",
    borderBottomWidth : 1,
    borderBottomColor : COLORS.WhiteRGBA30,
  },
  animeDetailsModalHeading : {

  },
  animeDetailsContainer : {
    // backgroundColor:COLORS.Black
  },
});

export default AnimeDetailsScreen