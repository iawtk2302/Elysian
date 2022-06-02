import {View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {openOrClose, setOrderID} from '../redux/orderDetailSlide';
import fireStore from '@react-native-firebase/firestore';
import {setProducts} from '../redux/orderDetailSlide';
import BtnActionOrder from './BtnActionOrder';
import FormatNumber from '../utils/FormatNumber';
import {Divider} from 'react-native-paper';
import convertTimeToFB from '../utils/convertTimeToFB';

export default ItemInOder = ({item}) => {
  const dispatch = useDispatch();
  let arrDetailOrder = [];

  const loadProducts = async () => {
    await fireStore()
      .collection('OrderDetails')
      .where('orderID', '==', item.orderID)
      .get()
      .then(snap => {
        snap.forEach(docSnap => {
          arrDetailOrder = [...arrDetailOrder, docSnap.data()];
        });
      });

    for (let item of arrDetailOrder) {
      let products = {};
      await fireStore()
        .collection('Products')
        .doc(item.productID)
        .get()
        .then(docSnap => {
          products = docSnap.data();
        });
      item.products = products;
    }
    dispatch(setProducts(arrDetailOrder));
    arrDetailOrder = [];
  };

  const OpenModal = () => {
    dispatch(setOrderID(item.orderID));
    loadProducts();
    dispatch(openOrClose());
  };

  return (
    <View
      style={{
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        borderRadius: 15,
        padding: 15,
      }}>
      <TouchableOpacity onPress={OpenModal}>
        <Text>
          Tổng cộng: <FormatNumber number={item.totalCost} />
        </Text>
        <Text>Ngày tạo: {convertTimeToFB(item.createdAt)}</Text>
      </TouchableOpacity>
      <Divider style={{marginTop: 15}} />
      <BtnActionOrder state={item.state} orderID={item.orderID} />
    </View>
  );
};
