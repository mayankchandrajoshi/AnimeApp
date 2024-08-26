import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AvatarCardWithName from './AvatarCardWithName'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'
import AvatarCardWithNameSkeleton from './AvatarCardWithNameSkeleton'

const { width } = Dimensions.get("screen")

const VoiceActorListHorizontal = ({isLoadingData,data,navigation}:{isLoadingData:boolean,data:any[],navigation:any}) => {
  return (
    <View style={{padding:SPACING.space_15,gap:SPACING.space_15}}>
      {isLoadingData?(
        <>
          <Text  style={[styles.textWhite20Bold]}>Voice Actors</Text>
          <FlatList data={new Array(12)} bounces={false} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(item,index) => String(index)} contentContainerStyle={{gap:SPACING.space_10}}
            renderItem={({item})=>{
                return (
                    <AvatarCardWithNameSkeleton/>
                )
            }}
          />
        </>):(
          data.length!==0?(<>
            <Text  style={[styles.textWhite20Bold]}>Voice Actors</Text>
            <FlatList data={data}bounces={false} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(item,index) => String(index)} contentContainerStyle={{gap:SPACING.space_10}} renderItem={({item,index})=>{
              return(
                <View style={{width:width/3-SPACING.space_15}}>
                  <AvatarCardWithName id={item.person.mal_id} name={item.person.name} navigate={()=>navigation.navigate("VoiceActorDetails",{id:item.person.mal_id})} image={item.person.images.jpg.image_url}/>
                </View>
              )
            }}/>
          </>):<></>
        )
      }
    </View>
  )
}

export default VoiceActorListHorizontal

const styles = StyleSheet.create({
  textWhite20Bold : {
    fontSize:FONTSIZE.size_20,
    fontFamily:FONTFAMILY.lato_bold,
    color:COLORS.White,
  },
})