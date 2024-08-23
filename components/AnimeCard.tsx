import { Animated, Dimensions, GestureResponderEvent, Image, Pressable, Share, StyleSheet, Text, Touchable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import watchListStore from '../store/watchListStore'
import QuickActionList from './QuickActionList'
import favoriteListStore from '../store/favoriteListStore'
import watchedListStore from '../store/watchedListStore'
import statusBarHeight from '../utils/getStatusBarHeight'

const { width:windowWidth,height:windowHeight } = Dimensions.get('window');

interface AnimeDetails {
    id: number,
    name : string,
    image_url : string,
    type : string
}

interface AnimeCardProps {
    id : number,
    name :string,
    image_url : string,
    type : string,
    width : number,
    index : number,
    isBoundaryCard : boolean,
    viewAnime : (id:number)=>void
}

const getActionList = (id: number, name: string,image_url:string,type:string, watchList: AnimeDetails[], addToWatchList: (data :AnimeDetails) => void, removeFromWatchList: (data :AnimeDetails) => void, isAnimeInWatchList: (data: AnimeDetails) => boolean ,watchedList: AnimeDetails[], addToWatchedList: (id: AnimeDetails) => void, removeFromWatchedList: (id: AnimeDetails) => void, isAnimeInWatchedList : (data: AnimeDetails) => boolean ,favoriteList: AnimeDetails[], addToFavoriteList: (id: AnimeDetails) => void, removeFromFavoriteList: (id: AnimeDetails) => void, isAnimeInFavoriteList: (data: AnimeDetails) => boolean ) => {
    return [
        {
            id: 0,
            name: isAnimeInWatchList({id,name,image_url,type}) ? "Remove from WatchList" : "Add to WatchList",
            action: () => {
                isAnimeInWatchList({id,name,image_url,type})? removeFromWatchList({
                    id,name,image_url,type
                }) : addToWatchList({
                    id,name,image_url,type
                });
            }
        },
        {
            id: 1,
            name:  isAnimeInWatchedList({id,name,image_url,type})  ? "Remove from WatchedList" : "Add to WatchedList",
            action: () => {
                isAnimeInWatchedList({id,name,image_url,type})  ? removeFromWatchedList({
                    id,name,image_url,type
                }) : addToWatchedList({
                    id,name,image_url,type
                });
            }
        },
        {
            id: 2,
            name: isAnimeInFavoriteList({id,name,image_url,type}) ? "Remove from Favorites" : "Add to Favorites",
            action: () => {
                isAnimeInFavoriteList({id,name,image_url,type})? removeFromFavoriteList({
                    id,name,image_url,type
                }) : addToFavoriteList({
                    id,name,image_url,type
                });
            }
        },
        {
            id: 3,
            name: "Share",
            action: async () => {
            try {
                const result = await Share.share({
                message: `Check out this amazing anime: https://portfolio-mjmj.vercel.app`,
                url: 'https://portfolio-mjmj.vercel.app/',
                title: name
                });
    
                if (result.action === Share.sharedAction) {
                    console.log('Successfully shared');
                }
            } catch (error) {
                console.error('Error sharing:', error);
            }
            }
        }
        ];
}

const AnimeCard:React.FC<AnimeCardProps> = ({id,name,image_url,type,width,index,isBoundaryCard,viewAnime}) => {
    
    const { watchList,addToWatchList,removeFromWatchList,isAnimeInWatchList }  = watchListStore();
    const { favoriteList,addToFavoriteList,removeFromFavoriteList,isAnimeInFavoriteList }  = favoriteListStore();
    const { watchedList,addToWatchedList,removeFromWatchedList,isAnimeInWatchedList }  = watchedListStore();

    const actionList = getActionList(id, name,image_url,type, watchList, addToWatchList, removeFromWatchList, isAnimeInWatchList , watchedList, addToWatchedList, removeFromWatchedList, isAnimeInWatchedList ,favoriteList, addToFavoriteList, removeFromFavoriteList,isAnimeInFavoriteList);

    const [isShowMenu,setIsShowMenu] = useState(false);
    const [activityMenuPositionTop,setActivityMenuPositionTop] = useState(0);
    const [activityMenuPositionLeft,setActivityMenuPositionLeft] = useState(0);

    const cardOpacity = useRef(new Animated.Value(1)).current;
    const menuRef = useRef<View>(null);

    const handlePressIn = () => {
        Animated.parallel([
            Animated.timing(cardOpacity, {
                toValue: 0.8,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePressOut = () => {
        Animated.parallel([
            Animated.timing(cardOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleViewMenu = () => {
        menuRef.current?.measure((fx, fy, width, height, px, py) => {
            setActivityMenuPositionLeft(px>windowWidth/2?px-(windowWidth*.47):0);
            // subtracted windowWidth*.47 so that to shift the action menu equal to its width

            setActivityMenuPositionTop(windowHeight-py<(50*(actionList.length+1))?py-(50*actionList.length):py+height+5);
            // 50*actionList.length is so as get the height of QuickActionList component
        });
        setIsShowMenu(true);
    }

    return (
        <Animated.View style={[styles.animatedWrapper,{opacity:cardOpacity}]}>
            <TouchableOpacity
            activeOpacity={1}
            style={[
                styles.container,
                { maxWidth : width,width},
                index==0&&isBoundaryCard?{marginLeft:SPACING.space_15}:{},
                index!=0&&isBoundaryCard?{marginRight:SPACING.space_15}:{},
            ]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={()=>viewAnime(id)}
        >
            <Image
                style={[styles.cardImage,{ width }]}
                source={{uri: image_url}}
            />
            {isAnimeInWatchList({id,name,image_url,type})&&<>
                <View style={styles.bookmarkBackground}></View>
                <MaterialIcons name="bookmark" size={FONTSIZE.size_18} color={COLORS.OrangeRed} style={styles.bookmark}/>
            </>}
            <View style ={styles.cardDetailsContainer}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                    {name}
                </Text>
                <View style={styles.moreDetailsContainer}>
                    <Text style={styles.cardType}>
                        {type}
                    </Text>
                    <View ref={menuRef} style={{backgroundColor:COLORS.Black}}>
                        <Pressable onPress={handleViewMenu} style={styles.quickActionMenu}>
                            <Entypo name="dots-three-vertical" size={FONTSIZE.size_16} color={COLORS.WhiteRGBA75}  />
                        </Pressable>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        {isShowMenu&&<QuickActionList actionMenu={actionList} isShowMenu setIsShowMenu={setIsShowMenu} top={activityMenuPositionTop-statusBarHeight} left={activityMenuPositionLeft}/>}  
        </Animated.View>
    )
}

export default AnimeCard

const styles = StyleSheet.create({
    animatedWrapper : {

    },
    container : {
        flex : 1,
        backgroundColor : COLORS.Black,
        gap:SPACING.space_4,
        overflow : "hidden"
    },
    cardImage : {
        aspectRatio: 2 / 3,    
    },
    cardDetailsContainer : {
        flex : 1,
    },
    cardTitle : {
        fontFamily : FONTFAMILY.lato_bold,
        fontSize : FONTSIZE.size_14,
        color : COLORS.WhiteRGBA75,
    },
    cardType : {
        fontFamily : FONTFAMILY.lato_regular,
        color : COLORS.WhiteRGBA60,
        fontSize : FONTSIZE.size_10,
    },
    moreDetailsContainer : {
        flex : 1,
        flexDirection :"row",
        justifyContent : "space-between",
        alignItems : "center",
    },
    bookmarkBackground : {
        position :"absolute",
        right : 0,
        top : 0,
        width : 49,
        aspectRatio : 1,
        backgroundColor : COLORS.Black,
        transform : [{translateX:SPACING.space_24},{translateY:-SPACING.space_24},{rotateZ : '45deg'}],
    },
    bookmark : {
        position :"absolute",
        right : 0,
        top : 0,
    },
    quickActionMenu : {
        paddingLeft:SPACING.space_4,
        paddingTop:SPACING.space_4
    }
})