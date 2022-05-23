import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Bottomtab from './BottomTab';
import DetailProduct from '../screens/detailProduct';
import Payment from '../screens/payment';
import Order from '../screens/order';
import MoreAddresses from '../screens/moreAddresses';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OnGoing from '../screens/onGoing';
import OrderHistory from '../screens/orderHistory';
import COLORS from '../common/Color';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={Bottomtab} />
        <Stack.Screen name="Detail" component={DetailProduct} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="MoreAddresses" component={MoreAddresses} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export const TopTabs = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fonSize: 12},
          tabBarStyle: {backgroundColor: COLORS.backgroundWeak},
          tabBarActiveTintColor: COLORS.custom,
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.custom,
          },
          tabBarLabelStyle: {
            fontSize: 13,
          },
        }}>
        <Tab.Screen name="Đang giao" component={OnGoing} />
        <Tab.Screen name="Lịch sử đặt hàng" component={OrderHistory} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
