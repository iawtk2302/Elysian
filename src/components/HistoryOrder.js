import {View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectHistory} from '../redux/orderDetailSlide';
import converTimeToFB from '../utils/convertTimeToFB';
import COLORS from '../common/Color';

const HistoryOrder = () => {
  const his = useSelector(selectHistory);
  console.log(JSON.stringify(his, null, 2));

  return (
    <View style={{marginTop: 15, backgroundColor: 'white', padding: 10}}>
      <Text style={{alignSelf: 'center', color: 'black', fontSize: 15}}>
        Lịch sử đơn hàng
      </Text>
      <View>
        <ConfirmTime time={his.createTime} title="Đã đặt hàng:" color="black" />
        {his.checkedTime !== '' ? (
          <ConfirmTime
            time={his.checkedTime}
            title="Đã xác nhận:"
            color={COLORS.waiting}
          />
        ) : null}
        {his.shippingTime !== '' ? (
          <ConfirmTime
            time={his.shippingTime}
            title="Bắt đầu vận chuyển:"
            color={COLORS.shipping}
          />
        ) : null}
        {his.cancelledTime !== '' ? (
          <ConfirmTime
            time={his.cancelledTime}
            title="Đã hủy hàng:"
            color={COLORS.cancelled}
          />
        ) : null}
        {his.completeTime !== '' ? (
          <ConfirmTime
            time={his.completeTime}
            title="Đã giao hàng:"
            color={COLORS.completed}
          />
        ) : null}
      </View>
    </View>
  );
};

const ConfirmTime = ({time, title, color}) => {
  return (
    <View paddingTop={10}>
      <Text style={{color: color, fontWeight: '600', fontSize: 15}}>
        {title}
      </Text>
      <Text style={{paddingStart: 20}}>{converTimeToFB(time)}</Text>
    </View>
  );
};

export default HistoryOrder;
