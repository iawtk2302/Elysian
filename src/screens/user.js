import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Linking
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../common/Color';
import { signOut } from '../utils/Auth';
import { Avatar } from '@rneui/themed';
import fireauth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
const User = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [user, setUser] = useState();
  const onResult = (QuerySnapshot) => {
    setUser(QuerySnapshot.data())
    setLoading(false)
  }
  const onError = (error) => {
    console.error(error);
  }
  useEffect(() => {
    firestore().collection('Users').doc(fireauth().currentUser.uid).onSnapshot(onResult, onError);
    return () => { }
  }, [])
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, backgroundColor: 'white'}}>
        <View style={{ flexDirection: 'row', marginTop:25, marginBottom:10, alignItems: 'center' }}>
          <Avatar
            size={64}
            rounded
            source={{ uri: user?.avatar == undefined ? 'http://danhgia.snv.kontum.gov.vn/Images/no-avatar.png' : user.avatar }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 20, color: 'black', fontWeight: '500' }}>{user.name}</Text>
            <Text>{user.email}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop:10,
            marginBottom:20
          }}>
          <TouchableOpacity
            style={{
              width: '47%',
              height: 80,
              borderRadius: 10,
              backgroundColor: '#F6F1E7',
            }}
            activeOpacity={0.6}
            onPress={() => {
              navigation.push('InfoUser', user);
            }}>
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Icon
                name="create-outline"
                color={COLORS.custom}
                size={28}
                style={{ marginBottom: 4 }}
              />
              <Text
                style={{ fontSize: 14, color: COLORS.custom, fontWeight: '500' }}>
                Thông tin cá nhân
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '47%',
              height: 80,
              borderRadius: 10,
              backgroundColor: '#F6F1E7',
            }}
            activeOpacity={0.6}
            onPress={() => { navigation.push('Address') }}>
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Icon
                name="location-outline"
                color={COLORS.custom}
                size={28}
                style={{ marginBottom: 4 }}
              />
              <Text
                style={{ fontSize: 14, color: COLORS.custom, fontWeight: '500' }}>
                Địa chỉ đã lưu
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{height:80, backgroundColor:'white', marginTop:15, paddingHorizontal:10}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Icon name='alert-circle-outline' size={24}/>
              <Text style={{fontSize:16, color:'black', fontWeight:'500', marginLeft:10, marginVertical:10}}>Thông tin chung</Text>
            </View>
            <TouchableOpacity style={{flexDirection:'row', alignItems:'center',paddingHorizontal:10, justifyContent:'space-between'}}
              onPress={()=>{Linking.openURL('https://gongcha.com.vn/gioi-thieu/')}}>
              <Text>Thông tin về Elysian</Text>
              <Icon name='chevron-forward-outline' size={24}/>
            </TouchableOpacity>
      </View>
      <View style={{height:110, backgroundColor:'white', marginTop:15, paddingHorizontal:10}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Icon name='people-outline' size={24}/>
              <Text style={{fontSize:16, color:'black', fontWeight:'500', marginLeft:10, marginVertical:10}}>Trung tâm trợ giúp</Text>
            </View>
            <TouchableOpacity style={{flexDirection:'row', alignItems:'center',paddingHorizontal:10, justifyContent:'space-between'}}
              onPress={()=>{Linking.openURL('https://gongcha.com.vn/lien-he/')}}
              >
              <Text>Phản hồi</Text>
              <Icon name='chevron-forward-outline' size={24}/>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection:'row', alignItems:'center',paddingHorizontal:10, justifyContent:'space-between', marginTop:10}}
              onPress={()=>{navigation.push('Support')}}>
              <Text>Hỗ trợ</Text>
              <Icon name='chevron-forward-outline' size={24}/>
            </TouchableOpacity>
      </View>
      <TouchableOpacity style={{flexDirection:'row', alignItems:'center',paddingHorizontal:10, marginTop:10}} 
              activeOpacity={1}
              onPress={signOut}>
              <Icon name='log-out-outline' size={24} color='black'/>
              <Text style={{marginLeft:10,color:'black'}}>Thoát ứng dụng</Text>
            </TouchableOpacity>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({});
