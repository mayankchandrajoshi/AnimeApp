import { View, Text, ScrollView, StyleSheet, Image, Dimensions, Pressable, Animated, Vibration, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackParamList } from '../types/navigationTypes';
import { RouteProp, useRoute } from '@react-navigation/native';
import { characterDetails, characterVoiceActor } from '../api/apicalls';
import axios from 'axios';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import statusBarHeight from '../utils/getStatusBarHeight';
import useAnimatedPress from '../utils/animatedPress';
import VoiceActorListHorizontal from '../components/VoiceActorListHorizontal';

const { width,height } = Dimensions.get("screen")

type CharacterDetailsScreenRouteProp = RouteProp<RootStackParamList, 'CharacterDetails'>;

const getCharacterDetails = async(id:number)=>{
  try {
    const { data } = await axios.get(characterDetails(id));
    return data;
  } catch (error) {
    console.log(error);
  }
}

const getCharacterVoiceActor = async(id:number) => {
  try {
    const { data } = await axios.get(characterVoiceActor(id));
    return data;
  } catch (error) {
    console.log(error);
  }
}

const CharacterDetailsScreen = ({navigation}:any) => {
  
  const { id } = useRoute<CharacterDetailsScreenRouteProp>().params;
  const [ characterDetails,setCharacterDetails ] = useState<any>();
  const [ characterVoiceActor,setCharacterVoiceActor ] = useState<any[]>([]);

  const [ isLoadingVoiceActor,setIsLoadingVoiceActor ] = useState(true);

  const [ showBackBtnTooltip,setShowBackBtnTooltip ] = useState(false);

  const { backgroundColor: backgroundColorBackBtn,animateColorPressIn: animateColorPressInBackBtn,animateColorPressOut: animateColorPressOutBackBtn } = useAnimatedPress("transparent", COLORS.WhiteRGBA15,200,400);

  useEffect(()=>{
    setIsLoadingVoiceActor(true);
    (async()=>{
      const { data } = await getCharacterDetails(id);
      setCharacterDetails(data);
      
      const { data:voiceActors }  = await getCharacterVoiceActor(id);
      setCharacterVoiceActor(voiceActors);
    })();
  },[id])

  useEffect(()=>{
    const timeoutId = setTimeout(()=>{
      setIsLoadingVoiceActor(false);
    },500)

    return ()=>clearTimeout(timeoutId);
  },[characterVoiceActor])

  if(!characterDetails) return (
    <ScrollView bounces={false} scrollEventThrottle={16} showsVerticalScrollIndicator={false} style={{flex:1,backgroundColor:COLORS.Black}} contentContainerStyle={{flex:1}}>
      <View style={styles.subContainer}>
        <Animated.View style={[{backgroundColor:backgroundColorBackBtn,padding:SPACING.space_8,borderRadius:BORDERRADIUS.radius_20}]}>
          <Pressable onPress={()=>navigation.goBack()} onPressIn={animateColorPressInBackBtn} onPressOut={()=>{animateColorPressOutBackBtn();setTimeout(()=>setShowBackBtnTooltip(false),700)}} onLongPress={()=>{Vibration.vibrate(100);setShowBackBtnTooltip(true)}}>
            <MaterialIcons name="arrow-back" size={FONTSIZE.size_24} color={COLORS.White} />
            {showBackBtnTooltip && (
              <Text style={[styles.iconToolTip,{ width : 70,left : "0%", }]}>
                Back
              </Text>
            )}
          </Pressable>
        </Animated.View>
      </View>
      <LinearGradient colors={[COLORS.OrangeRed,COLORS.OrangeRed90,COLORS.OrangeRed60,COLORS.BlackRGB60,COLORS.Black]} locations={[.25,.4,.5,.75,1]} style={{height:height/2}}>
      </LinearGradient>
      <View style={{flex:1}}>
        <ActivityIndicator size={"large"} color={COLORS.OrangeRed}/>
      </View>
    </ScrollView>
  )

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Animated.View style={[{backgroundColor:backgroundColorBackBtn,padding:SPACING.space_8,borderRadius:BORDERRADIUS.radius_20}]}>
          <Pressable onPress={()=>navigation.goBack()} onPressIn={animateColorPressInBackBtn} onPressOut={()=>{animateColorPressOutBackBtn();setTimeout(()=>setShowBackBtnTooltip(false),700)}} onLongPress={()=>{Vibration.vibrate(100);setShowBackBtnTooltip(true)}}>
            <MaterialIcons name="arrow-back" size={FONTSIZE.size_24} color={COLORS.White} />
            {showBackBtnTooltip && (
              <Text style={[styles.iconToolTip,{ width : 70,left : "0%", }]}>
                Back
              </Text>
            )}
          </Pressable>
        </Animated.View>
      </View>
      <ScrollView bounces={false} scrollEventThrottle={16} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:SPACING.space_28}}>
        <LinearGradient colors={[COLORS.OrangeRed,COLORS.OrangeRed90,COLORS.OrangeRed60,COLORS.BlackRGB60,COLORS.Black]} locations={[.25,.4,.5,.75,1]}>
          <View style={styles.characterImgWrapper}>
            <Image source={{uri:characterDetails.images.jpg.image_url}} style={styles.characterImg}/>
          </View>
          <View style={{marginBottom:SPACING.space_16}}>
            <Text style={[styles.textWhite24Bold,{textAlign:"center"}]}>
              {characterDetails.name}
            </Text>
          </View>
        </LinearGradient>
        {characterDetails.about&&<View style={{gap:SPACING.space_12,paddingHorizontal:SPACING.space_15}}>
          { (characterDetails.about as string).split('\n').map((line,index)=>{
            return (
              <Text style={[styles.textWhite16Regular,{color:COLORS.WhiteRGBA90}]} key={index}>
                {line}
              </Text>
            )
          })}
        </View>}
        <VoiceActorListHorizontal isLoadingData={isLoadingVoiceActor} data={characterVoiceActor} navigation={navigation}/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex:1,
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
    backgroundColor : COLORS.OrangeRed
  },
  characterImgWrapper : {
    width:width,
    paddingHorizontal : SPACING.space_8,
    paddingTop : statusBarHeight + SPACING.space_60,
    paddingBottom : SPACING.space_32,
    justifyContent:"center",
    alignItems:"center",
  },
  characterImg : {
    width:width/1.8,
    aspectRatio:1,
    borderRadius:width/3,
  },
  textWhite24Bold : {
    fontSize:FONTSIZE.size_24,
    fontFamily:FONTFAMILY.lato_bold,
    color:COLORS.White,
  },
  textWhite16Regular : {
    fontSize:FONTSIZE.size_16,
    fontFamily:FONTFAMILY.lato_regular,
    color:COLORS.White,
  },
  iconToolTip : {
      position : "absolute",
      bottom:'-180%',
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
})

export default CharacterDetailsScreen