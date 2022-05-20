import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import fireAuth from '@react-native-firebase/auth';
import COLORS from '../common/Color';

const BtnCompletePayment = ({total}) => {
  const addOrderToFireBase = () => {
    firestore()
      .collection('Orders')
      .add({
        createTime: Date.now().toLocaleString(),
        status: 1,
        totalCost: total.toString(),
        userID: fireAuth().currentUser.uid,
      })
      .then(() => {
        console.log('User added!');
      });
  };
  return (
    <TouchableOpacity onPress={addOrderToFireBase}>
      <View
        style={{
          width: 100,
          backgroundColor: 'white',
          alignItems: 'center',
          borderRadius: 20,
          height: 40,
          justifyContent: 'center',
        }}>
        <Text style={{color: COLORS.custom}}>Đặt hàng</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BtnCompletePayment;
