import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../styles/View.OrderDetail';
import {Divider} from 'react-native-paper';
import FormatNumber from '../utils/FormatNumber';

const OrderDetail = ({item}) => {
  return (
    <View style={{marginTop: 15}}>
      <TouchableOpacity>
        <View flexDirection="row" marginTop={10}>
          <Image
            source={{uri: item.products.linkImage}}
            style={{width: 70, height: 70, backgroundColor: 'white'}}
          />
          <Detail data={item} />
        </View>
      </TouchableOpacity>
      <Divider margin={10} />
      <PennyTotal amount={item.amount} price={item.products.price} />
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
      <Text style={{color: 'black', fontSize: 16}}>{data.products.name}</Text>
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
          Giá: <FormatNumber number={data.products.price} />
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
        Thành tiền: <FormatNumber number={parseInt(amount) * parseInt(price)} />
      </Text>
    </View>
  );
};

export default OrderDetail;
