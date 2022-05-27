import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import ProductPayment from './ProductPayment';
import styles from '../styles/View.Payment.container';
import COLORS from '../common/Color';
import {useNavigation} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {Divider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

const PaymentDetail = () => {
  const arrProduct = useSelector(state => state.orders);

  return (
    <View style={[styles.aroundContainer, {flex: 4}]}>
      <Header />
      <SwipeListView
        useFlatList={true}
        data={arrProduct}
        renderItem={(rowData, rowMap) => (
          <View style={{margin: 10, marginTop: 5}}>
            <ProductPayment item={rowData.item} />
          </View>
        )}
        renderHiddenItem={(rowData, rowMap) => (
          <View style={styles.hiddenItem}>
            <Options />
          </View>
        )}
        rightOpenValue={-150}
        disableRightSwipe={true}
      />
    </View>
  );
};

const Options = () => {
  return (
    <View style={styles.optionsContainer}>
      <TouchableOpacity
        style={[styles.optionContainer, {backgroundColor: COLORS.custom}]}>
        <View style={{padding: 10}}>
          <Ionicons name="trash" size={20} style={{color: 'white'}} />
          <Text style={styles.optionsText}>Xóa</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.optionContainer, {backgroundColor: 'black'}]}>
        <View style={{padding: 10}}>
          <FontAwesome name="pencil-alt" size={20} style={{color: 'white'}} />
          <Text style={styles.optionsText}>Sửa</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Header = () => {
  const Navigation = useNavigation();

  const navProduct = () => {
    Navigation.push('Order');
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
      }}>
      <Text>Sản phẩm đã chọn</Text>
      <TouchableOpacity onPress={navProduct}>
        <View style={styles.btnContainer}>
          <Text style={{color: COLORS.custom}}>+ Thêm</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentDetail;
