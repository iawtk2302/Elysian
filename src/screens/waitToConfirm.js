import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OrderDetail from '../components/OrderDetail';

const data = [
  {
    name: 'Back Coffee without sugar',
    amount: '2',
    size: 'L',
    price: '35000',
    image:
      'https://gongcha.com.vn/wp-content/uploads/2018/02/Tr%C3%A0-Xanh-2.png',
    state: 'waiting',
  },
];

const WaiToConFirm = () => {
  return (
    <View>
      {data.map((item, index) => (
        <View key={index}>
          <OrderDetail item={item} />
        </View>
      ))}
    </View>
  );
};

export default WaiToConFirm;
