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
import React, {useState} from 'react'
import Input from '../components/input';
import auth from '@react-native-firebase/auth';
import Vertify from './Vertify';
const SignIn = ({navigation}) => {
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('123456');
    const [phone, setPhone] = useState('');
  
    async function signInWithPhoneNumber(phoneNumber) {
      try {
        // console.log(phoneNumber);
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        await setConfirm(confirmation);
        // console.log(confirm);
      } catch (error) {
        console.log(error);
        ToastAndroid.show("Recheck your phone number", 4)
      }
  //0372948690
      // navigation.setOptions({
      //   confirm: confirm,
      // });
      // navigation.navigate('PhoneVirtify');
    }
  
    async function confirmCode() {
    //   console.log(confirm);
      try {
        await confirm.confirm(code);
        console.log('success');
      } catch (error) {
        console.log('Invalid code.');
      }
    }
    if (!confirm)
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                source={require('../assets/background.jpg')}
                style={{width: 400, height: 250}}
              />
            </View>
            <View style={styles.footer}>
              <Text style={{alignSelf: 'center'}}>Chào mừng đến với Elysian</Text>
              <Text style={styles.name}>ELYSIAN</Text>
              <Input
                placeholder="Nhập số điện thoai"
                onChangeText={(text) => setPhone(text)}
              />
              <TouchableOpacity
                style={styles.btnLogin}
                onPress={() => signInWithPhoneNumber(phone)}>
                <Text style={{alignSelf: 'center', fontSize: 17, color: 'black'}}>
                  Đăng nhập
                </Text>
              </TouchableOpacity>
  
              <Text style={styles.OtherSignIn}>- Or sign in with -</Text>
  
              {/* Button Sign in with google */}
              <TouchableOpacity
                style={styles.gg}
                activeOpacity={0.7}
                onPress={() => {
                //   confirmCode();
                }}>
                <Image
                  style={styles.imggg}
                  source={require('../assets/google.png')}
                />
                <View style={styles.txtgg}>
                  <Text style={{color: '#000', fontSize: 16}}>
                    Sign in with google
                  </Text>
                </View>
              </TouchableOpacity>
              {/* Button sign in with facebook */}
              <TouchableOpacity
                style={styles.gg}
                activeOpacity={0.7}
                onPress={() => {
                //   auth().signOut();
                }}>
                <Image
                  style={styles.imggg}
                  source={require('../assets/facebook.png')}
                />
                <View style={styles.txtgg}>
                  <Text style={{color: '#000', fontSize: 16}}>
                    Sign in with facebook
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    return <Vertify confirm={confirm} />;
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        flex: 1,
      },
      header: {
        flex: 1,
        backgroundColor: 'red',
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
        color: 'red',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 20,
      },
      btnLogin: {
        backgroundColor: 'red',
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
        borderColor: '#4FC4F5',
        borderWidth: 1.5,
        height: 42,
        alignItems: 'center',
        paddingLeft: 48,
      },
      imggg: {
        width: 24,
        height: 24,
      },
      txtgg: {
        color: '#000',
        fontSize: 16,
        marginLeft: 35,
      },
})