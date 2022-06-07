import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../styles/View.OrderDetail';
import {Divider} from 'react-native-paper';
import FormatNumber from '../utils/FormatNumber';
import totalTopping from '../utils/totalTopping';

const OrderDetail = ({item}) => {
  return (
    <View
      style={{
        marginTop: 15,
        backgroundColor: 'white',
        padding: 15,
      }}>
      <TouchableOpacity>
        <View flexDirection="row">
          <Image
            source={{uri: item.products.linkImage}}
            style={{width: 70, height: 70, backgroundColor: 'white'}}
          />
          <Detail data={item} />
        </View>
      </TouchableOpacity>
      <View marginTop={10}>
        {item.toppingIDs.length != 0
          ? item.toppingIDs.map((topping, index) => (
              <View key={index}>
                <ShowTopping topping={topping} />
              </View>
            ))
          : null}
      </View>
      <Divider margin={10} />
      <PennyTotal
        amount={item.amount}
        price={item.products.price}
        priceTopping={totalTopping(item.toppingIDs)}
      />
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

const ShowTopping = ({topping}) => {
  return (
    <View>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{paddingStart: 5, paddingEnd: 5}}>
            <Image
              source={{uri: topping.linkImage}}
              style={{width: 50, height: 50, resizeMode: 'contain'}}
            />
          </View>
          <Text style={{paddingStart: 10, color: 'black', alignSelf: 'center'}}>
            {topping.name}
          </Text>
        </View>
        <Text style={{alignSelf: 'center'}}>
          Giá: <FormatNumber number={topping.price} />
        </Text>
      </View>
    </View>
  );
};

const PennyTotal = ({amount, price, priceTopping}) => {
  return (
    <View style={styles.layout}>
      <Text>x{amount}</Text>
      <Text>
        Thành tiền:{' '}
        <FormatNumber
          number={parseInt(amount) * parseInt(price) + priceTopping}
        />
      </Text>
    </View>
  );
};

export default OrderDetail;
