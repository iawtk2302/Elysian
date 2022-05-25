import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TopTabs} from '../navigators/Navigation';
import {useSelector, useDispatch} from 'react-redux';
import {setValues} from '../redux/orderDetailSlide';
import fireStore from '@react-native-firebase/firestore';
import fireAuth from '@react-native-firebase/auth';

const Activities = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loadAllOrder = async () => {
      await fireStore()
        .collection('Orders')
        .where('userID', '==', fireAuth().currentUser.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            dispatch(setValues(documentSnapshot.data()));
          });
        });
    };
    loadAllOrder();
  }, []);
  return <TopTabs />;
};

export default Activities;

const styles = StyleSheet.create({});
