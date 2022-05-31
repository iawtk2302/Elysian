import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../src/styles/View.Payment.container';
import {useDispatch} from 'react-redux';
import {removeAllProduct} from '../redux/orderSlice';
import {useNavigation} from '@react-navigation/native';

export default function HeaderPayment() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const clearOrder = () => {
    dispatch(removeAllProduct());
    navigation.goBack();
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
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
