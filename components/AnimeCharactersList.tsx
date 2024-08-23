import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { animeCharacter } from '../api/apicalls'
import axios from 'axios';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes';
import CharacterAvatarCard from '../components/CharacterAvatarCard';
import CharacterAvatarCardSkeleton from '../components/CharacterAvatarCardSkeleton';
import NoDataAvailable from '../components/NoDataAvailable';

const { width } = Dimensions.get("screen")

const getAnimeCharacters = async(id:number)=>{
    try {
        const { data } = await axios.get(animeCharacter(id));
        return data;
    } catch (error) {
        console.log(
            error
        );
    }
}

const AnimeCharactersList = ({id,navigation}:{id:number,navigation:any}) => {
    
    const [ animeCharacters,setAnimeCharacters ] = useState<any[]>([]);
    const [ isLoadingData,setIsLoadingData ] = useState(true);

    useEffect(()=>{
        (async()=>{
            const { data } = await getAnimeCharacters(id);
            setAnimeCharacters(data);
        })();
    },[id])

    useEffect(()=>{
        const timeOutId = setTimeout(()=>setIsLoadingData(false),500);
        return  ()=>{
            clearTimeout(timeOutId);
        }
    },[animeCharacters])
    
    return (
        <View style={{width:width,backgroundColor:COLORS.Black,padding:SPACING.space_15}}>
            {isLoadingData?(
                <FlatList data={new Array(18)} numColumns={3} keyExtractor={(item,index) => String(index)}
                    columnWrapperStyle={{gap:SPACING.space_10}} 
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=>{
                        return (
                            <CharacterAvatarCardSkeleton/>
                        )
                    }}
                />
            ):(
                animeCharacters.length>=1?<FlatList data={animeCharacters} bounces={false} scrollEnabled={false} 
                showsVerticalScrollIndicator={false} numColumns={3}  keyExtractor={(item,index) => String(index)} columnWrapperStyle={{gap:SPACING.space_10}} contentContainerStyle={{gap:SPACING.space_10}} renderItem={({item,index})=>{
                    return (
                        <CharacterAvatarCard id={item.mal_id} name={item.character.name} characterImg={item.character.images.jpg.image_url} navigation={navigation}/>
                    )
                }}/>:<NoDataAvailable heading='No data available' subHeading='Will be updated shortly'/>
            )}
        </View>
    )
}

export default AnimeCharactersList

const styles = StyleSheet.create({})