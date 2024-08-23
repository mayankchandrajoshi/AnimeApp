import { Animated, Dimensions, Easing, FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'
import useAnimatedPress from '../utils/animatedPress';

const { width } = Dimensions.get("screen");

interface actionMenuInterface {
    id:number,
    name : string,
    action : ()=>void
}

interface ActionMenuProps {
    actionMenu:actionMenuInterface[],
    isShowMenu : boolean,
    setIsShowMenu : React.Dispatch<React.SetStateAction<boolean>>,
    top: number,
    left : number,
}

const ActionMenuComponent = ({item,setIsShowMenu}:{item:actionMenuInterface,setIsShowMenu:React.Dispatch<React.SetStateAction<boolean>>,})=>{

    const {backgroundColor,animateColorPressIn,animateColorPressOut,} = useAnimatedPress("transparent", COLORS.WhiteRGBA15,200,400);
    
    return (
        <Animated.View style={[
            { backgroundColor }
        ]}>
        <Pressable onPress={()=>{setIsShowMenu(false);item.action()}} style={styles.action}
            onPressIn={animateColorPressIn} 
            onPressOut={animateColorPressOut}
        >
            <Text style={styles.actionName}>{item.name}</Text>
        </Pressable>
    </Animated.View>
    )
}

const QuickActionMenu:React.FC<ActionMenuProps> = ({actionMenu,isShowMenu,setIsShowMenu,top,left}) => {
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={isShowMenu}
        onRequestClose={()=>setIsShowMenu(false)}
    >
        <Pressable onPress={()=>setIsShowMenu(false)} style={{width:"100%",height:"100%"}}>
            <View>
                <FlatList data={actionMenu}
                    keyExtractor={(item)=>String(item.id)}
                    style = {[styles.actionMenu,{top,left}]}
                    renderItem={({item})=>(
                        <ActionMenuComponent item={item} setIsShowMenu={setIsShowMenu}/>
                    )}
                />
            </View>
        </Pressable>
    </Modal>
  )
}

export default QuickActionMenu

const styles = StyleSheet.create({
    actionMenu : {
        position : "absolute",
        backgroundColor : COLORS.DullBlack,
        paddingVertical : SPACING.space_8,
        minWidth : width*.53,
    },
    action : {
        padding : SPACING.space_15,
    },
    actionName : {
        fontFamily  : FONTFAMILY.lato_regular,
        fontSize : FONTSIZE.size_14,
        color : COLORS.White,
    }
})