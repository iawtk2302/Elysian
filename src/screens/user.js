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
    </View>
  );
};

export default User;

const styles = StyleSheet.create({});
