import {Text, View} from 'react-native';
import React from 'react';
import styles from '../styles/View.Payment.container';
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
    <View style={[styles.bottomPayment, {flex: 1}]}>
      <TotalPrice total={total} amount={countALlProduct()} />
      <BtnCompletePayment />
    </View>
  );
};

const TotalPrice = ({total, amount}) => {
  return (
    <View>
      <Text style={{color: 'white'}}>Giao hàng 🌟 {amount} sản phẩm</Text>
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
  );
};

export default TotalPayment;
