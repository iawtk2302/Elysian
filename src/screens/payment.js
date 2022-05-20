import {View} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import HeaderPayment from '../components/HeaderPayment';
import AddressPayment from '../components/AddressPayment';
import PaymentDetail from '../components/PaymentDetail';
import TotalPayment from '../components/TotalPayment';
import fireAuth from '@react-native-firebase/auth';

let user = '';

firestore()
  .collection('Users')
  .doc(fireAuth().currentUser.uid)
  .onSnapshot(documentSnapshot => {
    user = documentSnapshot.data();
    user.id = documentSnapshot.id;
  });

let address = '';
firestore()
  .collection('Addresses')
  .where('userID', '==', fireAuth().currentUser.uid)
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
      address = documentSnapshot.data();
    });
  });

console.log(fireAuth().currentUser.uid);

const arrProduct = [
  {
    id: 1234,
    name: 'tà tửa',
    amount: '10',
    size: 'L',
    price: '10000',
  },
  {
    id: 1235,
    name: 'caffe',
    amount: '2',
    size: 'S',
    price: '20000',
  },
];

const Payment = () => {
  const total = () => {
    let totalPrice = 0;
    for (let item of arrProduct) {
      totalPrice += parseInt(item.amount) * parseInt(item.price);
    }
    //console.log(totalPrice);
    return totalPrice;
  };

  console.log(total());
  return (
    //Payment
    <View style={{flex: 1}}>
      <HeaderPayment />
      <AddressPayment user={user} address={address} />
      <PaymentDetail arrProduct={arrProduct} />
      <TotalPayment total={total()} />
    </View>
  );
};
export default Payment;
