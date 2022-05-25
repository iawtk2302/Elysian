import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import ItemNotification from '../components/ItemNotification';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../common/Color';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Button} from 'react-native-paper';
const Notification = () => {
  const [notiData, setNotiData] = useState([]);
  const [listId, setListId] = useState([]);
  const getData = async () => {
    const tempData = [];
    const tempId = [];
    await firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.id === auth().currentUser.uid) {
            for (const [key, value] of Object.entries(
              documentSnapshot.data().Notifications,
            )) {
              getNotification(key);
            }
          }
          // tempData.push(data)
        });
      });
  };
  const getNotification = async key => {
    const tempData = {};
    await firestore()
      .collection('Notifications')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.id === key) {
            const data = documentSnapshot.data();
            data.id = documentSnapshot.id;
            // tempData.push(data)
            setNotiData(pre => [...pre, data]);
          }
        });
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{marginTop: 15, flex: 1}}>
      {/* <View style={styles.container}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          Notification
        </Text>
      </View> */}
      {notiData.map((item, index) => {
        return <ItemNotification key={index} item={item} />;
      })}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.custom,
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});
