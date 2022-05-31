import React from 'react';
import TopTabOrder from '../navigators/TopTabOrder';
import {View, Text} from 'react-native';
import styles from '../styles/View.TopTab.Nav';
import ModalOrderDetails from '../components/ModalOrderDetails';

const Activities = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.tabBar}>
        <Text style={styles.text}>Đơn mua</Text>
        <ModalOrderDetails />
      </View>
      <TopTabOrder />
    </View>
  );
};
export default Activities;
