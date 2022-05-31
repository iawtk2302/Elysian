import {Text, View, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import styles from '../styles/View.Payment.container';
import NumberFormat from 'react-number-format';
import {Divider} from 'react-native-paper';
import COLORS from '../common/Color';

const ProductPayment = ({item}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 15,
        borderWidth: 0.7,
        borderRadius: 10,
        borderColor: COLORS.custom,
      }}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
          <Image
            source={{uri: item.product.linkImage}}
            style={{height: 35, width: 35}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingStart: 20}}>
          <Text style={styles.textColor}>
            x{item.count} {item.product.name}
          </Text>
          <Text>
            Kích cỡ: <Text style={styles.textColor}> {item.size.name}</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.textColor, {fontWeight: '500'}]}>
        <NumberFormat
          value={parseInt(item.total)}
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
