import {View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectHistory} from '../redux/orderDetailSlide';
import converTimeToFB from '../utils/convertTimeToFB';

const HistoryOrder = () => {
  const his = useSelector(selectHistory);
  return (
    <View style={{marginTop: 15, backgroundColor: 'white', padding: 10}}>
      <Text style={{alignSelf: 'center'}}>Lịch sử đơn hàng</Text>
      <View>
        <Text>{converTimeToFB(his.createTime)}</Text>
      </View>
    </View>
  );
};

export default HistoryOrder;
