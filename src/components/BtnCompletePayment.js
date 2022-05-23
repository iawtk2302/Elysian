import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import fireAuth from '@react-native-firebase/auth';
import COLORS from '../common/Color';
import styles from '../styles/View.Payment.container';

const BtnCompletePayment = ({total, arrProduct}) => {
  let orderIDD = '';
  const addOrderToFireBase = async () => {
    await firestore()
      .collection('Orders')
      .add({
        createTime: Date.now().toLocaleString(),
        status: 1,
        totalCost: total.toString(),
        userID: fireAuth().currentUser.uid,
        OrderID: (orderIDD = Date.now()),
      })
      .then(() => {
        addOrderDetailToFirebase();
      });
  };

  const addOrderDetailToFirebase = () => {
    for (let item of arrProduct) {
      firestore().collection('OrderDetails').add({
        amount: item.amount,
        productID: item.id,
        size: item.size,
        OrderID: orderIDD,
      });
    }
  };
  return (
    <TouchableOpacity onPress={addOrderToFireBase}>
      <View style={styles.btnCompletePayment}>
        <Text style={{color: COLORS.custom}}>Đặt hàng</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BtnCompletePayment;
