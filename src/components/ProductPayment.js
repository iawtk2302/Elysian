import {Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

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
          <Text>
            x{item.amount} {item.name}
          </Text>
          <Text>Kích cỡ: {item.size}</Text>
        </TouchableOpacity>
      </View>
      <Text>{item.price}</Text>
    </View>
  );
};

export default ProductPayment;
