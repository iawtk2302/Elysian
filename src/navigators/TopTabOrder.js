import OnGoing from '../screens/onGoing';
import WaiToConFirm from '../screens/waitToConfirm';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import styles from '../styles/View.TopTab.Nav';
import CancelledOrder from '../screens/cancelledOrder';
import CompletedOder from '../screens/completedOder';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Payment from '../screens/payment';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default TopTabOrder = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator screenOptions={styles.screenOptions}>
        <Tab.Screen name="Chờ xác nhận" component={WaiToConFirm} />
        <Tab.Screen name="Đang giao" component={OnGoing} />
        <Tab.Screen name="Hủy đơn" component={CancelledOrder} />
        <Tab.Screen name="Hoàn thành" component={CompletedOder} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
