import {Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import styles from '../styles/View.Payment.container';
import NumberFormat from 'react-number-format';

const ProductPayment = ({item}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
      }}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
          <Ionicons name="pencil-outline" style={{fontSize: 20}} />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingStart: 20}}>
          <Text style={styles.textColor}>
            x{item.amount} {item.name}
          </Text>
          <Text>
            Kích cỡ: <Text style={styles.textColor}> {item.size}</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.textColor}>
        <NumberFormat
          value={parseInt(item.price)}
          displayType="text"
          thousandSeparator
          suffix="đ"
          renderText={value => <Text>{value}</Text>}
        />
      </Text>
    </View>
  );
};

export default ProductPayment;
