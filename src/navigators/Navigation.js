import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import { NavigationContainer } from '@react-navigation/native';
import Bottomtab from './BottomTab';
import DetailProduct from '../screens/detailProduct';
import Banner from '../screens/Banner';
const Stack = createSharedElementStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Main' component={Bottomtab}/>
        <Stack.Screen name='Detail' component={DetailProduct}/>
        <Stack.Screen name="Banner" component={Banner} 
        options={{
          gestureEnabled: true,
          transitionSpec: {
            open: {animation: 'timing', config: {duration: 300}},
            close: {animation: 'timing', config: {duration: 300}},
          }
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})