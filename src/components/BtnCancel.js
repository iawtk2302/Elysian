import React from 'react';
import {TouchableOpacity, Text, Alert} from 'react-native';
import COLORS from '../common/Color';
import styles from '../styles/View.OrderDetail';
import fireStore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';

export default BtnCancel = ({orderID}) => {
  const createTwoButtonAlert = () =>
    Alert.alert('Hủy đơn', 'Đơn hàng sẽ bị hủy', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => cancelOrder()},
    ]);
  const cancelOrder = async () => {
    await fireStore().collection('Orders').doc(orderID).update({
      state: 'cancelled',
    });
    showMessage({
      message: 'Xóa thành công đơn hàng',
      description: 'Elysian hận hạnh phục vụ bạn',
      type: 'danger',
    });
  };
  return (
    <TouchableOpacity
      onPress={createTwoButtonAlert}
      style={{backgroundColor: COLORS.custom, borderRadius: 10}}>
      <Text style={styles.textAction}>Hủy</Text>
    </TouchableOpacity>
  );
};
