import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import COLORS from '../common/Color';
import styles from '../styles/View.OrderDetail';
import BtnCancel from './BtnCancel';

const BtnActionOrder = ({state, orderID}) => {
  return (
    <View style={[styles.layout, {marginTop: 10}]}>
      <Text
        style={{
          alignSelf: 'center',
          color: changeColor({state}),
          fontWeight: 'bold',
        }}>
        {changeState({state})}
      </Text>
      {state === 'waiting' ? (
        <BtnCancel orderID={orderID} />
      ) : state === 'shipping' ? (
        <BtnContact />
      ) : (
        <BtnReOrder />
      )}
    </View>
  );
};

const BtnReOrder = () => {
  return (
    <TouchableOpacity
      style={{backgroundColor: COLORS.custom, borderRadius: 10}}>
      <Text style={styles.textAction}>Đặt hàng</Text>
    </TouchableOpacity>
  );
};
const BtnContact = () => {
  return (
    <TouchableOpacity
      style={{backgroundColor: COLORS.custom, borderRadius: 10}}>
      <Text style={styles.textAction}>Liên hệ</Text>
    </TouchableOpacity>
  );
};

const changeColor = ({state}) => {
  return state === 'waiting'
    ? COLORS.waiting
    : state === 'shipping'
    ? COLORS.shipping
    : state === 'cancelled'
    ? COLORS.cancelled
    : COLORS.completed;
};

const changeState = ({state}) => {
  return state === 'waiting'
    ? 'Chờ xử lý'
    : state === 'shipping'
    ? 'Đang giao'
    : state === 'cancelled'
    ? 'Đã hủy'
    : 'Hoàn thành';
};

export default BtnActionOrder;
