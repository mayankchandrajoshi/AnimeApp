import React from 'react';
import { AntDesign,Octicons,MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import {StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {BottomTabBarButtonProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { COLORS, FONTSIZE, SPACING } from '../themes/themes';
import HomeStackNavigatorScreen from './stack/HomeStackNavigatorScreen';
import MyListStackNavigatorScreen from './stack/MyListStackNavigatorScreen';
import BrowseStackNavigatorScreen from './stack/BrowseStackNavigatorScreen';
import ScheduleStackNavigatorScreen from './stack/ScheduleStackNavigatorScreen';
import UserStackNavigatorScreen from './stack/UserStackNavigatorScreen';
const Tab = createBottomTabNavigator();

interface CustomTabButtonProps extends BottomTabBarButtonProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const CustomTabButton: React.FC<CustomTabButtonProps> = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {children}
    </TouchableOpacity>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="UserStack"
      backBehavior="history"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.BlackRGB60,
          height: SPACING.space_6 * 10,
          borderTopWidth: 0,
          elevation:0,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="HomeStack" component={HomeStackNavigatorScreen} options={{
        tabBarIcon: ({focused}) => {
          return (
            <View
              style={[
                styles.tabBar,
            ]}>
              <AntDesign name="home" size={FONTSIZE.size_24} color={focused?COLORS.OrangeRed:COLORS.White} />
              <Text style = {[
                styles.tabBarLabel,
                focused? {color:COLORS.OrangeRed}: {color:COLORS.White}
              ]}>Home</Text>
            </View>
          );
        },
        tabBarButton: (props) => <CustomTabButton {...props} />
      }}/>
      <Tab.Screen name="MyListStack" component={MyListStackNavigatorScreen}  options={{
        tabBarIcon: ({focused}) => {
          return (
            <View
              style={[
                styles.tabBar,
            ]}>
              <Octicons name="bookmark" size={FONTSIZE.size_24} color={focused?COLORS.OrangeRed:COLORS.White} />
              <Text style = {[
                styles.tabBarLabel,
                focused? {color:COLORS.OrangeRed}: {color:COLORS.White}
              ]}>My Lists</Text>
            </View>
          );
        },
        tabBarButton: (props) => <CustomTabButton {...props} />
      }}/>
      <Tab.Screen name="BrowseStack" component={BrowseStackNavigatorScreen}  options={{
        tabBarIcon: ({focused}) => {
          return (
            <View
              style={[
                styles.tabBar,
            ]}>
              <AntDesign name="appstore-o" size={FONTSIZE.size_24} color={focused?COLORS.OrangeRed:COLORS.White} />
              <Text style = {[
                styles.tabBarLabel,
                focused? {color:COLORS.OrangeRed}: {color:COLORS.White}
              ]}>Browse</Text>
            </View>
          );
        },
        tabBarButton: (props) => <CustomTabButton {...props} />
      }}/>
      <Tab.Screen name="ScheduleStack" component={ScheduleStackNavigatorScreen}  options={{
        tabBarIcon: ({focused}) => {
          return (
            <View
              style={[
                styles.tabBar,
            ]}>
                <MaterialIcons name="schedule" size={FONTSIZE.size_24} color={focused?COLORS.OrangeRed:COLORS.White} />
                <Text style = {[
                  styles.tabBarLabel,
                  focused? {color:COLORS.OrangeRed}: {color:COLORS.White}
                ]}>Schedule</Text>
            </View>
          );
        },
        tabBarButton: (props) => <CustomTabButton {...props} />
      }}/>
      <Tab.Screen name="UserStack" component={UserStackNavigatorScreen}  options={{
        tabBarIcon: ({focused}) => {
          return (
            <View
              style={[
                styles.tabBar,
              ]}
            >
              <MaterialCommunityIcons name="account-circle-outline" size={FONTSIZE.size_24} color={focused?COLORS.OrangeRed:COLORS.White} />
              <Text style = {[
                styles.tabBarLabel,
                focused? {color:COLORS.OrangeRed}: {color:COLORS.White}
              ]}>Account</Text>
            </View>
          );
        },
        tabBarButton: (props) => <CustomTabButton {...props} />
      }}/>
    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize:FONTSIZE.size_10
  },
  tabBar: {
    flex:1,
    justifyContent:'center',
    alignItems:"center",
    alignSelf:"stretch",
    padding: SPACING.space_10,
    backgroundColor:COLORS.BlackRGB60
  }
});


export default TabNavigator;