import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import styles from '../styles/View.Payment.container';
import calculatorTotalPrice from '../utils/calculatorTotalPrice';
import FormatNumber from '../utils/FormatNumber';
import NumberFormat from 'react-number-format';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {calculatorDiscount, calculatorTotal} from '../utils/solveVoucher';
import COLORS from '../common/Color';
const CalculatePayment = () => {
  const total = calculatorTotal();
  return (
    <View style={[styles.aroundContainer]}>
      <Text style={{fontWeight: '700', color: 'black', fontSize: 14}}>
        Tổng cộng
      </Text>
      <Total title="Thành tiền: " content={total} />
      <Discount />
      <Payment />
    </View>
  );
};

const Total = ({title, content}) => {
  return (
    <View>
      <View style={styles.totalItemContainer}>
        <Text>{title}</Text>
        <FormatNumber number={content} />
      </View>
      <View>
        <Divider />
      </View>
    </View>
  );
};

const Discount = () => {
  const voucher = useSelector(state => state.voucher);
  return (
    <View>
      <DiscountText voucher={voucher} />
      <Divider />
    </View>
  );
};

const DiscountText = ({voucher}) => {
  const navigation = useNavigation();
  const discount = calculatorDiscount();
  if (voucher === '')
    return (
      <TouchableOpacity
        style={styles.totalItemContainer}
        onPress={() => {
          navigation.navigate('Voucher');
        }}>
        {/* {voucher === '' ? (
          <DiscountText content="Chọn Voucher" />
        ) : (
          <DiscountText content={voucher.title} />
        )} */}
        <Text style={{color: COLORS.custom}}>Chọn voucher</Text>
        <Ionicons name="chevron-forward-outline" size={20} />
      </TouchableOpacity>
    );
  else
    return (
      <TouchableOpacity
        style={styles.totalItemContainer}
        onPress={() => {
          navigation.navigate('Voucher');
        }}>
        {/* {voucher === '' ? (
          <DiscountText content="Chọn Voucher" />
        ) : (
          <DiscountText content={voucher.title} />
        )} */}
        <View>
          <Text style={{color: COLORS.custom}}>Chọn voucher</Text>
          <Text>{voucher.title}</Text>
        </View>
        <NumberFormat
          value={discount}
          displayType="text"
          thousandSeparator
          suffix="đ"
          renderText={value => (
            <Text style={{color: 'black', alignSelf: 'center'}}>-{value}</Text>
          )}
        />
      </TouchableOpacity>
    );
};

const Payment = () => {
  return (
    <View style={[styles.totalItemContainer, {marginBottom: 0}]}>
      <Text style={{fontWeight: '600', color: 'black'}}>
        Số tiền thanh toán
      </Text>
      <NumberFormat
        value={parseInt(calculatorTotalPrice())}
        displayType="text"
        thousandSeparator
        suffix="đ"
        renderText={value => (
          <Text style={{color: 'black', fontWeight: '600'}}>{value}</Text>
        )}
      />
    </View>
  );
};
export default CalculatePayment;
