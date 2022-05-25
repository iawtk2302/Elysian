import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import fireAuth from '@react-native-firebase/auth';
import COLORS from '../common/Color';
import styles from '../styles/View.Payment.container';
import {useSelector} from 'react-redux';
import {selectedAddress} from '../redux/addressSlice';

const BtnCompletePayment = ({total, arrProduct}) => {
  let orderID = '';
  let address = useSelector(selectedAddress);
  const addOrderToFireBase = async () => {
    await firestore()
      .collection('Orders')
      .add({
        createTime: Date.now().toLocaleString(),
        totalCost: total.toString(),
        userID: fireAuth().currentUser.uid,
        OrderID: (orderID = Date.now()),
        idAddress: address.idAddress,
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
        OrderID: orderID,
        state: 'waiting',
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
