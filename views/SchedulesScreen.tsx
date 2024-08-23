import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Pressable, Animated, Modal, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainHeader from '../components/MainHeader';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes';
import { Days } from '../enums/enums';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import useAnimatedPress from '../utils/animatedPress';
import getCurrentDay from '../utils/getCurrentDay';
import { scheduledAnime } from '../api/apicalls';
import axios from 'axios';
import DaySelectModal from '../components/DaySelectModal';
import swfFilterStore from '../store/swfFilterStore';
import AnimeCardGrid from '../components/AnimeCardGrid';


const getScheduledAnime = async(selectedDay:Days,isSWFEnabled:boolean,page:number)=>{
  try {
      let { data } = await axios.get(scheduledAnime(selectedDay,isSWFEnabled,page,16));
      return data;
  } catch (error) {
      console.error(
          error,
      );
  }
}

const SchedulesScreen = ({navigation}:any) => {
  
  const [ isLoadingData,setLoadingData ] = useState(true);
  const [ isAllDataLoaded,setAllDataLoaded ] = useState(false);
  const [ page,setPage ] = useState(1);
  const [ scheduledAnime,setScheduledAnime ] = useState<any[]>([]);

  const [ selectedDay,setSelectedDay ] = useState<Days>(Days.Unknown);
  const [ showModal,setShowModal ] = useState(false);

  const { isSWFEnabled} = swfFilterStore();

  const {backgroundColor,animateColorPressIn,animateColorPressOut,} = useAnimatedPress("transparent", COLORS.WhiteRGBA15,200,400);

  useEffect(()=>{
    setSelectedDay(getCurrentDay());
  },[])

  useEffect(()=>{
    setLoadingData(true);
    setTimeout(()=>{(
      async()=>{
      const  data  = await getScheduledAnime(selectedDay,isSWFEnabled,1);
      setScheduledAnime(data.data);

      setLoadingData(false);
      setPage(2);
      setAllDataLoaded(false);

      if(!data.pagination.has_next_page){
          setAllDataLoaded(true);
      }
      }
    )()},500)
  },[selectedDay,isSWFEnabled])

  const fetchMoreAnime = async (page:number) =>{

    if(isAllDataLoaded) return;

    const data = await getScheduledAnime(selectedDay,isSWFEnabled,page);
    setPage(page+1);
    setScheduledAnime((prevData)=>prevData.concat(data.data));

    if(!data.pagination.has_next_page){
      setAllDataLoaded(true);
    }
  }

  const viewAnime = (id:number)=>{
      navigation.push('AnimeDetails', {id});
  }

  return (
    <View style={styles.screenContainer}>
      <MainHeader screenName="Scheduled Anime" 
        searchFunction={()=>{
          navigation.navigate('Search',{ query:null });
        }}
        SWFFunction={()=>{
          navigation.navigate('SWFModal');
        }}
      />
      <View style={styles.subHeader}>
        <Text style={styles.selectedDayText}>{selectedDay}</Text>
        <Animated.View style={[{ backgroundColor }]}>
          <Pressable onPress={()=>{setShowModal(true)}} onPressIn={animateColorPressIn} onPressOut={animateColorPressOut}
            style={styles.modalToggleButton}
          >
            <Entypo name="select-arrows" size={SPACING.space_24} color={COLORS.White} />
        </Pressable>
        </Animated.View>
      </View>
      {showModal && <DaySelectModal showModal setShowModal={setShowModal} selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>}
      <AnimeCardGrid isLoadingData={isLoadingData} isAllDataLoaded={isAllDataLoaded} animeList={scheduledAnime} fetchMoreAnime={fetchMoreAnime} page={page} viewAnime={viewAnime} navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  subHeader : {
    flexDirection : "row",
    color : COLORS.White,
    marginHorizontal : SPACING.space_15,
    justifyContent : "space-between",
    alignItems : "center",
    borderBottomWidth : 1,
    borderBottomColor : COLORS.WhiteRGBA45,
  },
  selectedDayText : {
    fontFamily : FONTFAMILY.lato_bold,
    fontSize : FONTSIZE.size_16,
    color : COLORS.White,
    textTransform : "capitalize"
  },
  modalToggleButton : {
    padding : SPACING.space_15
  },
  scrollViewContainer: {
    flex: 1,
  },
  scrollViewContentContainer : {
    flex : 1,
  },
  loaderContainer : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default SchedulesScreen