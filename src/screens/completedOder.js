import {View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import OrderDetail from '../components/OrderDetail';
import fireStore from '@react-native-firebase/firestore';
import fireAuth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import {selectAllOrder} from '../redux/orderDetailSlide';

let listOrder = [];

const CompletedOder = () => {
  const [listOrderDetail, setListOrderDetail] = useState([]);

  // let allOrder = useSelector(selectAllOrder);
  useEffect(() => {
    const controller = new AbortController();
    const loadListOrder = async () => {
      await fireStore()
        .collection('Orders')
        .where('userID', '==', fireAuth().currentUser.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            listOrder = [...listOrder, documentSnapshot.data()];
          });
        });
      for (let item of listOrder) {
        fireStore()
          .collection('OrderDetails')
          .where('OrderID', '==', item.OrderID)
          .where('state', '==', 'completed')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              setListOrderDetail(prev => [...prev, documentSnapshot.data()]);
            });
          });
      }
    };
    loadListOrder();
    return () => {
      controller.abort();
      setListOrderDetail(null);
    };
  }, []);

  return (
    <ScrollView>
      {listOrderDetail.map((item, index) => (
        <View key={index}>
          <OrderDetail item={item} />
        </View>
      ))}
    </ScrollView>
  );
};

export default CompletedOder;
