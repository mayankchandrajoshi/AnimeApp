import { Animated, FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'
import { AntDesign } from '@expo/vector-icons'
import { seasonList } from '../api/apicalls'
import axios from 'axios'
import { seasonInterface } from '../interface/commonInterface'
import useAnimatedPress from '../utils/animatedPress'

interface ModalProps {
    isShowModal :boolean
    setIsShowModal : React.Dispatch<React.SetStateAction<boolean>>,
    selectedSeason : seasonInterface,
    setSelectedSeason : React.Dispatch<React.SetStateAction<seasonInterface>>
}

const getSeasonsList = async() =>{
    try {
      let { data } = await axios.get(seasonList);
      return data;
    } catch (error) {
      console.error(
        error,
      );
    }
}

const SeasonListElement: React.FC<{
    season: seasonInterface,
    props: ModalProps
}> = ({ season, props }) => {
    const { selectedSeason, setSelectedSeason, setIsShowModal } = props;
    
    const {backgroundColor,animateColorPressIn,animateColorPressOut,} = useAnimatedPress("transparent", COLORS.WhiteRGBA15,200,400);

    return (
        <Animated.View style={[
            { backgroundColor }
        ]}>
            <Pressable onPress={() => {
                setSelectedSeason(season);
                setIsShowModal(false);
            }} style={styles.action}
                onPressIn={animateColorPressIn}
                onPressOut={animateColorPressOut}
            >
                <Text style={[
                    styles.seasonName,
                    season.season === selectedSeason.season && season.year === selectedSeason.year ?
                    { color : COLORS.Red }:{ color : COLORS.White }

                ]}>{`${season.season} ${season.year}`}</Text>
            </Pressable>
        </Animated.View>
    )
}


const SeasonsListModal: React.FC<ModalProps> = ({ isShowModal, setIsShowModal, selectedSeason, setSelectedSeason }) => {
    const [seasonsList, setSeasonsList] = useState<seasonInterface[]>([]);

    useEffect(() => {
        (async () => {
            const { data } = await getSeasonsList();

            const processedSeasonList = data.reduce((acc: any, animeSeasons: any) => {
                const { year, seasons } = animeSeasons;
                const yearSeasons = seasons.map((season: any) => ({ year, season }));
                return acc.concat(yearSeasons);
            }, []);

            setSeasonsList(processedSeasonList);
        })()
    }, [])

    return (
        <Modal
            animationType="fade"
            presentationStyle='fullScreen'
            visible={isShowModal}
            onRequestClose={() => setIsShowModal(false)}
        >
            <View style={styles.modal}>
                <View style={styles.headingSection}>
                    <Pressable onPress={() => setIsShowModal(false)}>
                        <AntDesign name="close" size={FONTSIZE.size_30} color={COLORS.White} />
                    </Pressable>
                    <Text style={styles.heading}>
                        Seasons
                    </Text>
                </View>
                <FlatList
                    data={seasonsList}
                    keyExtractor={(item, index) => String(index)}
                    style={styles.seasonsContainer}
                    renderItem={({ item }) => (
                        <SeasonListElement
                            season={item}
                            props={{
                                isShowModal,
                                setIsShowModal,
                                selectedSeason,
                                setSelectedSeason
                            }}
                        />
                    )}
                >
                </FlatList>
            </View>
        </Modal>
    )
}


export default SeasonsListModal

const styles = StyleSheet.create({
    modal : {
        flex:1,
        backgroundColor : COLORS.Black
    },
    headingSection : {
        flexDirection : "row",
        padding:SPACING.space_15,
        gap : SPACING.space_15,
        alignItems:"center",
        borderBottomWidth : 1,
        borderBottomColor : COLORS.WhiteRGBA30
    },
    heading : {
        fontFamily : FONTFAMILY.lato_bold,
        fontSize : FONTSIZE.size_20,
        color : COLORS.White
    },
    seasonsContainer : {

    },
    action : {
        padding : SPACING.space_15,
    }
    ,
    seasonName : {
        fontFamily : FONTFAMILY.lato_regular,
        fontSize : FONTSIZE.size_16,
        color : COLORS.White,
        textTransform : "capitalize"
    }
})