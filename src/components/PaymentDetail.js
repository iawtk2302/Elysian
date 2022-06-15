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
import {showMessage} from 'react-native-flash-message';
import {removeVoucher} from '../redux/voucherSlice';
import Note from './Note';

const PaymentDetail = () => {
  const arrProduct = useSelector(state => state.orders.list);
  return (
    <View style={[styles.aroundContainer]}>
      <Header />
      <SwipeListView
        data={arrProduct}
        renderItem={(rowData, rowMap) => (
          <View style={{marginTop: 5}}>
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
      <Note />
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

    if (arrProduct.length == 1) {
      dispatch(removeVoucher());
      navigation.goBack();
    }
    showMessage({
      message: `Đã xóa ${data.item.count} ${data.item.product.name}`,
      type: 'warning',
    });
  };
  return (
    <View style={styles.optionsContainer}>
      <TouchableOpacity
        onPress={() => deleteItem(data, rowMap)}
        style={[styles.optionContainer, {backgroundColor: COLORS.custom}]}>
        <View>
          <Ionicons name="trash" size={20} style={{color: 'white'}} />
          <Text style={styles.optionsText}>Xóa</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.optionContainer, {backgroundColor: 'black'}]}>
        <View>
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
    Navigation.goBack();
  };
  return (
    <View style={styles.container}>
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
