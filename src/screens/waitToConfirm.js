import {ScrollView, RefreshControl, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ItemInOder from '../components/ItemInOder';
import fireStore from '@react-native-firebase/firestore';
import COLORS from '../common/Color';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectWaitingOrders,
  addWaitingOrder,
  resetWaitingOrder,
} from '../redux/orderDetailSlide';

const WaitToConfirm = () => {
  const dispatch = useDispatch();
  const Orders = useSelector(selectWaitingOrders);
  const loadOrder = async () => {
    await fireStore()
      .collection('Orders')
      .where('state', '==', 'waiting')
      .onSnapshot(
        snap => {
          dispatch(resetWaitingOrder());
          snap.forEach(documentSnapshot => {
            dispatch(addWaitingOrder(documentSnapshot.data()));
          });
        },
        er => {
          console.log(er);
        },
      );
  };

  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    loadOrder();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(resetWaitingOrder());
    loadOrder();
    setRefreshing(false);
  };
  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={COLORS.custom}
          />
        }>
        {Orders.map((item, index) => (
          <View key={index}>
            <ItemInOder item={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default WaitToConfirm;
