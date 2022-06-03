import {View, Text, TouchableOpacity} from 'react-native';
import React,{useEffect} from 'react';
import styles from '../styles/View.Payment.container';
import calculatorTotalPrice from '../utils/calculatorTotalPrice';
import FormatNumber from '../utils/FormatNumber';
import NumberFormat from 'react-number-format';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Divider} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
const CalculatePayment = () => {
  return (
    <View style={[styles.aroundContainer]}>
      <Text style={{fontWeight: '700', color: 'black', fontSize: 14}}>
        Tổng cộng
      </Text>
      <Total title="Thành tiền: " content={calculatorTotalPrice()} />
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
  const navigation=useNavigation()
  const voucher=useSelector(state=>state.voucher)
  return (
    <View>
      <TouchableOpacity style={styles.totalItemContainer} onPress={()=>{navigation.navigate('Voucher')}}>
        {
          JSON.stringify(voucher) === '{}'?<Text>Chọn khuyến mãi</Text>:<Text>{voucher.title}</Text>
        }
        <Ionicons name="chevron-forward-outline" size={20} />
      </TouchableOpacity>
      <Divider />
    </View>
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
