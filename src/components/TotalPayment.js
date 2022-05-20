import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../styles/View.Payment.container';
import COLORS from '../common/Color';

const TotalPayment = ({total}) => {
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
            <Text style={{color: 'white'}}>Giao hàng - 2 sản phẩm</Text>
            <Text style={{fontWeight: '600', color: 'white'}}>{total}</Text>
          </View>
          <TouchableOpacity>
            <View
              style={{
                width: 100,
                backgroundColor: 'white',
                alignItems: 'center',
                borderRadius: 20,
                height: 40,
                justifyContent: 'center',
              }}>
              <Text style={{color: COLORS.custom}}>Đặt hàng</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default TotalPayment;