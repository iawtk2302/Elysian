import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../common/Color';
import {signOut} from '../utils/Auth';
import {Avatar} from '@rneui/themed';
import fireauth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
const User = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [user, setUser] = useState();
  const getInfoUser = async () => {
    const temp = await firestore()
      .collection('Users')
      .doc(fireauth().currentUser.uid)
      .get();
    return temp.data();
  };
  const setInfo = async () => {
    const data = await getInfoUser();
    setUser(data);
    setLoading(false);
  };
  useEffect(() => {
    setInfo();
  }, []);
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{paddingHorizontal:16, backgroundColor:'white'}}>
      <View style={{flexDirection:'row',marginVertical:10,alignItems:'center'}}>
      <Avatar
              size={64}
              rounded
              source={{ uri: user.avatar == '' ? 'http://danhgia.snv.kontum.gov.vn/Images/no-avatar.png' : user.avatar }}
            />
            <View style={{marginLeft:10}}>
              <Text style={{fontSize:20, color:'black', fontWeight:'500'}}>{user.name}</Text>
              <Text>{user.email}</Text>
            </View>
      </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <TouchableOpacity
            style={{
              width: 170,
              height: 80,
              borderRadius: 10,
              backgroundColor: '#F6F1E7',
            }}
            activeOpacity={0.6}
            onPress={() => {
              navigation.push('InfoUser', user);
            }}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Icon
                name="create-outline"
                color={COLORS.custom}
                size={28}
                style={{marginBottom: 4}}
              />
              <Text
                style={{fontSize: 14, color: COLORS.custom, fontWeight: '500'}}>
                Thông tin cá nhân
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 170,
              height: 80,
              borderRadius: 10,
              backgroundColor: '#F6F1E7',
            }}
            activeOpacity={0.6}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Icon
                name="location-outline"
                color={COLORS.custom}
                size={28}
                style={{marginBottom: 4}}
              />
              <Text
                style={{fontSize: 14, color: COLORS.custom, fontWeight: '500'}}>
                Địa chỉ đã lưu
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({});
