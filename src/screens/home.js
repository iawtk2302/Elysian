import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

const Home = () => {
  // useEffect(() => {
  //   firestore()
  //     .collection('Orders')
  //     .add({
  //       name: 'Ada Lovelace',
  //       age: 30,
  //     })
  //     .then(() => {
  //       console.log('User added!');
  //     });
  // }, []);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
