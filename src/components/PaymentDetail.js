import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import ProductPayment from './ProductPayment';
import styles from '../styles/View.Payment.container';
import COLORS from '../common/Color';
import {useNavigation} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {removeProduct} from '../redux/orderSlice';

const PaymentDetail = () => {
  const arrProduct = useSelector(state => state.orders.list);
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
            <Options data={rowData} rowMap={rowMap} />
          </View>
        )}
        rightOpenValue={-150}
        disableRightSwipe={true}
      />
    </View>
  );
};

const Options = ({data, rowMap}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const arrProduct = useSelector(state => state.orders.list);
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const deleteItem = (data, rowMap) => {
    closeRow(rowMap, data.item.key);
    dispatch(removeProduct(data.item));

    console.log(arrProduct.length);
    if (arrProduct.length == 1) {
      navigation.goBack();
    }
  };
  return (
    <View style={styles.optionsContainer}>
      <TouchableOpacity
        onPress={() => deleteItem(data, rowMap)}
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
