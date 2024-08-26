import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AvatarCardWithName from './AvatarCardWithName'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'
import AvatarCardWithNameSkeleton from './AvatarCardWithNameSkeleton'

const { width } = Dimensions.get("screen")

const CharacterListHorizontal = ({isLoadingData,data,navigation}:{isLoadingData:boolean,data:any[],navigation:any}) => {
  return (
    <View style={{padding:SPACING.space_15,gap:SPACING.space_15}}>
      {isLoadingData?(
        <>
          <Text  style={[styles.textWhite20Bold]}>Voiced for</Text>
          <FlatList data={new Array(12)} bounces={false} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(item,index) => String(index)} contentContainerStyle={{gap:SPACING.space_10}}
            renderItem={({item})=>{
                return (
                    <AvatarCardWithNameSkeleton/>
                )
            }}
          />
        </>):(
          data.length!==0?(<>
            <Text  style={[styles.textWhite20Bold]}>Voiced for</Text>
            <FlatList data={data}bounces={false} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(item,index) => String(index)} contentContainerStyle={{gap:SPACING.space_10}} renderItem={({item,index})=>{
              return(
                <View style={{width:width/3-SPACING.space_15}}>
                  <AvatarCardWithName id={item.character.mal_id} name={item.character.name} navigate={()=>navigation.navigate("CharacterDetails",{id:item.character.mal_id})} image={item.character.images.jpg.image_url}/>
                </View>
              )
            }}/>
          </>):<></>
        )
      }
    </View>
  )
}

export default CharacterListHorizontal

const styles = StyleSheet.create({
  textWhite20Bold : {
    fontSize:FONTSIZE.size_20,
    fontFamily:FONTFAMILY.lato_bold,
    color:COLORS.White,
  },
})