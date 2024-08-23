import { Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'
import { Entypo, Feather, MaterialIcons } from '@expo/vector-icons'
import watchListStore from '../store/watchListStore'
import { LinearGradient } from 'expo-linear-gradient'

const { width } = Dimensions.get("screen")

interface MainScreenPosterProps {
    id : number,
    name : string,
    image_url : string,
    synopsis : string,
    genres : string[],
    type : string,
    viewAnime : (id:number)=>void
}

const MainScreenPoster:React.FC<MainScreenPosterProps> = ({id,name,image_url,synopsis,genres,type,viewAnime}) => {
  
  const { watchList,addToWatchList,removeFromWatchList,isAnimeInWatchList }  = watchListStore();

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.posterImage}
          source={{uri: image_url}}
        />
      </View>
      <LinearGradient colors={["transparent",COLORS.Black]} locations={[0.0, 0.3]} style = {styles.contentContainer}>
        <View>
          <View style = {styles.detailsContainer}>
            <Text style={styles.animeTypeText}>
              {type}
            </Text>
            <Entypo name="dot-single" size={FONTSIZE.size_16} color={COLORS.WhiteRGBA90} />
            <Text style={styles.genresText}>
              {genres.join(",")}
            </Text>
          </View>
          <View style={styles.descriptionWrapper}>
            <Text style = {styles.descriptionText} numberOfLines={3}>
              {synopsis}
            </Text>
          </View>
          <View style ={styles.actionsContainer}>
            <TouchableOpacity activeOpacity={0.8} style={styles.viewAnimeButton} 
              onPress={()=>viewAnime(id)}
            >
              <Text style={styles.viewAnimeText}>
                View Anime
              </Text>
            </TouchableOpacity>
            <Pressable onPress={()=>isAnimeInWatchList({id,name,image_url,type})?removeFromWatchList({id,name,image_url,type}):addToWatchList({id,name,image_url,type})} style={styles.bookmarkIconWrapper}>
              {
                isAnimeInWatchList({id,name,image_url,type})?<View style={[{minWidth:20}]}>
                  <MaterialIcons name="bookmark" size={FONTSIZE.size_20} color={COLORS.OrangeRed}/>
                </View> :<View style={[{minWidth:20}]}>
                  <Feather name="bookmark" size={FONTSIZE.size_20} color={COLORS.OrangeRed}/>
                </View>
              }
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

export default MainScreenPoster

const styles = StyleSheet.create({
  container : {

  },
  imageWrapper : {
  
  },
  posterImage : {
    width:width,
    aspectRatio:.67,
  },
  contentContainer : {
    position:"absolute",
    bottom:0,
    paddingHorizontal : SPACING.space_15,
    paddingVertical : SPACING.space_4,
  },
  detailsContainer : {
    flex : 1,
    flexDirection : "row",
    alignItems : "center",
    marginBottom : SPACING.space_4
  },
  
  animeTypeText : {
    fontSize : FONTSIZE.size_12,
    fontFamily : FONTFAMILY.lato_regular,
    color : COLORS.WhiteRGBA90,
  },
  genresText : {
    fontSize : FONTSIZE.size_12,
    fontFamily : FONTFAMILY.lato_regular,
    color : COLORS.WhiteRGBA90,
  },
  descriptionWrapper : {
    marginBottom:SPACING.space_20
  },
  descriptionText : {
    fontFamily : FONTFAMILY.lato_regular,
    color : COLORS.White,
    lineHeight : SPACING.space_20,
    fontSize : FONTSIZE.size_14,
  },
  actionsContainer : {
    flex : 1,
    flexDirection : "row",
    alignItems : "center",
    gap : SPACING.space_15
  },
  viewAnimeButton : {
    flex : 1,
    backgroundColor : COLORS.OrangeRed,
    padding : SPACING.space_12
  },
  viewAnimeText : {
    fontFamily : FONTFAMILY.lato_bold,
    fontSize : FONTSIZE.size_14,
    textTransform : "uppercase",
    textAlign : "center"
  },
  bookmarkIconWrapper : {
    borderWidth : 2,
    borderColor : COLORS.OrangeRed,
    padding : SPACING.space_8
  }
})