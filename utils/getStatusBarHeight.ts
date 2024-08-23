import { Dimensions, Platform, StatusBar } from "react-native";

const { height: windowHeight } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('screen');

const statusBarHeight = Platform.OS === 'ios' ? screenHeight - windowHeight : StatusBar.currentHeight 

export default statusBarHeight??0;