import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../src/styles/View.Payment.container';
import firestore from '@react-native-firebase/firestore';
import fireAuth from '@react-native-firebase/auth';
import COLORS from '../common/Color';

export default function MoreAddresses({navigation}) {
  return (
    <View>
      <Top navigation={navigation} />
      <ScrollView>
        <Body />
        <Bot />
        <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
}

const Top = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" style={styles.iconSize} />
        </TouchableOpacity>
        <Text style={styles.bold}>Chọn địa chỉ khác</Text>
        <Text>SỬA</Text>
      </View>
    </View>
  );
};

const Body = () => {
  const [update, setUpdate] = useState([]);
  useEffect(() => {
    const getMoreAddress = async () => {
      firestore()
        .collection('Addresses')
        .where('userID', '==', fireAuth().currentUser.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            setUpdate(preUpdate => [...preUpdate, documentSnapshot.data()]);
          });
        });
    };
    getMoreAddress();
  }, []);

  return (
    <View style={{marginTop: 20}}>
      {update.map((address, index) => (
        <TouchableOpacity key={index}>
          <Address address={address} />
        </TouchableOpacity>
      ))}
    </View>
  );
};
const Bot = () => {
  return (
    <View style={{backgroundColor: 'white', marginTop: 20}}>
      <View
        style={[
          styles.container,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Ionicons name="add" size={20} />
          <Text style={{marginStart: 5}}>Thêm địa chỉ mới</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Address = ({address}) => {
  return (
    <View style={styles.moreAddressContainer}>
      <View style={{flex: 9}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'black', paddingBottom: 5}}>{address.name}</Text>
          {address.selected == true ? (
            <Text style={{color: COLORS.custom, paddingStart: 10}}>
              [Mặc định]
            </Text>
          ) : null}
        </View>
        <Text>{address.phone}</Text>
        <Text>{address.detail}</Text>
        <Text>
          {address.village}', '{address.ward}','{address.district}','
          {address.province}
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        {address.selected == true ? (
          <Ionicons
            name="location-sharp"
            style={{fontSize: 20, color: COLORS.custom}}
          />
        ) : (
          <Ionicons
            name="location-outline"
            style={{fontSize: 20, color: COLORS.custom}}
          />
        )}
      </View>
    </View>
  );
};
