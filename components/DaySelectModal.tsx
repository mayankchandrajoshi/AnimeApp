import { Days } from "../enums/enums";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../themes/themes";
import useAnimatedPress from "../utils/animatedPress";
import { Animated, FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const DaySelectComponent = ({ day,selectedDay,setSelectedDay,setShowModal } : { day:Days, selectedDay:Days,setSelectedDay: React.Dispatch<React.SetStateAction<Days>>,setShowModal: React.Dispatch<React.SetStateAction<boolean>>} ) =>{

  const { backgroundColor,animateColorPressIn,animateColorPressOut} = useAnimatedPress("transparent", COLORS.WhiteRGBA15,200,400);

  const closeModal = () =>{
    setTimeout(()=>{setShowModal(false)},100);
  }
  
  return (
    <Animated.View style={[{backgroundColor,borderRadius : BORDERRADIUS.radius_10}]}>
      <Pressable onPress={()=>{setSelectedDay(day),closeModal()}} 
      onPressIn={animateColorPressIn} onPressOut={animateColorPressOut} 
      style={[styles.dayTextContainer,selectedDay===day?{backgroundColor:COLORS.WhiteRGBA30,borderRadius : BORDERRADIUS.radius_10}:{}]}
      >
        <View>
          <Text style={styles.dayOptionText}>{day}</Text>
        </View>
      </Pressable>
    </Animated.View>
    )
  }
  
  
const DaySelectModal = ({ showModal,setShowModal,selectedDay,setSelectedDay }:{showModal:boolean,setShowModal : React.Dispatch<React.SetStateAction<boolean>> ,selectedDay:Days,setSelectedDay: React.Dispatch<React.SetStateAction<Days>>}) =>{

  const closeModal = () =>{
    setTimeout(()=>{setShowModal(false)},100);
  }

  return (
    <Modal 
    animationType="fade"
    transparent={true}
    visible={showModal}
      onRequestClose={() => closeModal()}
    >
      <Pressable onPress={()=>closeModal()} style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <MaterialIcons name="arrow-back" size={FONTSIZE.size_24} color={COLORS.WhiteRGBA75} />
            <Text style={styles.modalTitle}>Select Day</Text>
          </View>
          <FlatList data={Object.values(Days)}
            keyExtractor={(item,index)=>String(index)}
            style = {{paddingHorizontal : SPACING.space_10,paddingVertical:SPACING.space_10}}
            contentContainerStyle = {{gap:SPACING.space_4}} 
            renderItem={({item,index})=>{
              return (
                <DaySelectComponent day={item} selectedDay={selectedDay} setSelectedDay={setSelectedDay} setShowModal={setShowModal}/>
              )
            }
          }/>
        </View>
      </Pressable>
    </Modal>
  )
}


const styles = StyleSheet.create({
  modalOverlay : {
    flex:1,
    justifyContent : "center",
    alignItems : "center",
    backgroundColor : COLORS.BlackRGB60
  },
  modalContent : {
    borderRadius : BORDERRADIUS.radius_15,
    width : "80%",
    backgroundColor : COLORS.DullBlack
  },
  modalHeader : {
    flexDirection : "row",
    alignItems : "center",
    gap : SPACING.space_15,
    borderBottomWidth : 1,
    borderBottomColor : COLORS.WhiteRGBA30,
    paddingHorizontal : SPACING.space_15,
    paddingVertical : SPACING.space_15,
  },
  modalTitle : {
    color : COLORS.WhiteRGBA75,
    fontFamily : FONTFAMILY.lato_regular,
    fontSize : FONTSIZE.size_16,
    textTransform : "capitalize",
  },
  dayTextContainer : {
    padding : SPACING.space_15,
  },
  dayOptionText : {
    color : COLORS.White,
    fontFamily : FONTFAMILY.lato_regular,
    fontSize : FONTSIZE.size_16,
    textTransform : "capitalize"
  }
})

export default DaySelectModal;