import {View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  openOrClose,
  setHistory,
  setOrderID,
  setWaitForLoadDetail,
} from '../redux/orderDetailSlide';
import fireStore from '@react-native-firebase/firestore';
import {setProducts} from '../redux/orderDetailSlide';
import BtnActionOrder from './BtnActionOrder';
import FormatNumber from '../utils/FormatNumber';
import {Divider} from 'react-native-paper';
import convertTimeToFB from '../utils/convertTimeToFB';
import {useTranslation} from 'react-i18next';

export default ItemInOder = ({item}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  let arrDetailOrder = [];
  let his = {};
  const lang = useSelector(state => state.lang);

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

    await fireStore()
      .collection('OrderHistories')
      .where('orderID', '==', item.orderID)
      .get()
      .then(querySnap => {
        querySnap.forEach(docSnap => {
          his = docSnap.data();
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
      const size = {
        name: item.size,
        price: item.size === 'L' ? '8000' : item.size === 'M' ? '16000' : '0',
      };
      item.products = products;
      item.size = size;
    }
    dispatch(setProducts(arrDetailOrder));
    dispatch(setHistory(his));
    arrDetailOrder = [];
  };

  const OpenModal = () => {
    dispatch(setOrderID(item.orderID));
    dispatch(setWaitForLoadDetail());
    loadProducts(item.orderID);
    dispatch(openOrClose());
    dispatch(setWaitForLoadDetail());
  };

  return (
    <View
      style={{
        marginTop: 15,
        marginStart: 15,
        marginEnd: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        borderRadius: 15,
        padding: 15,
      }}>
      <TouchableOpacity onPress={OpenModal}>
        <Text>
          {t('Total')}: <FormatNumber number={item.totalCost} />
        </Text>
        <Text>
          {t('Create Time')}: {convertTimeToFB(item.createdAt, lang)}
        </Text>
      </TouchableOpacity>
      <Divider style={{marginTop: 15}} />
      <BtnActionOrder state={item.state} orderID={item.orderID} />
    </View>
  );
};
