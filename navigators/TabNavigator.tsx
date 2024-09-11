import React, { useEffect } from 'react';
import { AntDesign,Octicons,MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import {StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {BottomTabBarButtonProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { COLORS, FONTSIZE, SPACING } from '../themes/themes';
import HomeScreen from '../views/HomeScreen';
import MyListScreen from '../views/MyListScreen';
import BrowseScreen from '../views/BrowseScreen';
import SchedulesScreen from '../views/SchedulesScreen';
import { useIsFocused } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import UserScreen from '../views/UserScreen';

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
  
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      NavigationBar.setBackgroundColorAsync(COLORS.BlackRGB90);
    }
  }, [isFocused]);
  

  return (
    <Tab.Navigator
      initialRouteName="Home"
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
      <Tab.Screen name="Home" component={HomeScreen} options={{
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
      <Tab.Screen name="MyList" component={MyListScreen}  options={{
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
      <Tab.Screen name="Browse" component={BrowseScreen}  options={{
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
      <Tab.Screen name="Schedule" component={SchedulesScreen}  options={{
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
      <Tab.Screen name="User" component={UserScreen}  options={{
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