import { Animated, Dimensions, FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import useAnimatedPress from '../utils/animatedPress';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes';
import { AntDesign } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { is1DArrayEqual } from '../utils/compareArray';
import { allAnimeGenres, animeRatingFilter, animeTypeFilter } from '../constants/filters';
import Checkbox from 'expo-checkbox';

const { width } = Dimensions.get("screen")

const FilterModal = ({animeType,setAnimeType,animeRating,setAnimeRating,animeGenres,setAnimeGenres,minScore,setMinScore,translateXFilterModal,showModal,closeModal}:{animeType:number,setAnimeType:React.Dispatch<React.SetStateAction<number>>,animeRating:number,setAnimeRating:React.Dispatch<React.SetStateAction<number>>,animeGenres:number[],setAnimeGenres:React.Dispatch<React.SetStateAction<number[]>>,minScore:number,setMinScore:React.Dispatch<React.SetStateAction<number>>,translateXFilterModal:Animated.Value,showModal:boolean,closeModal:()=>void}) =>{

    const [ selectedAnimeType,setSelectedAnimeType ] = useState(animeType);
    const [ selectedAnimeRating,setSelectedAnimeRating ] = useState(animeRating);
    const [ selectedAnimeGenres,setSelectedAnimeGenres ] = useState(animeGenres);
    const [ selectedMinScore,setSelectedMinScore ] = useState(minScore);

    const updateBtnAnimatedPress = useAnimatedPress("transparent", COLORS.WhiteRGBA30, 200, 400);
    
    const handleUpdate = () =>{
        setAnimeType(selectedAnimeType);
        setAnimeRating(selectedAnimeRating);
        setAnimeGenres(selectedAnimeGenres);
        setMinScore(selectedMinScore);
        closeModal();
    }

    return (
        <Modal 
            transparent
            visible={showModal}
            onRequestClose={closeModal}
        >
            <Animated.View 
            style={[styles.modalContainer,{transform: [{translateX:translateXFilterModal }] }]}>
                <View style={styles.modalHeader}>
                    <Pressable onPress={closeModal}>
                        <AntDesign name="close" size={FONTSIZE.size_30} color={COLORS.White} />
                    </Pressable>
                    <Text style={styles.modalHeading}>
                        Filters
                    </Text>
                </View>
                <ScrollView bounces={false}
                    contentContainerStyle={{paddingBottom:SPACING.space_52}} 
                    scrollEventThrottle={16} 
                >
                    <View style={styles.modalContentSection}>
                        <Text style={styles.modalSectionHeading}>Type</Text>
                        <FlatList
                            data={animeTypeFilter}
                            keyExtractor={(item, index) => String(index)}
                            contentContainerStyle={styles.filterOptionsWrapper}
                            scrollEnabled={false} 
                            renderItem={({ item,index }) => (
                                <Pressable onPress={()=>setSelectedAnimeType(index)} style={styles.filterOptionContainer}>
                                    <View style = {[
                                        styles.modalRadioWrapper,
                                        selectedAnimeType===index?{borderColor : COLORS.OrangeRed}:{borderColor : COLORS.White}
                                    ]}>
                                        <View style = {[
                                            styles.modalRadioInnerCircle,
                                            selectedAnimeType===index?{backgroundColor : COLORS.OrangeRed}:{backgroundColor : COLORS.Black}
                                        ]}></View>
                                    </View>
                                    <View style={styles.modalTextWrapper}>
                                        <Text style={styles.filterName}>{item.name}</Text>
                                    </View>
                                </Pressable>
                        )}/>
                    </View>
                    <View style={styles.modalContentSection}>
                        <Text style={styles.modalSectionHeading}>Rating</Text>
                        <FlatList
                            data={animeRatingFilter}
                            keyExtractor={(item, index) => String(index)}
                            contentContainerStyle={styles.filterOptionsWrapper}
                            scrollEnabled={false} 
                            renderItem={({ item,index }) => (
                                <Pressable onPress={()=>setSelectedAnimeRating(index)} style={styles.filterOptionContainer}>
                                    <View style = {[
                                        styles.modalRadioWrapper,
                                        selectedAnimeRating===index?{borderColor : COLORS.OrangeRed}:{borderColor : COLORS.White}
                                    ]}>
                                        <View style = {[
                                            styles.modalRadioInnerCircle,
                                            selectedAnimeRating===index?{backgroundColor : COLORS.OrangeRed}:{backgroundColor : COLORS.Black}
                                        ]}></View>
                                    </View>
                                    <View style={styles.modalTextWrapper}>
                                        <Text style={styles.filterName}>{item.name}</Text>
                                    </View>
                                </Pressable>
                        )}/>
                    </View>
                    <View style={styles.modalContentSection}>
                        <Text style={styles.modalSectionHeading}>Genres</Text>
                        <View style={[styles.filterOptionsWrapper,{flexDirection:"row",flexWrap:"wrap"}]}>
                            {
                                allAnimeGenres.map((item)=>{
                                    return (
                                        <View style={styles.filterOptionContainer} key={item.id}>
                                            <Checkbox
                                                value={selectedAnimeGenres.includes(item.id)}
                                                color={COLORS.OrangeRed}
                                                onValueChange={()=>{
                                                    selectedAnimeGenres.includes(item.id)?setSelectedAnimeGenres((prevGenres)=>prevGenres.filter((id)=>id!==item.id)):setSelectedAnimeGenres((prevGenres)=>prevGenres.concat(item.id))
                                                }}
                                            />
                                            <Pressable 
                                                onPress={()=>{
                                                        selectedAnimeGenres.includes(item.id)?setSelectedAnimeGenres((prevGenres)=>prevGenres.filter((id)=>id!==item.id)):setSelectedAnimeGenres((prevGenres)=>prevGenres.concat(item.id))
                                                    }}
                                            >
                                                <View style={styles.modalTextWrapper}>
                                                    <Text style={styles.filterName}>{item.name}</Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={styles.modalContentSection}>
                        <Text style={styles.modalSectionHeading}>Minimum Score {"\u00A0\u00A0:\u00A0\u00A0"+selectedMinScore}</Text>
                        <Slider
                            style={{width: width-SPACING.space_15*2, height: 40}}
                            value={selectedMinScore}
                            lowerLimit={0}
                            upperLimit={10}
                            minimumValue={0}
                            maximumValue = {10}
                            step = {.5}
                            minimumTrackTintColor={COLORS.OrangeRed}
                            maximumTrackTintColor={COLORS.White}
                            thumbTintColor = {COLORS.OrangeRed}
                            onSlidingComplete = { (value) => setSelectedMinScore(value) }
                        />
                    </View>
                </ScrollView>
                <Animated.View 
                    style={[styles.updateFilterBtn,
                        (animeType!==selectedAnimeType||minScore!==selectedMinScore||animeRating!==selectedAnimeRating||!is1DArrayEqual(animeGenres,selectedAnimeGenres))?{backgroundColor:COLORS.OrangeRed}:{backgroundColor:COLORS.Black}
                    ]}
                >
                    <Animated.View 
                        style={[
                            (animeType!==selectedAnimeType||minScore!==selectedMinScore||animeRating!==selectedAnimeRating||!is1DArrayEqual(animeGenres,selectedAnimeGenres))?{}:{borderWidth:SPACING.space_2,borderColor:COLORS.DimGrey},
                            (animeType!==selectedAnimeType||minScore!==selectedMinScore||animeRating!==selectedAnimeRating||!is1DArrayEqual(animeGenres,selectedAnimeGenres))?{backgroundColor:updateBtnAnimatedPress.backgroundColor}:{}
                        ]}
                    >
                        <Pressable onPress={handleUpdate}
                            style={[(animeType!==selectedAnimeType||minScore!==selectedMinScore||animeRating!==selectedAnimeRating||!is1DArrayEqual(animeGenres,selectedAnimeGenres))?{padding:SPACING.space_12}:{padding:SPACING.space_10}]}
                            onPressIn={updateBtnAnimatedPress.animateColorPressIn}
                            onPressOut={updateBtnAnimatedPress.animateColorPressOut}
                        >
                            <Text 
                                style={[
                                    styles.updateBtnText,(animeType!==selectedAnimeType||minScore!==selectedMinScore||animeRating!==selectedAnimeRating||!is1DArrayEqual(animeGenres,selectedAnimeGenres))?{color:COLORS.Black}:{color:COLORS.DimGrey}
                                ]}
                            >Update Filters</Text>
                        </Pressable>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        </Modal>
    )
}

export default FilterModal

const styles = StyleSheet.create({
    modalContainer : {
        flex:1,
        backgroundColor:COLORS.Black
    },
    modalHeader : {
        flexDirection : "row",
        padding:SPACING.space_15,
        gap : SPACING.space_24,
        alignItems:"center",
        // borderBottomWidth : 1,
        // borderBottomColor : COLORS.WhiteRGBA30
    },
    modalHeading : {
        fontFamily : FONTFAMILY.lato_bold,
        fontSize : FONTSIZE.size_20,
        color : COLORS.White
    },
    modalContentSection : {
        backgroundColor : COLORS.Black,
        paddingHorizontal : SPACING.space_15,
        gap : SPACING.space_12,
        paddingVertical : SPACING.space_20,
        borderBottomWidth:SPACING.space_2,
        borderBottomColor:COLORS.WhiteRGBA30
    },
    modalSectionHeading : {
        fontFamily : FONTFAMILY.lato_bold,
        fontSize : FONTSIZE.size_14,
        color : COLORS.WhiteRGBA90,
        textTransform : "uppercase",
        // marginBottom : SPACING.space_12
    },
    filterOptionsWrapper : {
    },
    filterOptionContainer : {
        backgroundColor : COLORS.Black,
        paddingVertical : SPACING.space_14,
        flexDirection : "row",
        gap : SPACING.space_16
    },
    modalRadioWrapper : {
        width : SPACING.space_20,
        height : SPACING.space_20,
        padding : SPACING.space_4,
        borderWidth : SPACING.space_2,
        borderRadius : BORDERRADIUS.radius_20,
    },
    modalRadioInnerCircle : {
        flex:1,
        borderRadius : BORDERRADIUS.radius_15,
        backgroundColor : COLORS.Black
    },
    modalTextWrapper : {
        gap:SPACING.space_4
    },
    filterName : {
        fontFamily : FONTFAMILY.lato_bold,
        fontSize : FONTSIZE.size_14,
        color : COLORS.WhiteRGBA90,
    },
    filterDetails : {
        fontFamily : FONTFAMILY.lato_bold,
        fontSize : FONTSIZE.size_12,
        color : COLORS.WhiteRGBA75,
    },
    updateFilterBtn : {
        position : "absolute",
        bottom:0,
        left:0,
        right:0,
        margin : SPACING.space_15
    },
    updateBtnText : {
        fontFamily : FONTFAMILY.lato_black,
        fontSize : FONTSIZE.size_14,
        textTransform:"uppercase",
        alignSelf : "center"
    }
})