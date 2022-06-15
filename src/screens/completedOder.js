import {ScrollView, RefreshControl, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ItemInOder from '../components/ItemInOder';
import fireStore from '@react-native-firebase/firestore';
import COLORS from '../common/Color';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectCompletedOrders,
  addCompletedOrder,
  resetCompletedOrder,
} from '../redux/orderDetailSlide';
import fireauth from '@react-native-firebase/auth';
const OnGoing = () => {
  const dispatch = useDispatch();
  const Orders = useSelector(selectCompletedOrders);
  const loadOrder = async () => {
    let arrHis = [];
    await fireStore()
      .collection('Orders')
      .where('state', '==', 'completed')
      .where('userID', '==', fireauth().currentUser.uid)
      .onSnapshot(snap => {
        dispatch(resetCompletedOrder());
        snap.forEach(documentSnapshot => {
          dispatch(addCompletedOrder(documentSnapshot.data()));
        });
      });
  };

  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    loadOrder();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(resetCompletedOrder());
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

export default OnGoing;
