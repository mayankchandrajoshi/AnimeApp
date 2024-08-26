import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/themes'
import { FontAwesome5, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import statusBarHeight from '../utils/getStatusBarHeight'

const { width,height } = Dimensions.get("screen")

const UserScreen = ({navigation}:any) => {
  return (
    <View style={styles.container}>
      <View style={{padding:SPACING.space_6}}>
        <Text style={[styles.textWhite24Bold,{textAlign:"center",color:COLORS.OrangeRed}]}>Profile</Text>
        <TouchableOpacity activeOpacity={.8} onPress={()=>{}}  style={styles.editBtn}>
          <FontAwesome5 name="pen" size={FONTSIZE.size_24} color={COLORS.Black} />
        </TouchableOpacity>
      </View>
      <View style={{ paddingVertical:SPACING.space_28,justifyContent:"center",alignItems:"center",gap:SPACING.space_16 }}>
        <Image source={require("../assets/images/placeholders/profile_pic.jpg")} style={styles.profileImg}/>
        <Text style={[styles.textWhite24Bold,{textAlign:"center"}]}>Mayank Chandra Joshi</Text>
        <Text style={[styles.textWhite16Regular,{padding:SPACING.space_10,textAlign:"center",backgroundColor:COLORS.WhiteRGBA15,borderRadius:BORDERRADIUS.radius_20,marginTop:SPACING.space_4}]} numberOfLines={1}>mayankchandrajoshi9871@gmail.com</Text>
      </View>
      <View style={{ paddingVertical:SPACING.space_28,gap:SPACING.space_16 }}>
        <TouchableOpacity activeOpacity={.8} style={styles.btn}>
          <SimpleLineIcons name="settings" size={FONTSIZE.size_24} color={COLORS.OrangeRed} style={styles.btnIcon}/>
          <Text style={styles.textWhite20Bold}>Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.8} onPress={()=>{}} style={styles.btn}>
          <SimpleLineIcons name="info" size={FONTSIZE.size_24} color={COLORS.OrangeRed} style={styles.btnIcon}/>
          <Text style={styles.textWhite20Bold}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.8} onPress={()=>navigation.navigate("Logout")} style={[styles.btn,{backgroundColor:COLORS.OrangeRed90}]}>
          <Ionicons name="enter-outline" size={FONTSIZE.size_24} color={COLORS.OrangeRed90} style={[styles.btnIcon,{backgroundColor:COLORS.Black}]}/>
          <Text style={[styles.textWhite20Bold,{color:COLORS.Black}]}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

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
  textWhite20Bold : {
    fontSize:FONTSIZE.size_20,
    fontFamily:FONTFAMILY.lato_bold,
    color:COLORS.White,
  },
  textWhite16Regular : {
    fontSize:FONTSIZE.size_14,
    fontFamily:FONTFAMILY.lato_regular,
    color:COLORS.WhiteRGBA90,
  },
  editBtn: {
    position:"absolute",
    right:0,
    padding:SPACING.space_6,
    backgroundColor:COLORS.OrangeRed,
    borderRadius:BORDERRADIUS.radius_8,
    elevation : 5
  },
  profileImg : {
    width: width<height?width/4:height/4,
    height :  width<height?width/4:height/4,
    borderRadius :  width<height?width/4:height/4,
  },
  btn : {
    padding:SPACING.space_12,
    elevation:5,
    backgroundColor:COLORS.Black,
    borderRadius:BORDERRADIUS.radius_15,
    flexDirection:"row",
    alignItems:"center",
    gap:SPACING.space_20
  },
  btnIcon : {
    padding:SPACING.space_12,
    backgroundColor:COLORS.OrangeRed30,
    borderRadius:BORDERRADIUS.radius_15
  }
})

export default UserScreen