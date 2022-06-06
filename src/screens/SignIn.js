import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import COLORS from '../common/Color'
import React, {useState, useEffect} from 'react';
import Input from '../components/input';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {googleLogin, signIn, onFacebookButtonPress} from '../utils/Auth';
import auth from '@react-native-firebase/auth';
import Vertify from './Vertify';
const SignIn = ({navigation}) => {
  GoogleSignin.configure({
    webClientId:
      '242687886098-tqvu3kpcru4uo0lhdg47otfetdrb6slj.apps.googleusercontent.com',
  });
  const [confirm, setConfirm] = useState(null);
  const [phone, setPhone] = useState('');
  const [isPress,setIsPress]=useState(false)
  async function signInWithPhoneNumber(phoneNumber) {
    try {
      if (phoneNumber.charAt(0) === '0') {
        let a = phoneNumber.substring(1);
        phoneNumber = '+84'.concat(a);
        console.log(phoneNumber);
      }
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      await setConfirm(confirmation);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Recheck your phone number', 4);
    }
  }
  useEffect(()=>{
    if(phone=='')
    setIsPress(false)
    else
    setIsPress(true)
  },[phone])
  if (!confirm)
    return (
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require('../assets/background.jpg')}
              style={styles.imgBackground}
            />
          </View>
          <View style={styles.footer}>
            <Text style={{alignSelf: 'center'}}>Chào mừng đến với Elysian</Text>
            <Text style={styles.name}>ELYSIAN</Text>
            <Input
              keyboardType="numeric"
              placeholder="Nhập số điện thoai"
              onChangeText={text => setPhone(text)}
            />
            <TouchableOpacity
              style={isPress?styles.btnLogin:styles.btnLogin1}
              disabled={!isPress}
              onPress={() => signInWithPhoneNumber(phone)}>
              <Text style={styles.txtSignin}>Đăng nhập</Text>
            </TouchableOpacity>

            <Text style={styles.OtherSignIn}>- Hoặc -</Text>

            {/* Button Sign in with google */}
            <TouchableOpacity
              style={styles.gg}
              activeOpacity={0.7}
              onPress={() => {
                googleLogin();
              }}>
              <Image
                style={styles.imggg}
                source={require('../assets/google.png')}
              />
              <View style={styles.txtgg}>
                <Text style={{color: '#000', fontSize: 16}}>
                  Tiếp tục bằng google
                </Text>
              </View>
            </TouchableOpacity>
            {/* Button sign in with facebook */}
            <TouchableOpacity
              style={styles.gg}
              activeOpacity={0.7}
              onPress={onFacebookButtonPress}>
              <Image
                style={styles.imggg}
                source={require('../assets/facebook.png')}
              />
              <View style={styles.txtgg}>
                <Text style={{color: '#000', fontSize: 16}}>
                  Tiếp tục bằng facebook
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  return <Vertify confirm={confirm} phoneNumber={phone} />;
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: 'red',
  },
  imgBackground: {
    width: 400,
    height: 250,
  },
  footer: {
    flex: 2,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignContent: 'space-around',
    paddingTop: 40,
    paddingHorizontal: 30,
  },
  name: {
    fontSize: 30,
    color: COLORS.custom,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 20,
  },
  btnLogin: {
    backgroundColor: COLORS.custom,
    height: 46,
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnLogin1: {
    backgroundColor: '#C5C5C5',
    height: 46,
    justifyContent: 'center',
    borderRadius: 10,
  },
  OtherSignIn: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 30,
  },
  gg: {
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: '#ffff',
    borderRadius: 5,
    borderColor: '#C5C5C5',
    borderWidth: 1.5,
    height: 42,
    alignItems: 'center',
    // paddingLeft: 48,
    justifyContent:'center'
  },
  imggg: {
    width: 24,
    height: 24,
  },
  txtgg: {
    color: '#000',
    fontSize: 16,
    marginLeft: 10,
  },
  txtSignin: {
    alignSelf: 'center',
    fontSize: 17,
    color: 'white',
  },
});
