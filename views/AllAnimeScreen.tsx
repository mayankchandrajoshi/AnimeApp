import { StyleSheet, Text, View, FlatList, ScrollView, Pressable, Animated, Modal, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AnimeOrderFilter, AnimeRating, AnimeType } from '../enums/enums';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes';
import useAnimatedPress from '../utils/animatedPress';
import swfFilterStore from '../store/swfFilterStore';
import Slider from '@react-native-community/slider';
import axios from 'axios';
import { searchAnime } from '../api/apicalls';
import AnimeCardGrid from '../components/AnimeCardGrid';
import { is1DArrayEqual } from '../utils/compareArray';
import FilterModal from '../components/FilterModal';
import { animeRatingFilter, animeTypeFilter, sortFilter } from '../constants/filters';
import SortModal from '../components/SortModal';

const { width } = Dimensions.get("screen")

const getSearchAnime = async(sortBy:number,animeType:number,animeRating:number,animeGenres:number[],minScore:number,sortOrder:"asc"|"desc",isSWFEnabled:true|false,page:number=1)=>{
    try {
        const  { data } = await axios.get(searchAnime(null,animeTypeFilter[animeType].filter,minScore,animeRatingFilter[animeRating].filter,animeGenres,sortFilter[sortBy].sortBy,sortOrder,isSWFEnabled,page));
        return data;
    } catch (error) {
        console.error(
            error,
        );
    }
}

const AllAnimeScreen = ({navigation}:any) => {
    const [ isLoadingData,setLoadingData ] = useState(true);
    const [ isAllDataLoaded,setAllDataLoaded ] = useState(false);
    
    const [ sortBy,setSortBy ] = useState<number>(6);
    const [ sortOrder,setSortOrder ] = useState<"asc"|"desc">("asc");
    const [ animeType,setAnimeType ] = useState<number>(0);
    const [ animeRating,setAnimeRating ] = useState<number>(0);
    const [ animeGenres,setAnimeGenres ] = useState<number[]>([]);
    const [ minScore,setMinScore ] = useState<number>(0);
    const [ page,setPage ] = useState(1); 

    const [ animeList,setAnimeList ] = useState<any[]>([]);

    const [ showFilterModal,setShowFilterModal ] = useState(false);
    const [ showSortModal,setShowSortModal ] = useState(false);

    const { isSWFEnabled } = swfFilterStore();

    const sortAnimatedPress = useAnimatedPress("transparent", COLORS.WhiteRGBA15, 100, 400);
    const filterAnimatedPress = useAnimatedPress("transparent", COLORS.WhiteRGBA15, 100, 400);

    const translateXFilterModal = useRef(new Animated.Value(width)).current;

    const openFiltersModal = () => {
        setShowFilterModal(true);
        Animated.timing(translateXFilterModal, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };
    
    const closeFiltersModal = () => {
        Animated.timing(translateXFilterModal, {
            toValue: width, 
            duration: 200,
            useNativeDriver: true,
        }).start(() => setShowFilterModal(false));
    };
    
    const translateXSortModal = useRef(new Animated.Value(width)).current;

    const openSortModal = () => {
        setShowSortModal(true);
        Animated.timing(translateXSortModal, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };
    
    const closeSortModal = () => {
        Animated.timing(translateXSortModal, {
            toValue: width, 
            duration: 200,
            useNativeDriver: true,
        }).start(() => setShowSortModal(false));
    };

    useEffect(()=>{
        setLoadingData(true);
        const animeSearchHandler = setTimeout(()=>{(
            async()=>{
                const  data  = await getSearchAnime(sortBy,animeType,animeRating,animeGenres,minScore,sortOrder,isSWFEnabled,1);
                setAnimeList(data.data);
            
                setLoadingData(false);
                setPage(2);
                setAllDataLoaded(false);
            
                if(!data.pagination.has_next_page){
                    setAllDataLoaded(true);
                }
            }
        )()},500)

        return (()=>{
            clearTimeout(animeSearchHandler);
        })
    },[sortBy,animeType,animeRating,animeGenres,minScore,sortOrder,isSWFEnabled]);
    
    const fetchMoreAnime = async (page:number) =>{
    
        if(isAllDataLoaded) return;
    
        const data = await getSearchAnime(sortBy,animeType,animeRating,animeGenres,minScore,sortOrder,isSWFEnabled,page);
        setPage(page+1);
        setAnimeList((prevData)=>prevData.concat(data.data));
    
        if(!data.pagination.has_next_page){
            setAllDataLoaded(true);
        }
    }
    
    const viewAnime = (id:number)=>{
        navigation.push('AnimeDetails', {id});
    }

    return (
        <View style={styles.container}>
            <View style = {styles.headingContainer}>
                <Text style={styles.mainHeading}>{sortFilter[sortBy].name}</Text>
                <View style={styles.filterIconContainer}>
                    <Animated.View style={[{ backgroundColor : sortAnimatedPress.backgroundColor }]}>
                        <Pressable onPress={openSortModal}
                            onPressIn={ sortAnimatedPress.animateColorPressIn }
                            onPressOut={ sortAnimatedPress.animateColorPressOut }
                            style={[styles.filterIconButton,]}
                        >
                            <MaterialCommunityIcons name="sort-variant" size={FONTSIZE.size_20} color={COLORS.White} />
                        </Pressable>
                    </Animated.View>
                    <Animated.View style={[{ backgroundColor : filterAnimatedPress.backgroundColor }]}>
                        <Pressable onPress={openFiltersModal}
                            onPressIn={ filterAnimatedPress.animateColorPressIn }
                            onPressOut={ filterAnimatedPress.animateColorPressOut }
                            style={[styles.filterIconButton,]}
                        >
                            <AntDesign name="filter" size={FONTSIZE.size_20} color={COLORS.White} />
                        </Pressable>
                    </Animated.View>
                </View>
            </View>
            <FilterModal animeType={animeType} setAnimeType={setAnimeType} animeRating={animeRating} setAnimeRating={setAnimeRating} animeGenres={animeGenres}  setAnimeGenres={setAnimeGenres}  minScore ={minScore} setMinScore={setMinScore} translateXFilterModal={translateXFilterModal} showModal={showFilterModal} closeModal={closeFiltersModal}/>
            <SortModal sortBy={sortBy} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} translateXSortModal={translateXSortModal} showModal={showSortModal} closeModal={closeSortModal}/>
            <AnimeCardGrid isLoadingData={isLoadingData} isAllDataLoaded={isAllDataLoaded} animeList={animeList} fetchMoreAnime={fetchMoreAnime} page={page} viewAnime={viewAnime} navigation={navigation}/>
        </View>
    )
}

export default AllAnimeScreen

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor : COLORS.Black
    },
    headingContainer  :{
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        paddingLeft : SPACING.space_15,
        paddingRight : SPACING.space_3,
        paddingTop : SPACING.space_2
    },
    mainHeading : {
        fontFamily : FONTFAMILY.lato_bold ,
        color : COLORS.White,
        fontSize : FONTSIZE.size_16,
        textTransform : "capitalize"
    },
    filterIconContainer : {
        flexDirection : "row",
        gap : SPACING.space_2
    },
    filterIconButton : {
        paddingVertical : SPACING.space_12,
        paddingHorizontal : SPACING.space_12,
    },
})