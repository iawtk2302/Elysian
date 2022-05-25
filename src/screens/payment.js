import {View} from 'react-native';
import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import HeaderPayment from '../components/HeaderPayment';
import AddressPayment from '../components/AddressPayment';
import PaymentDetail from '../components/PaymentDetail';
import TotalPayment from '../components/TotalPayment';
import fireAuth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {setValue, selectedAddress, setSelected} from '../redux/addressSlice';

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
const total = () => {
  let totalPrice = 0;
  for (let item of arrProduct) {
    totalPrice += parseInt(item.amount) * parseInt(item.price);
  }
  return totalPrice;
};

const Payment = () => {
  const dispatch = useDispatch();
  let address = useSelector(selectedAddress);
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
