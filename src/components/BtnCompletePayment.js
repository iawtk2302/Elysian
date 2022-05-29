import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import fireAuth from '@react-native-firebase/auth';
import COLORS from '../common/Color';
import styles from '../styles/View.Payment.container';
import {useSelector} from 'react-redux';
import {selectedAddress} from '../redux/addressSlice';
import calculatorTotalPrice from '../utils/calculatorTotalPrice';

const BtnCompletePayment = ({navigation}) => {
  const arrProduct = useSelector(state => state.orders);
  const total = calculatorTotalPrice();
  let orderID = '';
  let time = null;
  let address = useSelector(selectedAddress);
  const addOrderToFireBase = async () => {
    navigation.goBack();
    await firestore()
      .collection('Orders')
      .add({
        totalCost: total.toString(),
        userID: fireAuth().currentUser.uid,
        orderID: 'temp',
        idAddress: address.idAddress,
        state: 'waiting',
        createdAt: (time = firestore.FieldValue.serverTimestamp()),
      })
      .then(snap => {
        orderID = snap.id;
        updateOrderID();
        addOrderDetailToFirebase();
      });
    await firestore().collection('OrderHistories').add({
      orderID: orderID,
      createTime: time,
      checkedTime: '',
      shippingTime: '',
      cancelledTime: '',
      completeTime: '',
    });
  };
  const updateOrderID = async () => {
    await firestore().collection('Orders').doc(orderID).update({
      orderID: orderID,
    });
  };

  const addOrderDetailToFirebase = () => {
    for (let item of arrProduct) {
      firestore().collection('OrderDetails').add({
        amount: item.count,
        productID: item.product.productID,
        size: item.size.name,
        orderID: orderID,
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
