import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../styles/View.OrderDetail';
import {Divider} from 'react-native-paper';
import COLORS from '../common/Color';
import BtnActionOrder from './BtnActionOrder';
import fireStore from '@react-native-firebase/firestore';
import NumberFormat from 'react-number-format';

const OrderDetail = ({item}) => {
  const [rel, setRel] = useState(false);
  useEffect(() => {
    const loadProductDetail = async () => {
      fireStore()
        .collection('Products')
        .doc(item.productID)
        .get()
        .then(documentSnapshot => {
          item.price = documentSnapshot.data().price;
          item.image = documentSnapshot.data().linkImage;
          item.name = documentSnapshot.data().name;
          setRel(true);
        });
    };

    loadProductDetail();
  }, []);
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
          Giá:{' '}
          <NumberFormat
            value={parseInt(data.price)}
            displayType="text"
            thousandSeparator
            suffix="đ"
            renderText={value => <Text>{value}</Text>}
          />
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
        <NumberFormat
          value={parseInt(amount) * parseInt(price)}
          displayType="text"
          thousandSeparator
          suffix="đ"
          renderText={value => <Text>{value}</Text>}
        />
      </Text>
    </View>
  );
};

export default OrderDetail;
