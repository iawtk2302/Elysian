import React from 'react';
import {TouchableOpacity, Text, Alert} from 'react-native';
import COLORS from '../common/Color';
import styles from '../styles/View.OrderDetail';
import fireStore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import {
  setTrueWaitForDelete,
  setFalseWaitForDelete,
} from '../redux/orderDetailSlide';

export default BtnCancel = ({orderID}) => {
  const dispatch = useDispatch();

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
    let historyID = '';
    dispatch(setTrueWaitForDelete());
    await fireStore()
      .collection('OrderHistories')
      .where('orderID', '==', orderID)
      .get()
      .then(query => {
        query.forEach(doc => {
          historyID = doc.id;
        });
      });

    await fireStore().collection('OrderHistories').doc(historyID).update({
      cancelledTime: fireStore.Timestamp.now(),
    });
    await fireStore().collection('Orders').doc(orderID).update({
      state: 'cancelled',
    });
    dispatch(setFalseWaitForDelete());
    showMessage({
      message: 'Xóa thành công đơn hàng',
      description: 'Elysian hân hạnh phục vụ bạn',
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
