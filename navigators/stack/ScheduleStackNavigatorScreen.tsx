import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SchedulesScreen from '../../views/SchedulesScreen';

const ScheduleStack = createNativeStackNavigator();

const ScheduleStackNavigatorScreen = () => {
  return (
    <ScheduleStack.Navigator
      initialRouteName='Schedule'
      screenOptions={{
        headerShown: false,
    }}>
      <ScheduleStack.Screen
        name="Schedule"
        component={SchedulesScreen}
        options={{animation: 'slide_from_right'}} 
      />
    </ScheduleStack.Navigator>
  )
}

export default ScheduleStackNavigatorScreen

const styles = StyleSheet.create({})