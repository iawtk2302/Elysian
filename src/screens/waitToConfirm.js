import {View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import OrderDetail from '../components/OrderDetail';
import fireStore from '@react-native-firebase/firestore';
import fireAuth from '@react-native-firebase/auth';

const data = [
  {
    name: 'Back Coffee without sugar',
    amount: '2',
    size: 'L',
    price: '35000',
    image:
      'https://gongcha.com.vn/wp-content/uploads/2018/02/Tr%C3%A0-Xanh-2.png',
    state: 'waiting',
  },
];
let listOrder = [];

const WaiToConFirm = () => {
  const [listOrderDetail, setListOrderDetail] = useState([]);
  useEffect(() => {
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
        await fireStore()
          .collection('OrderDetails')
          .where('OrderID', '==', item.OrderID)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              setListOrderDetail(prev => [...prev, documentSnapshot.data()]);
              console.log(JSON.stringify(listOrderDetail, null, 2));
            });
          });
      }
    };
    loadListOrder();
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

export default WaiToConFirm;
