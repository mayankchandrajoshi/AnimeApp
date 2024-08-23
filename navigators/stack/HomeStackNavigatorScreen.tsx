import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../views/HomeScreen';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigatorScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Group>
        <HomeStack.Screen name="Home"  component={HomeScreen}
          options={{animation: 'slide_from_right'}}
        />
      </HomeStack.Group>
    </HomeStack.Navigator>
  )
}

export default HomeStackNavigatorScreen

const styles = StyleSheet.create({})