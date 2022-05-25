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
import WaiToConFirm from '../screens/waitToConfirm';
import COLORS from '../common/Color';
import styles from '../styles/View.TopTab.Nav';
import CancelledOrder from '../screens/cancelledOrder';
import CompletedOder from '../screens/completedOder';

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
      <View style={styles.tabBar}>
        <Text style={styles.text}>Đơn mua</Text>
      </View>
      <Tab.Navigator screenOptions={styles.screenOptions}>
        <Tab.Screen name="Chờ xác nhận" component={WaiToConFirm} />
        <Tab.Screen name="Đang giao" component={OnGoing} />
        <Tab.Screen name="Hủy đơn" component={CancelledOrder} />
        <Tab.Screen name="Hoàn thành" component={CompletedOder} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
