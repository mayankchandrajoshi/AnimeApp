import { ActivityIndicator, Alert, Animated, Dimensions, Image, Linking, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import userStore from '../store/userStore';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes';
import statusBarHeight from '../utils/getStatusBarHeight';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import useAnimatedPress from '../utils/animatedPress';
import axios from 'axios';
import { userInterface } from '../interface/commonInterface';
import convertToBase64 from '../utils/convertImageBase64';
import Toast from 'react-native-toast-message';
import * as SecureStore from 'expo-secure-store';

const { width,height } = Dimensions.get("screen")

const UpdateUserScreen = ({navigation}:any) => {

    const { userData ,login } = userStore();

    const [ profileImg,setProfileImg ] = useState(userData.user?.avatar.url);
    const [ name,setName ] = useState(userData.user?.name);
    const [ isUpdatingUser,setIsUpdatingUser ] = useState(false);
    
    const updateProfileBtnAnimatedPress = useAnimatedPress("transparent", COLORS.WhiteRGBA30, 200, 400);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permission Required',
                'Please grant permission to access photos.',
                [
                {
                    text: 'Open Settings',
                    onPress: () => {
                        Linking.openSettings();
                    },
                    style: 'cancel',
                },
                ],
                { cancelable: true }
            );
            return;
            }
    
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,4],
            quality: 1,
        });
    
        if (!result.canceled) {
            const imageBase64 = await convertToBase64(result.assets[0].uri);
            if(!imageBase64) return Toast.show({
                type: "error",
                text1: 'Error converting image to base64',
            })
            setProfileImg(imageBase64); 
        }
    };

    const handleSubmit = async() => {
        setIsUpdatingUser(true);
        if(!name||name?.length<3){
            setIsUpdatingUser(false);
            return Toast.show({
                type: 'error',
                text1: "Name cannot be less than 3 character",
            })
        }
        try {
            const newData:{
                name?:string,
                avatar?:string
            } = {};

            if(name!==userData.user?.name){
                newData.name = name;
            }
            if(profileImg!==userData.user?.avatar.url){
                newData.avatar = profileImg;
            }
            
            const token = await SecureStore.getItemAsync('JWTToken');
            const config ={ headers : {"Content-Type":"application/json",'Authorization': `Bearer ${token}`}};

            await axios.patch('https://anime-backend-delta.vercel.app/api/v1/user/update',newData,config);

            const { data:{user} }:{ data :{user:userInterface}} = await axios.get('https://anime-backend-delta.vercel.app/api/v1/me',config);

            login(user);
            navigation.goBack();
        } catch (error:any) {
            if(error?.response?.data?.message) {
                Toast.show({
                    type: 'error',
                    text1: error.response.data.message,
                })
            }
            else {
                console.log(error);
                Toast.show({
                    type: 'error',
                    text1: 'An error occurred.'
                });
            }
        }
        finally{
            setIsUpdatingUser(false);
        }
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={()=>{navigation.goBack()}} style={{position:"absolute",left:SPACING.space_16,top:statusBarHeight + SPACING.space_20,zIndex:10,padding:SPACING.space_8,borderRadius:BORDERRADIUS.radius_25}}>
                <AntDesign name="close" size={FONTSIZE.size_30} color={COLORS.White}/>
            </Pressable>
            <Text style={[styles.textWhite24Bold,{textAlign:"center",color:COLORS.OrangeRed}]}>Update Profile</Text>
            <View style={{ paddingVertical:SPACING.space_28,gap:SPACING.space_16 }}>
                <View style={{justifyContent:"center",alignItems:"center",marginVertical:SPACING.space_16}}>
                    <TouchableOpacity activeOpacity={.8} onPress={pickImage}>
                    {
                        <Image source={{ uri: profileImg }} style={styles.profileImg} />
                    }
                    <MaterialCommunityIcons name="camera-plus" size={FONTSIZE.size_30} color={COLORS.OrangeRed} style={{position:"absolute",right:0,bottom:0}}/>
                    </TouchableOpacity>
                </View>
                <TextInput
                    label="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    cursorColor = {COLORS.OrangeRed}
                    selectionColor = {COLORS.OrangeRed}
                    outlineColor = {COLORS.OrangeRed}
                    underlineColor = {COLORS.White}
                    activeUnderlineColor = {COLORS.OrangeRed}
                    textColor = {COLORS.White}
                    activeOutlineColor = {COLORS.OrangeRed}
                    selectionHandleColor = {COLORS.OrangeRed}
                    theme={{
                    colors: {
                        onSurfaceVariant : COLORS.WhiteRGBA60,
                        surfaceVariant : COLORS.WhiteRGBA10,
                    },
                    }}
                />
            </View>
            <Animated.View 
            style={[styles.updateProfileBtn,
                ((profileImg!=userData.user?.avatar.url||name!=userData.user?.name)&&!isUpdatingUser)?{backgroundColor:COLORS.OrangeRed}:{backgroundColor:COLORS.Black}
            ]}
            >
                <Animated.View 
                    style={[
                        ((profileImg!=userData.user?.avatar.url||name!=userData.user?.name)&&!isUpdatingUser)?{}:{borderWidth:SPACING.space_2,borderColor:COLORS.DimGrey},
                        ((profileImg!=userData.user?.avatar.url||name!=userData.user?.name)&&!isUpdatingUser)?{backgroundColor:updateProfileBtnAnimatedPress.backgroundColor}:{}
                    ]}
                >
                    <Pressable disabled={(!(profileImg!=userData.user?.avatar.url||name!=userData.user?.name)||isUpdatingUser)} onPress={handleSubmit}
                        style={[((profileImg!=userData.user?.avatar.url||name!=userData.user?.name)&&!isUpdatingUser)?{padding:SPACING.space_12}:{padding:SPACING.space_10}]}
                        onPressIn={updateProfileBtnAnimatedPress.animateColorPressIn}
                        onPressOut={updateProfileBtnAnimatedPress.animateColorPressOut}
                    >
                        {
                            !isUpdatingUser?(
                                <Text 
                                    style={[
                                        styles.updateProfileBtnText,((profileImg!=userData.user?.avatar.url||name!=userData.user?.name)&&!isUpdatingUser)?{color:COLORS.Black}:{color:COLORS.DimGrey}
                                    ]}
                                >UPDATE</Text>
                            ):(
                                <ActivityIndicator size={FONTSIZE.size_18} color={COLORS.DimGrey} />
                            )
                        }
                    </Pressable>
                </Animated.View>
        </Animated.View>
        </View>
    )
}

export default UpdateUserScreen

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:COLORS.BlackRGB90,
        paddingTop : statusBarHeight + SPACING.space_28, 
        paddingHorizontal : SPACING.space_20
    },
    textWhite24Bold : {
        fontSize:FONTSIZE.size_24,
        fontFamily:FONTFAMILY.lato_bold,
        color:COLORS.White,
    },
    profileImg : {
        width: width<height?width/4:height/4,
        height :  width<height?width/4:height/4,
        borderRadius :  width<height?width/4:height/4,
    },
    updateProfileBtn : {
        marginTop : SPACING.space_15
    },
    updateProfileBtnText : {
        fontFamily : FONTFAMILY.lato_black,
        fontSize : FONTSIZE.size_14,
        textTransform:"uppercase",
        alignSelf : "center"
    },
})