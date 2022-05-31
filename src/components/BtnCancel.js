import {useDispatch} from 'react-redux';
import {deleteWaitingOrder} from '../redux/orderDetailSlide';
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import COLORS from '../common/Color';
import styles from '../styles/View.OrderDetail';
import fireStore from '@react-native-firebase/firestore';

export default BtnCancel = ({orderID}) => {
  const showInfo = async () => {
    await fireStore().collection('Orders').doc(orderID).update({
      state: 'cancelled',
    });
  };
  return (
    <TouchableOpacity
      onPress={showInfo}
      style={{backgroundColor: COLORS.custom, borderRadius: 10}}>
      <Text style={styles.textAction}>Hủy</Text>
    </TouchableOpacity>
  );
};
