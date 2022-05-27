import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../styles/View.Payment.container';
import COLORS from '../common/Color';
import BtnCompletePayment from './BtnCompletePayment';
import NumberFormat from 'react-number-format';
import {useSelector} from 'react-redux';

const TotalPayment = () => {
  const arrProduct = useSelector(state => state.orders);
  const total = () => {
    let totalPrice = 0;
    for (let item of arrProduct) {
      totalPrice += parseInt(item.total);
    }
    return totalPrice;
  };
  const countALlProduct = () => {
    let count = 0;
    for (let product of arrProduct) count += product.count;
    return count;
  };
  return (
    <View style={[styles.aroundContainer, {flex: 2}]}>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginStart: 20,
          }}>
          <Text style={{fontWeight: '600', fontSize: 18, color: 'black'}}>
            Tổng cộng
          </Text>
        </View>
        <View
          style={{
            backgroundColor: COLORS.custom,
            flex: 3,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View>
            <Text style={{color: 'white'}}>
              Giao hàng 🌟 {countALlProduct()} sản phẩm
            </Text>
            <Text style={{fontWeight: '600', color: 'white'}}>
              <NumberFormat
                value={parseInt(total())}
                displayType="text"
                thousandSeparator
                suffix="đ"
                renderText={value => <Text>{value}</Text>}
              />
            </Text>
          </View>
          <BtnCompletePayment total={total} arrProduct={arrProduct} />
        </View>
      </View>
    </View>
  );
};

export default TotalPayment;
