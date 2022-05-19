import { StyleSheet, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import COLORS from '../common/Color';
import Home from '../screens/home';
import Order from '../screens/order';
import Activities from '../screens/activities';
import User from '../screens/user';
const Tab = createMaterialBottomTabNavigator();
const Bottomtab = () => {
  return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let color1;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'
            color1 = focused ? COLORS.custom : COLORS.gray
          }
          else if (route.name === 'Order') {
            iconName = focused ? 'fast-food' : 'fast-food-outline'
            color1 = focused ? COLORS.custom : COLORS.gray
          }
          else if (route.name === 'Activities') {
            iconName = focused ? 'reader' : 'reader-outline'
            color1 = focused ? COLORS.custom : COLORS.gray
          }
          else if (route.name === 'User') {
            iconName = focused ? 'person' : 'person-outline'
            color1 = focused ? COLORS.custom : COLORS.gray
          }
          return <Icon style={{}} name={iconName} size={24} color={color1} />;
        },
        headerShown: false,
        tabBarStyle: {
          height: 60
        },
        // tabBarLabel:({focused})=>{
        //   let color1;
        //   if (route.name === 'Home') {
        //     color1=focused?COLORS.custom:COLORS.gray
        //   } 
        //   else if (route.name === 'Order') {
        //     color1=focused?COLORS.custom:COLORS.gray
        //   }
        //   else if (route.name === 'Activities') {
        //     color1=focused?COLORS.custom:COLORS.gray
        //   }
        //   else if (route.name === 'User') {
        //     color1=focused?COLORS.custom:COLORS.gray
        //   }
        //   return <Text style={{color:color1,marginTop:-10,marginBottom:5}}>{route.name}</Text>;
        // }
      })} barStyle={{ backgroundColor: 'white' }} activeColor={COLORS.custom}
        inactiveColor={COLORS.gray}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Order" component={Order}/>
        <Tab.Screen name="Activities" component={Activities} />
        <Tab.Screen name="User" component={User} />
      </Tab.Navigator>
  )
}

export default Bottomtab

const styles = StyleSheet.create({})