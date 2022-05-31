import {Text, View} from 'react-native';
import React from 'react';
import styles from '../styles/View.Payment.container';
import COLORS from '../common/Color';
import BtnCompletePayment from './BtnCompletePayment';
import NumberFormat from 'react-number-format';
import {useSelector} from 'react-redux';
import calculatorTotalPrice from '../utils/calculatorTotalPrice';

const TotalPayment = () => {
  const arrProduct = useSelector(state => state.orders.list);
  const total = calculatorTotalPrice();

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
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View>
            <Text style={{color: 'white'}}>
              Giao hàng 🌟 {countALlProduct()} sản phẩm
            </Text>
            <Text style={{fontWeight: '600', color: 'white'}}>
              <NumberFormat
                value={parseInt(total)}
                displayType="text"
                thousandSeparator
                suffix="đ"
                renderText={value => <Text>{value}</Text>}
              />
            </Text>
          </View>
          <BtnCompletePayment />
        </View>
      </View>
    </View>
  );
};

export default TotalPayment;
