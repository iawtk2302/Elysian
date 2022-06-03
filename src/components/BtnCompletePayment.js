import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import fireAuth from '@react-native-firebase/auth';
import COLORS from '../common/Color';
import styles from '../styles/View.Payment.container';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectChecked,
  selectedAddress,
  openOrCloseModel,
  selectCompleted,
  setCompleted,
} from '../redux/addressSlice';
import calculatorTotalPrice from '../utils/calculatorTotalPrice';
import {removeAllProduct} from '../redux/orderSlice';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';

const BtnCompletePayment = () => {
  const arrProduct = useSelector(state => state.orders.list);
  const checked = useSelector(selectChecked);
  const addressChoose = useSelector(selectedAddress);
  const completed = useSelector(selectCompleted);
  const total = calculatorTotalPrice();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  let orderID = '';
  let time = null;
  let address = useSelector(selectedAddress);

  const addOrderToFireBase = async () => {
    await firestore()
      .collection('Orders')
      .add({
        totalCost: total.toString(),
        userID: fireAuth().currentUser.uid,
        orderID: 'temp',
        idAddress: address.idAddress,
        state: 'waiting',
        createdAt: (time = firestore.Timestamp.now()),
      })
      .then(snap => {
        orderID = snap.id;
        updateOrderID();
        addOrderDetailToFirebase();
      });
    await firestore().collection('OrderHistories').add({
      orderID: orderID,
      createTime: time,
      checkedTime: '',
      shippingTime: '',
      cancelledTime: '',
      completeTime: '',
    });
    if (checked === true) {
      await firestore()
        .collection('Addresses')
        .get()
        .then(snap =>
          snap.forEach(doc => {
            doc.id === addressChoose.idAddress
              ? chooseAddress(doc.id)
              : unChooseAddress(doc.id);
          }),
        );
    }
    dispatch(setCompleted());
    dispatch(removeAllProduct());
    navigation.goBack();
    showMessage({
      message: 'Đặt hàng thành công',
      description: 'Đơn hàng sẽ được giao đến ngay',
      type: 'success',
    });
  };
  const updateOrderID = async () => {
    await firestore().collection('Orders').doc(orderID).update({
      orderID: orderID,
    });
  };

  const unChooseAddress = AddressID => {
    firestore().collection('Addresses').doc(AddressID).update({
      selected: false,
    });
  };

  const chooseAddress = AddressID => {
    firestore().collection('Addresses').doc(AddressID).update({
      selected: true,
    });
  };

  const addOrderDetailToFirebase = () => {
    for (let item of arrProduct) {
      firestore().collection('OrderDetails').add({
        amount: item.count,
        productID: item.product.productID,
        size: item.size.name,
        orderID: orderID,
        state: 'waiting',
      });
    }
  };

  if (completed == true) {
    addOrderToFireBase();
  }

  const openModal = () => {
    dispatch(openOrCloseModel());
  };
  return (
    <View>
      <TouchableOpacity onPress={openModal}>
        <View style={styles.btnCompletePayment}>
          <Text style={{color: COLORS.custom}}>Đặt hàng</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BtnCompletePayment;
