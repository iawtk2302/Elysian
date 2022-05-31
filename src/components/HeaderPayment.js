import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../src/styles/View.Payment.container';

export default function HeaderPayment({navigation}) {
  const clearOrder = () => {
    navigation.goBack();
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={clearOrder}>
          <Text>Xóa</Text>
        </TouchableOpacity>
        <Text style={styles.bold}>Xác nhận đơn hàng</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" style={styles.iconSize} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
