import {ScrollView, RefreshControl, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ItemInOder from '../components/ItemInOder';
import fireStore from '@react-native-firebase/firestore';
import COLORS from '../common/Color';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectCancelledOrders,
  addCancelledOrder,
  resetCancelledOrder,
} from '../redux/orderDetailSlide';

const CancelledOrder = () => {
  const dispatch = useDispatch();
  const Orders = useSelector(selectCancelledOrders);
  const loadOrder = async () => {
    await fireStore()
      .collection('Orders')
      .where('state', '==', 'cancelled')
      .onSnapshot(snap => {
        dispatch(resetCancelledOrder());
        snap.forEach(documentSnapshot => {
          dispatch(addCancelledOrder(documentSnapshot.data()));
        });
      });
  };

  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    loadOrder();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(resetCancelledOrder());
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

export default CancelledOrder;
