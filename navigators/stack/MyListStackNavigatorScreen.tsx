import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyListScreen from '../../views/MyListScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MyListStack = createNativeStackNavigator();

const MyListStackNavigatorScreen = () => {
  return (
    <MyListStack.Navigator
      initialRouteName='MyList'
      screenOptions={{
        headerShown: false,
      }}
    >
      <MyListStack.Screen
        name="MyList"
        component={MyListScreen}
        options={{animation: 'slide_from_right'}}
      />
    </MyListStack.Navigator>
  )
}

export default MyListStackNavigatorScreen

const styles = StyleSheet.create({})