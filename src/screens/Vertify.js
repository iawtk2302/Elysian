import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import firestore from '@react-native-firebase/firestore';

const Vertify = ({navigation, confirm, isSocial = 0, setHasPhone, phoneNumber}) => {
  // const [phoneNumber, setPhoneNumber] = useState('0396891589');
  const [timetoResend, setTimetoResend] = useState('3:00');
  const [code, setCode] = useState('');
  const [user, setUser] = useState(null)
  async function confirmCode() {
    try {
      // console.log(confirm);
      await confirm.confirm(code);
      // console.log('success');
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  async function confirmCodewithSocical() {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        confirm.verificationId,
        code,
      );
      let userData = await auth().currentUser.linkWithCredential(credential);
      setUser(userData.user);
      setHasPhone(true)
      UpdateUser()
    } catch (error) {
      if (error.code == 'auth/invalid-verification-code') {
        console.log('Invalid code.');
      } else {
        console.log(error);
        // if(error == 'auth/unknown] User has already been linked to the given provider')
        //   setHasPhone(true)
      }
    }
  }
  const UpdateUser = async() => {
    const user = auth().currentUser
    let userInfo
    userInfo = {phoneNumber: user.phoneNumber, name: user.displayName}
    await firestore()
    .collection('Users')
    .doc(auth().currentUser.uid)
    .set(userInfo)
    .then(() => {
      // console.log('added');
    });
  }
  // if(profileUpdated)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtHeader}>Xác nhận mã OTP</Text>
        <Text style={styles.txtNoti}>
          Một mã xác thực gồm 6 số đã được gửi đến số điện thoại {phoneNumber}
        </Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.txtNoti}>Nhập mã để tiếp tục</Text>
        <OTPInputView
          style={{width: '100%', height: 100}}
          pinCount={6}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={code => {
            setCode(code);
          }}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
        <Text style={styles.txtNoti}>
          Không nhận được mã Gửi lại ({timetoResend})
        </Text>
        <TouchableOpacity
          style={styles.btnLogin}
          onPress={() => {
            if (isSocial === 1) confirmCodewithSocical();
            else confirmCode();
          }}>
          <Text style={{alignSelf: 'center', fontSize: 17, color: 'black'}}>
            Xác nhận
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Vertify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
    color: 'black'
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  //

  btnLogin: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    flex: 1,
    backgroundColor: 'red',
    height: 46,
    justifyContent: 'center',
    borderRadius: 10,
  },
});
