import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackParamList } from '../types/navigationTypes';
import { RouteProp, useRoute } from '@react-navigation/native';
import { characterDetails } from '../api/apicalls';
import axios from 'axios';

type CharacterDetailsScreenRouteProp = RouteProp<RootStackParamList, 'CharacterDetails'>;

const getCharacterDetails = async(id:number)=>{
  try {
    const { data } = await axios.get(characterDetails(id));
    return data;
  } catch (error) {
    console.log(error);
  }
}

const CharacterDetailsScreen = () => {

  const { id } = useRoute<CharacterDetailsScreenRouteProp>().params;
  const [ characterDetails,setCharacterDetails ] = useState<any>();

  useEffect(()=>{
    (async()=>{
      const { data } = await getCharacterDetails(id);
      setCharacterDetails(data);
    })
  },[id])
  
  return (
    <ScrollView bounces={false}>
      
    </ScrollView>
  )
}

export default CharacterDetailsScreen