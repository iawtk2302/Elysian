import {Text, View, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../src/styles/View.Payment.container';
import {useDispatch} from 'react-redux';
import {removeAllProduct} from '../redux/orderSlice';
import {useNavigation} from '@react-navigation/native';
import {removeVoucher} from '../redux/voucherSlice';
import {showMessage} from 'react-native-flash-message';

export default function HeaderPayment() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const clearOrder = () => {
    Alert.alert('Xóa giỏ hàng', 'Giỏ hàng sẽ bị xóa', [
      {
        text: 'Hủy',
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        onPress: () => {
          dispatch(removeAllProduct());
          dispatch(removeVoucher());
          navigation.goBack();
          showMessage({
            message: 'Giỏ hàng đã bị xóa',
            description: 'Chọn món hàng để thêm vào giỏ',
            type: 'warning',
          });
        },
      },
    ]);
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={[styles.container, {padding: 15}]}>
        <TouchableOpacity onPress={clearOrder}>
          <Text>Xóa</Text>
        </TouchableOpacity>
        <Text style={styles.bold}>Xác nhận đơn hàng</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" style={styles.iconSize} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
