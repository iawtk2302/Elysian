import OnGoing from '../screens/onGoing';
import WaiToConFirm from '../screens/waitToConfirm';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import styles from '../styles/View.TopTab.Nav';
import CancelledOrder from '../screens/cancelledOrder';
import CompletedOder from '../screens/completedOder';
import React from 'react';

const Tab = createMaterialTopTabNavigator();

export default TopTabOrder = () => {
  return (
    <Tab.Navigator screenOptions={styles.screenOptions}>
      <Tab.Screen name="Chờ xác nhận" component={WaiToConFirm} />
      <Tab.Screen name="Đang giao" component={OnGoing} />
      <Tab.Screen name="Hủy đơn" component={CancelledOrder} />
      <Tab.Screen name="Hoàn thành" component={CompletedOder} />
    </Tab.Navigator>
  );
};