<<<<<<< HEAD
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {signOut} from '../utils/Auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
const User = () => {
  const navigator = useNavigation()
  const [location, setLocation] = useState([]);

  const getData = async () => {
    const temp = []
    await firestore()
    .collection('Locations')
    .onSnapshot(query => {
      query.forEach(doc => {
        temp.push(doc.data())
      })
    })
    setLocation(temp)
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={{justifyContent: 'center', flex: 1}}>
      <TouchableOpacity
        style={{
          height: 50,
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
        }}
        onPress={signOut}>
        <Text> Sign Out</Text>
      </TouchableOpacity>
      <Button onPress={() => navigator.navigate('Map', {markers: location})}>
        <Text>Open Map</Text>
      </Button>
=======
import { StyleSheet, Text, View, TouchableOpacity,ActivityIndicator } from 'react-native'
import React,{useEffect,useState} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import COLORS from '../common/Color'
import { signOut } from '../utils/Auth'
import { Avatar } from '@rneui/themed';
import fireauth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
const User = () => {
  const navigation=useNavigation()
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [user,setUser]=useState()
  const getInfoUser=async()=>{
    const temp = await firestore().collection('Users').doc(fireauth().currentUser.uid).get();
    return temp.data()
  }
  const setInfo=async()=>{
    const data=await getInfoUser()
    setUser(data)
    setLoading(false)
  }
  useEffect(()=>{
    setInfo()
  },[])
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
              source={{ uri: 'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg' }}
            />
            <View style={{marginLeft:10}}>
              <Text style={{fontSize:20, color:'black', fontWeight:'500'}}>{user.name}</Text>
              <Text>{user.email}</Text>
            </View>
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:10}}>
        <TouchableOpacity style={{width:170, height:80, borderRadius:10,backgroundColor:'#F6F1E7'}} activeOpacity={0.6} onPress={()=>{navigation.push('InfoUser',user)}}>
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Icon name='create-outline' color={COLORS.custom} size={28} style={{marginBottom:4}}/>
            <Text style={{fontSize:14, color:COLORS.custom, fontWeight:'500'}}>Thông tin cá nhân</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{width:170, height:80, borderRadius:10,backgroundColor:'#F6F1E7'}} activeOpacity={0.6}>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Icon name='location-outline' color={COLORS.custom} size={28} style={{marginBottom:4}}/>
            <Text style={{fontSize:14, color:COLORS.custom, fontWeight:'500'}}>Địa chỉ đã lưu</Text>
          </View>
        </TouchableOpacity>
      </View>
      </View>
>>>>>>> fcb710c4bd992ea0464fdf4baee75c45776f4204
    </View>
  );
};

export default User;

const styles = StyleSheet.create({});
