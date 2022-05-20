import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Input from '../components/input';
import DropDownPicker from 'react-native-dropdown-picker';
import auth from '@react-native-firebase/auth'
const Register = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: ' Nam', value: 'nam'},
    {label: ' Nữ', value: 'nữ'},
  ]);
  const SetProfile = () => {
    console.log('first')
    // await auth().currentUser.updateEmail('bakhanhct2@gmail.com')
  }
  return (
    <View style={styles.container}>
      <Input placeholder="Nhập tên của bạn" />
      <Input placeholder="Nhập họ của bạn" />
      <Input placeholder="Nhập email của bạn" />
      <Input placeholder="Chọn ngày sinh" iconName={'calendar'} />
      <DropDownPicker
        placeholder=" Chọn giới tính"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <TouchableOpacity style={styles.btnLogin}  onPress={SetProfile()}>
          <Text style={{alignSelf: 'center', fontSize: 17, color: 'black'}}>
            Tạo tài khoản
          </Text>
        </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },
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
