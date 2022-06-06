import {StyleSheet, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import COLORS from '../common/Color';
import Home from '../screens/home';
import Order from '../screens/order';
import Activities from '../screens/activities';
import User from '../screens/user';
const Tab = createMaterialBottomTabNavigator();
const Bottomtab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size}) => {
          let iconName;
          let color1;
          if (route.name === 'Trang chủ') {
            iconName = focused ? 'home' : 'home-outline'
            color1 = focused ? COLORS.custom : COLORS.gray
          }
          else if (route.name === 'Đặt hàng') {
            iconName = focused ? 'fast-food' : 'fast-food-outline'
            color1 = focused ? COLORS.custom : COLORS.gray
          }
          else if (route.name === 'Hoạt động') {
            iconName = focused ? 'reader' : 'reader-outline'
            color1 = focused ? COLORS.custom : COLORS.gray
          }
          else if (route.name === 'Tài khoản') {
            iconName = focused ? 'person' : 'person-outline'
            color1 = focused ? COLORS.custom : COLORS.gray
          }
          return <Icon style={{}} name={iconName} size={24} color={color1} />;
        },
        headerShown: false,
        tabBarStyle: {
          height: 60,
        },
      })} barStyle={{ backgroundColor: 'white' }} activeColor={COLORS.custom}
        inactiveColor={COLORS.gray}>
        <Tab.Screen name="Trang chủ" component={Home} />
        <Tab.Screen name="Đặt hàng" component={Order}/>
        <Tab.Screen name="Hoạt động" component={Activities} />
        <Tab.Screen name="Tài khoản" component={User} />
      </Tab.Navigator>
  )
}

export default Bottomtab;

const styles = StyleSheet.create({});
