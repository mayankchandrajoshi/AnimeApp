import { StyleSheet } from 'react-native'
import React from 'react'
import AccountSettingScreen from '../../views/AccountSettingScreen';
import EditProfileScreen from '../../views/EditProfileScreen';
import HelpSettingsScreen from '../../views/HelpSettingsScreen';
import HelpSupportScreen from '../../views/HelpSupportScreen';
import UserScreen from '../../views/UserScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const UserStack = createNativeStackNavigator();

const UserStackNavigatorScreen = () => {
  return (
    <UserStack.Navigator
      initialRouteName='User'
      screenOptions={{
        headerShown: false,
      }}
    >
      <UserStack.Screen
        name="User"
        component={UserScreen}
        options={{animation: 'slide_from_right'}} 
      />
      <UserStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{animation: 'slide_from_right'}} 
      />
      <UserStack.Screen
        name="HelpSetting"
        component={HelpSettingsScreen}
        options={{animation: 'slide_from_right'}} 
      />
      <UserStack.Screen
        name="HelpSupport"
        component={HelpSupportScreen}
        options={{animation: 'slide_from_right'}} 
      />
      <UserStack.Screen
        name="AccountSetting"
        component={AccountSettingScreen}
        options={{animation: 'slide_from_right'}} 
      />
    </UserStack.Navigator>
  )
}

export default UserStackNavigatorScreen

const styles = StyleSheet.create({})