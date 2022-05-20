import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import ProductPayment from './ProductPayment';
import styles from '../styles/View.Payment.container';
import COLORS from '../common/Color';

const PaymentDetail = ({arrProduct}) => {
  console.log(JSON.stringify(arrProduct, null, 4));
  return (
    <View style={[styles.aroundContainer, {flex: 4}]}>
      <View
        style={{
          flexDirection: 'row',
          padding: 20,
          justifyContent: 'space-between',
        }}>
        <Text>Sản phẩm đã chọn</Text>
        <TouchableOpacity>
          <View style={styles.btnContainer}>
            <Text style={{color: COLORS.custom}}>+ Thêm</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {arrProduct.map((item, index) => (
          <ProductPayment key={index} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default PaymentDetail;