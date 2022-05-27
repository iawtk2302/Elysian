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

const Payment = ({navigation}) => {
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
      <HeaderPayment navigation={navigation} />
      <AddressPayment />
      <PaymentDetail />
      <TotalPayment />
    </View>
  );
};

export default Payment;
