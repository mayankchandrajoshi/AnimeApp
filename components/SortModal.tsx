import { Animated, FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import useAnimatedPress from '../utils/animatedPress';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes';
import { AntDesign } from '@expo/vector-icons';
import { sortFilter } from '../constants/filters';

const SortModal = ({ sortBy,setSortBy,sortOrder,setSortOrder,translateXSortModal,showModal,closeModal }:{ sortBy:number,setSortBy:React.Dispatch<React.SetStateAction<number>>,sortOrder:"asc"|"desc",setSortOrder:React.Dispatch<React.SetStateAction<"asc"|"desc">>,translateXSortModal:Animated.Value,showModal:boolean,closeModal:()=>void }) =>{
    const [ selectedSortBy,setSelectedSortBy ] = useState(sortBy);
    const [ selectedSortOrder,setSelectedSortOrder ] = useState(sortOrder);

    const updateBtnAnimatedPress = useAnimatedPress("transparent", COLORS.WhiteRGBA30, 200, 400);
    
    const handleUpdate = () =>{
        setSortBy(selectedSortBy);
        setSortOrder(selectedSortOrder);
        closeModal();
    }
    return (
        <Modal 
            transparent
            visible={showModal}
            onRequestClose={closeModal}
        >
            <Animated.View 
            style={[styles.modalContainer,{transform: [{translateX:translateXSortModal }] }]}>
                <View style={styles.modalHeader}>
                    <Pressable onPress={closeModal}>
                        <AntDesign name="close" size={FONTSIZE.size_30} color={COLORS.White} />
                    </Pressable>
                    <Text style={styles.modalHeading}>
                        Sort
                    </Text>
                </View>
                <ScrollView bounces={false}
                    contentContainerStyle={{paddingBottom:SPACING.space_52}} 
                    scrollEventThrottle={16} 
                >
                    <View style={styles.modalContentSection}>
                        <Text style={styles.modalSectionHeading}>Sort by</Text>
                        <FlatList
                            data={sortFilter}
                            keyExtractor={(item, index) => String(index)}
                            contentContainerStyle={styles.filterOptionsWrapper}
                            scrollEnabled={false} 
                            renderItem={({ item,index }) => (
                                <Pressable onPress={()=>setSelectedSortBy(index)} style={styles.filterOptionContainer}>
                                    <View style = {[
                                        styles.modalRadioWrapper,
                                        selectedSortBy===index?{borderColor : COLORS.OrangeRed}:{borderColor : COLORS.White}
                                    ]}>
                                        <View style = {[
                                            styles.modalRadioInnerCircle,
                                            selectedSortBy===index?{backgroundColor : COLORS.OrangeRed}:{backgroundColor : COLORS.Black}
                                        ]}></View>
                                    </View>
                                    <View style={styles.modalTextWrapper}>
                                        <Text style={styles.filterName}>{item.name}</Text>
                                        <Text style={styles.filterDetails}>{item.details}</Text>
                                    </View>
                                </Pressable>
                        )}/>
                    </View>
                    <View style={styles.modalContentSection}>
                        <Text style={styles.modalSectionHeading}>Sort Order</Text>
                        <View style={styles.filterOptionsWrapper}>
                            <Pressable onPress={()=>setSelectedSortOrder("asc")} style={styles.filterOptionContainer}>
                                <View style = {[
                                    styles.modalRadioWrapper,
                                    selectedSortOrder==="asc"?{borderColor : COLORS.OrangeRed}:{borderColor : COLORS.White}
                                ]}>
                                    <View style = {[
                                        styles.modalRadioInnerCircle,
                                        selectedSortOrder==="asc"?{backgroundColor : COLORS.OrangeRed}:{backgroundColor : COLORS.Black}
                                    ]}></View>
                                </View>
                                <View style={styles.modalTextWrapper}>
                                    <Text style={styles.filterName}>Ascending</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={()=>setSelectedSortOrder("desc")} style={styles.filterOptionContainer}>
                                <View style = {[
                                    styles.modalRadioWrapper,
                                    selectedSortOrder==="desc"?{borderColor : COLORS.OrangeRed}:{borderColor : COLORS.White}
                                ]}>
                                    <View style = {[
                                        styles.modalRadioInnerCircle,
                                        selectedSortOrder==="desc"?{backgroundColor : COLORS.OrangeRed}:{backgroundColor : COLORS.Black}
                                    ]}></View>
                                </View>
                                <View style={styles.modalTextWrapper}>
                                    <Text style={styles.filterName}>Descending</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
                <Animated.View 
                    style={[styles.updateFilterBtn,
                        (sortBy!==selectedSortBy||sortOrder!=selectedSortOrder)?{backgroundColor:COLORS.OrangeRed}:{backgroundColor:COLORS.Black}
                    ]}
                >
                    <Animated.View 
                        style={[
                            (sortBy!==selectedSortBy||sortOrder!=selectedSortOrder)?{}:{borderWidth:SPACING.space_2,borderColor:COLORS.DimGrey},
                            (sortBy!==selectedSortBy||sortOrder!=selectedSortOrder)?{backgroundColor:updateBtnAnimatedPress.backgroundColor}:{}
                        ]}
                    >
                        <Pressable onPress={handleUpdate}
                            style={[(sortBy!==selectedSortBy||sortOrder!=selectedSortOrder)?{padding:SPACING.space_12}:{padding:SPACING.space_10}]}
                            onPressIn={updateBtnAnimatedPress.animateColorPressIn}
                            onPressOut={updateBtnAnimatedPress.animateColorPressOut}
                        >
                            <Text 
                                style={[
                                    styles.updateBtnText,(sortBy!==selectedSortBy||sortOrder!=selectedSortOrder)?{color:COLORS.Black}:{color:COLORS.DimGrey}
                                ]}
                            >Update sorting</Text>
                        </Pressable>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        </Modal>
    )
}


export default SortModal

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
        marginBottom : SPACING.space_12
    },
    filterOptionsWrapper : {
        gap : SPACING.space_28
    },
    filterOptionContainer : {
        backgroundColor : COLORS.Black,
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