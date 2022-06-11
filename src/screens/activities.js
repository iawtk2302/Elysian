import React from 'react';
import TopTabOrder from '../navigators/TopTabOrder';
import {View, Text} from 'react-native';
import styles from '../styles/View.TopTab.Nav';
import ModalOrderDetails from '../components/ModalOrderDetails';
import {useSelector} from 'react-redux';
import {selectWaitingForDelete} from '../redux/orderDetailSlide';
import Loading from '../components/Loading';

const Activities = () => {
  const waitingForDelete = useSelector(selectWaitingForDelete);

  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.tabBar}>
          <Text style={styles.text}>Đơn mua</Text>
          <ModalOrderDetails />
        </View>
        <TopTabOrder />
      </View>
      {waitingForDelete && (
        <Loading uri={require('../assets/lf30_editor_fhzlpncq.json')} />
      )}
    </>
  );
};
export default Activities;
