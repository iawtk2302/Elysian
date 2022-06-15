import {View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectHistory} from '../redux/orderDetailSlide';
import converTimeToFB from '../utils/convertTimeToFB';

const HistoryOrder = () => {
  const his = useSelector(selectHistory);
  return (
    <View>
      <Text>{converTimeToFB(his.createTime)}</Text>
    </View>
  );
};

export default HistoryOrder;
