import { Animated, Dimensions, FlatList, ImageBackground, Pressable, StyleSheet, Text,View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTSIZE, SPACING } from '../themes/themes'
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign, Entypo, FontAwesome, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import GenreCard from '../components/GenreCard';
import GenreCardSkeleton from '../components/GenreCardSkeleton';

const { width } = Dimensions.get("screen");

const Genres = [
  {
    id : 1,
    name : "Action",
    icon : <FontAwesome6 name="gun" size={FONTSIZE.size_14} color={COLORS.White} />,
    backGroundImg : require('../assets/images/genres/action.jpg')
  },
  { 
    id : 2,
    name : "Adventure",
    icon : <Foundation name="trees" size={FONTSIZE.size_18} color={COLORS.White} />,
    backGroundImg : require('../assets/images/genres/adventure.jpg')
  },
  {
    id : 4,
    name : "Comedy",
    icon : <FontAwesome6 name="laugh-squint" size={FONTSIZE.size_18} color={COLORS.White} />,
    backGroundImg : require('../assets/images/genres/comedy.jpg')
  },
  {
    id : 8,
    name : "Drama",
    icon : <FontAwesome6 name="masks-theater" size={FONTSIZE.size_18} color={COLORS.White} />,
    backGroundImg : require('../assets/images/genres/drama.jpg')
  },
  {
    id : 10,
    name : "Fantasy",
    icon : <FontAwesome6 name="fantasy-flight-games" size={FONTSIZE.size_18} color={COLORS.White} />,
    backGroundImg : require('../assets/images/genres/fantasy.jpg')
  },
  {
    id : 22,
    name : "Romance",
    icon : <AntDesign name="hearto" size={FONTSIZE.size_18} color={COLORS.White} />,
    backGroundImg : require('../assets/images/genres/romance.jpg')
  },
  {
    id : 28,
    name : "Boys Love",
    icon : <MaterialCommunityIcons name="human-male-male" size={FONTSIZE.size_18} color={COLORS.White} />,
    backGroundImg : require('../assets/images/genres/boys_love.jpg')
  },
  {
    id : 26,
    name : "Girls Love",
    icon : <MaterialCommunityIcons name="human-female-female" size={FONTSIZE.size_18} color={COLORS.White} />,
    backGroundImg : require('../assets/images/genres/girls_love.jpg')
  },
  {
    id : 35,
    name : "Harem",
    icon : <Foundation name="male-symbol" size={FONTSIZE.size_18} color={COLORS.White} />,
    backGroundImg : require('../assets/images/genres/harem.jpg')
  },
  {
    id : 73,
    name : "Reverse Harem",
    icon : <Foundation name="female-symbol" size={FONTSIZE.size_18} color={COLORS.White} />,
    backGroundImg : require('../assets/images/genres/reverse_harem.jpg')
  },
  {
    id : 24,
    name : "Sci-fi",
    icon : <FontAwesome6 name="microchip" size={FONTSIZE.size_18} color={COLORS.White} />,
    backGroundImg : require('../assets/images/genres/sci_fi.jpg')
  },
  {
    id : 42,
    name : "Seinen",
    icon : <FontAwesome name="male" size={FONTSIZE.size_18} color={COLORS.White} />,
    backGroundImg : require('../assets/images/genres/seinen.jpg')
  },
  {
    id : 25,
    name : "Shojo",
    icon : <FontAwesome name="female" size={FONTSIZE.size_18} color={COLORS.White} />,
    backGroundImg : require('../assets/images/genres/shojo.jpg')
  },
  {
    id : 27,
    name : "Shonen",
    icon : <FontAwesome6 name="hand-back-fist" size={FONTSIZE.size_18} color={COLORS.White} />,
    backGroundImg : require('../assets/images/genres/shonen.jpg')
  },
  {
    id : 36,
    name : "Slice of Life",
    icon : <Entypo name="drink" size={FONTSIZE.size_18} color={COLORS.White} />,
    backGroundImg : require('../assets/images/genres/slice_of_life.jpg')
  },
  {
    id : 30,
    name : "Sports",
    icon : <FontAwesome6 name="volleyball" size={FONTSIZE.size_18} color={COLORS.White} />,
    backGroundImg : require('../assets/images/genres/sports.jpg')
  },
  {
    id : 37,
    name : "Supernatural",
    icon : <FontAwesome6 name="ghost" size={FONTSIZE.size_18} color={COLORS.White} />,
    backGroundImg : require('../assets/images/genres/supernatural.jpg')
  },
  {
    id : 1,
    name : "Thriller",
    icon : <MaterialCommunityIcons name="knife" size={FONTSIZE.size_18} color={COLORS.White} />,
    backGroundImg : require('../assets/images/genres/thriller.jpg')
  }
]

const GenresScreen = ({navigation}:any) => {

  const [isLoadingGenre,setLoadingGenre ] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setLoadingGenre(false);
    },1000)
  },[])

  if(isLoadingGenre){
    return (
      <FlatList data={Genres} numColumns={2} keyExtractor={(item,index)=>String(index)}
        style={[styles.container,{ paddingHorizontal:SPACING.space_15 }]}
        columnWrapperStyle = {styles.rowContainer}
        renderItem={({item,index})=>(
          <GenreCardSkeleton/>
      )}/>
    )
  }
  return (
    <FlatList data={Genres} numColumns={2} keyExtractor={(item,index)=>String(index)}
    style={styles.container}
    columnWrapperStyle = {styles.rowContainer}
    contentContainerStyle = {styles.contentContainer}
    renderItem={({item,index})=>(
      <GenreCard item={item} navigation={navigation}/>
    )}/>
  )
}

export default GenresScreen

const styles = StyleSheet.create({
  container : {
    width:width,
    backgroundColor : COLORS.Black,
    paddingHorizontal : SPACING.space_15,
    paddingTop : SPACING.space_15
  },
  rowContainer : {
    gap : SPACING.space_8
  },
  contentContainer : {
    paddingBottom:SPACING.space_24
  }
})