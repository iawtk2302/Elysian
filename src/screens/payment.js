import {View} from 'react-native';
import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import HeaderPayment from '../components/HeaderPayment';
import AddressPayment from '../components/AddressPayment';
import PaymentDetail from '../components/PaymentDetail';
import TotalPayment from '../components/TotalPayment';
import fireAuth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setValue, setSelected} from '../redux/addressSlice';

const arrProduct = [
  {
    id: '0T79W1nrU1chxFeEvozw',
    name: 'Trà Xanh',
    amount: '4',
    size: 'L',
    price: '39000',
  },
  {
    id: '5dWKjhwQOqPL4vqDWnpY',
    name: 'Sữa Tươi Long Nhãn Táo Đỏ',
    amount: '2',
    size: 'S',
    price: '30000',
  },
];
const total = () => {
  let totalPrice = 0;
  for (let item of arrProduct) {
    totalPrice += parseInt(item.amount) * parseInt(item.price);
  }
  return totalPrice;
};

const Payment = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loadAddress = () => {
      firestore()
        .collection('Addresses')
        .where('userID', '==', fireAuth().currentUser.uid)
        .where('selected', '==', true)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            dispatch(setValue(documentSnapshot.data()));
            dispatch(setSelected(documentSnapshot.data().idAddress));
          });
        });
    };
    loadAddress();
  }, []);

  return (
    <View style={{flex: 1}}>
      <HeaderPayment />
      <AddressPayment />
      <PaymentDetail arrProduct={arrProduct} />
      <TotalPayment total={total()} arrProduct={arrProduct} />
    </View>
  );
};

export default Payment;
