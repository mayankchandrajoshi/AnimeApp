import { Animated, Dimensions, FlatList, Pressable, StyleSheet, Text, View, ViewToken } from 'react-native'
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'
import useAnimatedPress from '../utils/animatedPress'
import estimateTextWidth from '../utils/estimateTextWidth'

const { width } = Dimensions.get("screen")

interface TabPropsInterface {
    item: {
        name: string;
        component: (navigation: any) => React.JSX.Element;
    },
    index : number,
    currentActiveIndex:number,
    setCurrentActiveIndex:React.Dispatch<React.SetStateAction<number>>,
    scrollToIndex:(index:number)=>void,
    setCurrentActiveList : React.Dispatch<React.SetStateAction<1|2>>
}

const Tab:React.FC<TabPropsInterface> = ({ item,index,currentActiveIndex,setCurrentActiveIndex,scrollToIndex,setCurrentActiveList }) =>{

    const {backgroundColor,animateColorPressIn,animateColorPressOut,} = useAnimatedPress("transparent", COLORS.WhiteRGBA15,200,400);

    return (
        <Animated.View style={[{ backgroundColor }]} >
            <Pressable 
                onPress={()=>{setCurrentActiveIndex(index);scrollToIndex(index);setCurrentActiveList(2)}}
                onPressIn={animateColorPressIn}
                onPressOut={animateColorPressOut}
            >
                <Animated.Text style={[styles.headerListText,currentActiveIndex===index?{color : COLORS.White}:{color : COLORS.WhiteRGBA75}]}>
                    {item.name}
                </Animated.Text>
            </Pressable>
        </Animated.View>
    )
}

interface IndicatorProps {
    scrollX:Animated.Value,
    screenTitleWidths: number[],
    screenTitlePosX: number[]
}

const Indicator = forwardRef<View, IndicatorProps>(({scrollX,screenTitlePosX,screenTitleWidths}, ref) => {

    if(screenTitlePosX.length<2) return <View></View>
    
    const inputRange = screenTitleWidths.map((_,i)=>i*width);

    const indicatorWidth = scrollX.interpolate ({
        inputRange,
        outputRange :  screenTitleWidths.map((titleWidth)=>titleWidth)
    })

    const positionLeft = scrollX.interpolate ({
        inputRange,
        outputRange : screenTitlePosX.map((posX,index)=>{

            if(index===screenTitlePosX.length-1){
                if(screenTitlePosX[index]+screenTitleWidths[index]>width) return width-screenTitleWidths[index]-10;
                else return screenTitlePosX[index];
            }

            if(posX>width/2){
                return width/2;
            }

            return posX;
        })
    })

    return (
        <Animated.View style={[styles.currentActiveBar, { width: indicatorWidth,left: positionLeft}]} ref={ref}/>
    )
})


const ScreenSelectionCarousal:React.FC<{ screens : { name:string,component: (navigation: any) =>React.JSX.Element }[], navigation: any }> = ({screens,navigation}) => {

    const [ currentActiveIndex,setCurrentActiveIndex ] = useState(0);

    const [ screenTitleWidths, setScreenTitleWidths ] = useState<number[]>([]);
    const [ screenTitlePosX, setScreenTitlePosX ] = useState<number[]>([]);
    const [ currentActiveList,setCurrentActiveList ] = useState<1|2>(2);

    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollXTabs = useRef(new Animated.Value(0)).current;

    const screenListRef = useRef<FlatList>(null);
    const tabsListRef = useRef<FlatList>(null);
    const indicatorRef = useRef<View>(null);

    useEffect(()=>{
        let TabsWidth:number[] = [];
        let TabsPosX: number[] = [];

        // Measuring the width of screen name tab
        TabsWidth = screens.map((screen)=>estimateTextWidth(screen.name.toUpperCase(),FONTSIZE.size_12)+30-2);

        let posX = 10;

        // Measuring the position to left from the start of flatlist of the screen name tab
        TabsPosX = screens.map((screen)=>{
            const temp =  posX;
            posX = posX + estimateTextWidth(screen.name.toUpperCase(),FONTSIZE.size_12)+30-2 + 10;
            return temp;
        })

        setScreenTitleWidths(TabsWidth);
        setScreenTitlePosX(TabsPosX);
    },[screens])

    const handleOnScroll = (event:any) => {
        // getting the scrollX position of the second flatlist
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
    };

    useEffect(()=>{
        // adding a listener to the scrollX  to get the corresonding offset for tablist
        const listenerId = scrollX.addListener(({value})=>{
            // its zero for index 0 and 1
            let correspondingOffset = 0;

            if(value/width>1){
                // getting the scrollDisplacement based on screen width 
                const scrollDistance = value%width>0?value%width:width;

                // Ratio of screen scrolled
                let scrolledRatio = scrollDistance/width;

                // *2 to make it twice as fast as the indicator 
                if(scrolledRatio<=.5){
                    scrolledRatio*=2;
                }
                else {
                    // as it will be 1 when its at .5
                    scrolledRatio = 1;
                }
                
                if(value/width>2){
                    // to get prev tab distance from center
                    correspondingOffset+=(screenTitlePosX[Math.ceil(value/width)-1]-(width/2));

                    // to move the flatlist based on distance between prev and current tab
                    correspondingOffset += (screenTitlePosX[Math.ceil(value/width)]-screenTitlePosX[Math.ceil(value/width)-1])*scrolledRatio;
                }
                else {
                    // to make it to center
                    correspondingOffset +=(screenTitlePosX[Math.ceil(value/width)]-(width/2))*scrolledRatio
                }
            }

            tabsListRef.current?.scrollToOffset({
                offset: correspondingOffset,
                animated: true,
            });
            
            //  to set it to 0 if we move the second flatlist
            indicatorRef.current?.setNativeProps({
                style:{
                    marginLeft : 0
                }
            })
        })

        return () => {
            scrollX.removeListener(listenerId);
        };
    },[scrollX,screenTitlePosX])

    const handleOnScrollTabs = (event:any) => {
        // getting x position of first flatlist
        Animated.event(
            [
                {
                    nativeEvent: {
                    contentOffset: {
                        x: scrollXTabs,
                    },
                    },
                },
            ],
            {
                useNativeDriver: false,
            },
        )(event);
    };

    useEffect(()=>{
        const listenerId = scrollXTabs.addListener(({value})=>{
            
            // if we are not scrolling the first flatlist
            if(currentActiveList!==1) return;

            // for 0 and 1 the offset will be equal to scrolled value as it is as zero offset initially
            let indicatorOffset = value;
            
            if(currentActiveIndex >1) {
                // for last index the initial offset is padding* 2 + prev tab scrollPosX - width/2
                if(currentActiveIndex===screenTitlePosX.length-1){
                    if(screenTitlePosX[currentActiveIndex]+screenTitleWidths[currentActiveIndex]>width) 
                        indicatorOffset-= ((screenTitlePosX[currentActiveIndex-1]-(width/2))+SPACING.space_10*2)
                }
                else {
                    // for all others its initial offset is distance from center
                    indicatorOffset-= (screenTitlePosX[currentActiveIndex]-(width/2));
                }
            }

            indicatorRef.current?.setNativeProps({
                style:{
                    marginLeft : -indicatorOffset
                }
            })
        })
        return () => {
            scrollXTabs.removeListener(listenerId);
        };
    },[scrollXTabs,currentActiveList])

    const handleOnViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        setCurrentActiveIndex(viewableItems[0]?.index??0);
    }).current;
    

    const scrollToIndex = React.useCallback((index: number) => {
        screenListRef.current?.scrollToIndex({ animated: true, index });
    },[])

    return (
        <View style={{flex:1}}>
            <View>
                <Animated.FlatList horizontal data={screens} 
                    ref = {tabsListRef}
                    keyExtractor={(item,index)=>String(index)}
                    decelerationRate={0}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    style={[styles.header]}
                    contentContainerStyle = {{gap:SPACING.space_10,paddingHorizontal : SPACING.space_10}}
                    onScroll={handleOnScrollTabs}
                    scrollEventThrottle={16}
                    onScrollBeginDrag={()=>setCurrentActiveList(1)}
                    renderItem={({item,index})=>(
                        <Tab item={item} index={index} currentActiveIndex={currentActiveIndex} setCurrentActiveIndex={setCurrentActiveIndex} scrollToIndex={scrollToIndex} setCurrentActiveList={setCurrentActiveList}/>
                )}/>
            </View>
            <Indicator screenTitleWidths={screenTitleWidths} screenTitlePosX ={screenTitlePosX} scrollX={scrollX} ref={indicatorRef}/>
            <FlatList
                ref={screenListRef}
                horizontal 
                data={screens} keyExtractor={(item,index)=>String(index)} 
                pagingEnabled
                bounces={false}
                showsHorizontalScrollIndicator={false}
                onScroll={handleOnScroll}
                scrollEventThrottle={16}
                onTouchStart={()=>setCurrentActiveList(2)}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50,
                    minimumViewTime : 100
                }}
                onViewableItemsChanged={handleOnViewableItemsChanged}
                style={{flex:1}}
                renderItem={({item})=>(
                    item.component(navigation)
            )}/>
        </View>
    )
}

export default ScreenSelectionCarousal

const styles = StyleSheet.create({
    header : {
        borderBottomWidth : 1,
        borderBottomColor : COLORS.WhiteRGBA45,
        backgroundColor:COLORS.Black
    },
    headerListText : {
        fontFamily : FONTFAMILY.lato_bold,
        fontSize : FONTSIZE.size_12,
        textTransform : "uppercase",
        padding:SPACING.space_15
    },
    currentActiveBar: {
        position:"absolute",
        top : SPACING.space_36*1.2,
        height: 2,
        backgroundColor: COLORS.OrangeRed,
        borderRadius : BORDERRADIUS.radius_4,
        zIndex : 99,
    },
})