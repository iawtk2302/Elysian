import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Input from '../components/input';
import auth from '@react-native-firebase/auth';
import Vertify from './Vertify';
import { signOut } from '../utils/Auth';
import Icon from 'react-native-vector-icons/FontAwesome5'

const PhoneVertify = ({setHasPhone}) => {
  const [phoneNumber, setPhoneNumber] = useState('0396891589');
  const [confirm, setConfirm] = useState(null);
  const [isSocial, setIsSocial] = useState(1)
  async function verifyPhoneNumber(phoneNumber) {
    const confirmation = await auth().verifyPhoneNumber(phoneNumber);
    setConfirm(confirmation)
  }

  if(!confirm)
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'flex-end', marginRight: -20, marginTop: 15}}>
        <Icon name='times-circle' size={30} onPress={signOut}/>
      </View>
      <View style={styles.header}>
        <Text style={styles.txtHeader}>Xác nhận số điện thoại</Text>
        <Text style={styles.txtNoti}>
          Vui lòng xác nhận số điện thoại của bạn để nhận được nhiều ưu đãi từ
          cửa hàng của chúng tôi
        </Text>
      </View>
      <View style={styles.body}>
        <Input
          keyboardType="phone-pad"
          placeholder="Nhập số điện thoại"
          onChangeText={text => {
            setPhoneNumber(text);
          }}
        />
        <TouchableOpacity
          style={styles.btnLogin}
          onPress={() => {
            verifyPhoneNumber(phoneNumber)
          }}>
          <Text style={{alignSelf: 'center', fontSize: 17, color: 'black'}}>
            Cập nhật
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <Vertify confirm={confirm} isSocial={isSocial} setHasPhone={setHasPhone}/>
  )
};

export default PhoneVertify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  body: {
    flex: 2,
    justifyContent: 'flex-start',
  },
  txtHeader: {
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  txtNoti: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 15,
    paddingHorizontal: 10,
  },
  //otp-input
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    // width: 30,
    // height: 45,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 5,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  //

  btnLogin: {
    // position: 'absolute',
    // bottom: 30,
    // left: 30,
    // right: 30,
    // flex: 1,
    backgroundColor: 'red',
    height: 46,
    justifyContent: 'center',
    borderRadius: 10,
  },
});
