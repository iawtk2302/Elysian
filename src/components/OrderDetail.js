import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../styles/View.OrderDetail';
import {Divider} from 'react-native-paper';
import COLORS from '../common/Color';
import BtnActionOrder from './BtnActionOrder';

const OrderDetail = ({item}) => {
  return (
    <View style={styles.container}>
      <View padding={10}>
        <TouchableOpacity>
          <View flexDirection="row">
            <Image
              source={{uri: item.image}}
              style={{width: 70, height: 70, backgroundColor: 'white'}}
            />
            <Detail data={item} />
          </View>
        </TouchableOpacity>
        <Divider margin={10} />
        <PennyTotal amount={item.amount} price={item.price} />
        <BtnActionOrder state={item.state} />
      </View>
    </View>
  );
};

const Detail = ({data}) => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flex: 1,
      }}>
      <Text style={{color: 'black', fontSize: 16}}>{data.name}</Text>
      <Text>
        Kích cỡ:{' '}
        <Text style={{color: 'black', fontWeight: 'bold'}}>{data.size}</Text>
      </Text>
      <View style={styles.layout}>
        <Text>
          Số lượng:{' '}
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            {data.amount}
          </Text>
        </Text>
        <Text>
          Giá: <Text style={{color: 'black'}}>{data.price}đ</Text>
        </Text>
      </View>
    </View>
  );
};

const PennyTotal = ({amount, price}) => {
  return (
    <View style={styles.layout}>
      <Text>x{amount}</Text>
      <Text>
        Thành tiền:{' '}
        <Text style={{color: COLORS.custom}}>
          {parseInt(amount) * parseInt(price)}đ
        </Text>
      </Text>
    </View>
  );
};

export default OrderDetail;
