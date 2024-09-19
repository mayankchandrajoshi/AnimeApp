import { Animated, Dimensions, FlatList, Pressable, StyleSheet, Text, View, ViewToken } from 'react-native'
import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'
import useAnimatedPress from '../utils/animatedPress'
import { ActivityIndicator } from 'react-native-paper'

const { width } = Dimensions.get("screen")

interface TabPropsInterface {
    item: {
        name: string;
        component:  React.JSX.Element;
    },
    index : number,
    scrollToIndex:(index:number)=>void,
    scrollX : Animated.Value
}

const Tab:React.FC<TabPropsInterface> = memo(({ item,index,scrollToIndex,scrollX }) =>{

    const {backgroundColor,animateColorPressIn,animateColorPressOut,} = useAnimatedPress("transparent", COLORS.WhiteRGBA15,200,400);

    const color = scrollX.interpolate({
        inputRange : [(index - 1) * width, index * width, (index + 1) * width],
        outputRange: [COLORS.WhiteRGBA75, COLORS.White, COLORS.WhiteRGBA75],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View style={[{ backgroundColor }]} >
            <Pressable 
                onPress={()=>{scrollToIndex(index)}}
                onPressIn={animateColorPressIn}
                onPressOut={animateColorPressOut}
            >
                <Animated.Text style={[styles.headerListText,{ color }]}>
                    {item.name}
                </Animated.Text>
            </Pressable>
        </Animated.View>
    )
})

interface IndicatorProps {
    scrollX:Animated.Value,
    screenTitlesWidth : number[],
    screenTabPosX : number[],
    scrollXTabs : Animated.AnimatedInterpolation<string | number>
}

const Indicator = memo(forwardRef<View, IndicatorProps>(({scrollX,screenTitlesWidth,screenTabPosX,scrollXTabs}, ref) => {

    const indicatorWidth = scrollX.interpolate ({
        inputRange : screenTitlesWidth.map((_,i)=>i*width),
        outputRange :  screenTitlesWidth.map((width)=>width),
        extrapolate : 'clamp'
    })

    const positionLeft = scrollX.interpolate ({
        inputRange : screenTitlesWidth.map((_,i)=>i*width),
        outputRange : screenTabPosX.map((tabPosX,currIndex)=>{
            return tabPosX;
        }),
        extrapolate : 'clamp'
    })

    return (
        <Animated.View style={[styles.currentActiveBar, { width: indicatorWidth,left: Animated.subtract(positionLeft, scrollXTabs)}]} ref={ref}/>
    )
}))

interface  ScreenWrapperProps {
    isShow:boolean,
    component: (navigation: any) => React.JSX.Element,
    navigation : any
}

const ScreenWrapper : React.FC<ScreenWrapperProps> = memo(({isShow,component,navigation})=>{
    if(!isShow){
        return (
            <View style={{width:width,justifyContent:"center",alignItems:"center",backgroundColor:COLORS.WhiteRGBA15}}>
                <ActivityIndicator size="large" color={COLORS.OrangeRed}/>
            </View>
        )
    }
    return component(navigation);
})

const ScreenSelectionCarousal:React.FC<{ screens : { name:string,component: (navigation: any) => React.JSX.Element ,width:number }[], navigation: any }> = ({screens,navigation}) => {

    const scrollX = useRef(new Animated.Value(0)).current;
    
    const tabListRef = useRef<FlatList>(null);
    const indicatorRef = useRef<View>(null);
    const screenListRef = useRef<FlatList>(null);
    
    const [ maxIndexVisited,setMaxIndexVisited ] = useState(0);
    const [ tabWidths,setTabWidths ] = useState<number[]>(screens.map(screen=>screen.width));
    const [ tabPosX,setTabPosX ] = useState<number[]>(tabWidths)

    const tabWidthsRef = useRef<number[]>([]);
    const tabPosXRef = useRef<number[]>([]);

    const onItemLayout = useCallback((index:number) => (event:any) => {
        
        const { width } = event.nativeEvent.layout;

        tabWidthsRef.current.push(width);

        if(index>=1){
            tabPosXRef.current.push(tabPosXRef.current[index-1] + tabWidthsRef.current[index-1] + 6);
        }
        else {
            tabPosXRef.current.push(10);
        }
        if (tabWidthsRef.current.length === screens.length && tabPosXRef.current.length === screens.length) {
            setTabWidths([...tabWidthsRef.current]);
            setTabPosX([...tabPosXRef.current]);
        }
    },[screens])

    const indicatorOffset = useMemo(() => {
        return scrollX.interpolate({
            inputRange: screens.map((_, i) => i * width),
            outputRange: screens.map((screen, currIndex) => {
                // Within the range of 0 and width/2
                if (tabPosX[currIndex] <= width / 2) return 0;
        
                if (currIndex === screens.length - 1) {
                    if (tabPosX[currIndex] + tabWidths[currIndex] + 10 > width) {
                        // offset for prev screen
                        const prevOffset = width * (Math.floor((tabPosX[screens.length - 1] + tabWidths[screens.length - 1] + 10) / width) - 1);

                        // new offset distance to be added
                        const offset = ((tabPosX[screens.length - 1] + tabWidths[screens.length - 1] + 10) % width);
                        
                        return prevOffset + offset;
                    } else return 0;
                }

                // if they are the last elements of the tab list where they are within the range of totalTabListLength-width/2 to totalTabListLength;
                if ((tabPosX[screens.length - 1] + tabWidths[screens.length - 1] + 10) - tabPosX[currIndex] < width / 2) {
                    return (tabPosX[currIndex] - width / 2 - 6);
                }

                // between width/2 and totalTabListLength-width/2
                return (tabPosX[currIndex] - (width / 2));
            }),
            extrapolate: 'clamp'
        });
    }, [scrollX, screens, tabPosX, tabWidths, width]);

    const handleOnScroll = useCallback((event:any) => {
        Animated.event(
            [
                {
                    nativeEvent: {
                    contentOffset: {
                        x: scrollX,
                    },
                    },
                },
            ],
            {
                useNativeDriver: false,
            },
        )(event);

        const value = event.nativeEvent.contentOffset.x;

        // its zero for index 0 
        let correspondingOffset = 0;
        
        const scrollDistance = value%width>0?value%width:width;

        // Ratio of screen scrolled to total width of screen
        let scrolledRatio = scrollDistance/width;

        if(value/width>1){

            // Distance of front of previous Tab from center of screen
            const prevTabDisFromCenter = (tabPosX[Math.ceil(value/width)-1])-(width/2);

            // Distance of back of previous Tab from center of screen
            const prevTabBackDisFromCenter = (tabPosX[Math.ceil(value/width)-1]+tabWidths[Math.ceil(value/width)-1])-(width/2);

            //if the prevTab position is somewhere in middle of screen
            if(prevTabDisFromCenter<0 && prevTabBackDisFromCenter >0){
                if(scrolledRatio>=.285 && scrolledRatio<=.570){
                    correspondingOffset +=(prevTabBackDisFromCenter+6)*(scrolledRatio-.285)*3.5085
                }
                else if( scrolledRatio>.570){
                    correspondingOffset +=(prevTabBackDisFromCenter+6)
                }
            }
            else {
                // previous tab offset
                correspondingOffset+=(tabPosX[Math.ceil(value/width)-1]-(width/2));

                // to move the flatList based on distance between prev and current tab
                if(scrolledRatio>=.285 && scrolledRatio<=.570){
                    correspondingOffset += (tabPosX[Math.ceil(value/width)]-tabPosX[Math.ceil(value/width)-1])*(scrolledRatio-.285)*3.5085;
                }
                else if( scrolledRatio>.570){
                    correspondingOffset += (tabPosX[Math.ceil(value/width)]-tabPosX[Math.ceil(value/width)-1])
                }
            }
        }
        
        // only move flatlist when we have scrolled more than or equal toss 28.5% of screen width
        if(scrolledRatio>=.285) {
            tabListRef.current?.scrollToOffset({offset:correspondingOffset,animated:true});
        }
    },[scrollX,tabListRef,tabPosX,tabWidths,width]);
    

    const handleOnViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        const index = viewableItems[0]?.index ??0;
        if(index>maxIndexVisited) setMaxIndexVisited(index);
    },[maxIndexVisited]);

    const scrollToIndex = useCallback((index: number) => {
        screenListRef.current?.scrollToIndex({ animated: true, index });
    },[])


    return (
        <View style={{flex:1,zIndex:-1}}>
            <View>
                <FlatList ref={tabListRef}
                horizontal 
                data={screens}
                keyExtractor={(item,index)=>String(index)} 
                bounces={false}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                scrollEnabled={false}
                initialNumToRender={screens.length}
                style={[styles.header]}
                contentContainerStyle={{gap:SPACING.space_6,paddingHorizontal : SPACING.space_10}}
                renderItem={({item,index})=>(
                    <View onLayout={onItemLayout(index)}>
                        <Tab item={item} index={index} scrollToIndex={scrollToIndex} scrollX={scrollX}/>
                    </View>
                )}/>
            </View>
            {<Indicator scrollX={scrollX} screenTitlesWidth={tabWidths} screenTabPosX={tabPosX} ref={indicatorRef} scrollXTabs={indicatorOffset} />}
            <FlatList
                ref={screenListRef}
                horizontal 
                data={screens}
                keyExtractor={(item,index)=>String(index)} 
                pagingEnabled
                bounces={false}
                showsHorizontalScrollIndicator={false}
                onScroll={handleOnScroll}
                scrollEventThrottle={16}
                initialNumToRender={1}
                // viewabilityConfig={{
                //     itemVisiblePercentThreshold: 50,
                //     minimumViewTime : 100
                // }}
                onViewableItemsChanged={handleOnViewableItemsChanged}
                // onMomentumScrollEnd = {(event) => {
                //     const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                //     setCurrentActiveIndex(newIndex); 
                // }}
                style={{flex:1}}
                renderItem={({item,index})=>(
                    <ScreenWrapper isShow={index<=maxIndexVisited} component={item.component} navigation={navigation}/>
                )}
            />
        </View>
    )
}

export default ScreenSelectionCarousal

const styles = StyleSheet.create({
    header : {
        flex:0,
        borderBottomWidth : 1,
        borderBottomColor : COLORS.WhiteRGBA45,
        backgroundColor:COLORS.Black,
    },
    headerListText : {
        fontFamily : FONTFAMILY.lato_bold,
        fontSize : FONTSIZE.size_12,
        textTransform : "uppercase",
        padding:SPACING.space_16
    },
    currentActiveBar: {
        position:"absolute",
        top : SPACING.space_36*1.25,
        height: 2,
        backgroundColor: COLORS.OrangeRed,
        borderRadius : BORDERRADIUS.radius_4,
        zIndex : 99,
    },
})