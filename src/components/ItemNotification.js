import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
//2yAO0BdR9IdQF9BpKzZv
//Ulrzc5JqlXRJjeRospxo
//leaNds7kG0K5UUqPD6GU
//sxGJkq5yuo615N98UCnY
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const ItemNotification = ({item}) => {
  const [time, setTime] = useState('10/2');
  const [isNew, setNew] = useState(item.isNew);
  const convertTime = time => {
    const newTime = new Date(time * 1000);
    setTime(newTime.getDate() + '/' + newTime.getMonth());
    return newTime;
  };
  const updateDoc = async data => {
    await firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .update({Notifications: data})
      .then(() => {
        // console.log('changed')
      });
  };
  const UpdateNew = async () => {
    let data = {};
    await firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .onSnapshot(document => {
        Object.assign(data, document.data().Notifications);
        for (const [key, value] of Object.entries(
          document.data().Notifications,
        )) {
          if (item.id === key)
            if (value === true) {
              setNew(true);
            }
        }
      });
  };
  const ItemClick = async () => {
    let data = {};
    await firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .onSnapshot(document => {
        Object.assign(data, document.data().Notifications);
        for (const [key, value] of Object.entries(
          document.data().Notifications,
        )) {
          // console.log(`${key}: ${value}`);
          if (item.id === key)
            if (value === true) {
              // console.log(item.id)
              // console.log(key)
              data[key] = false;
              // console.log(data)
              updateDoc(data);
              setNew(false);
            }
        }
        setNew(false);
      });
  };
  useEffect(() => {
    UpdateNew();
    convertTime(10000);
    // console.log('first')
    // console.log(isNew)
  }, []);
  return (
    <TouchableOpacity
      style={[styles.container]}
      activeOpacity={0.7}
      onPress={() => {
        ItemClick();
        // console.log(item)
      }}>
      <View style={{flex: 1}}>
        <Image
          style={styles.imageLeft}
          source={{
            uri:
              item.linkImage !== '' && item.linkImage !== undefined
                ? item.linkImage
                : 'https://firebasestorage.googleapis.com/v0/b/notification-314b0.appspot.com/o/image1%20-%20Copy.png?alt=media&token=adb16fcd-0104-41df-90d1-f795bc6be25f',
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          flex: 3,
          paddingRight: 20,
          paddingLeft: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 3,
          }}>
          <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
            {item.title}
          </Text>
        </View>
        <Text>{item.body}</Text>
      </View>
      <View
        style={{
          alignSelf: 'flex-start',
        }}>
        <View style={{paddingRight: 15, paddingTop: 15}}>
          <Text>{time}</Text>
        </View>
        {isNew && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'flex-end',
              marginTop: -25,
            }}>
            <Icon name="circle" color={'#4FC4F5'} />
          </View>
        )}
      </View>
      {/* {
        <TouchableOpacity style={styles.btnFollow} activeOpacity={0.6}>
          <Text
            style={{
              color: 'white',
            }}>
              {time}
          </Text>
        </TouchableOpacity>
      } */}
    </TouchableOpacity>
  );
};

export default ItemNotification;

const styles = StyleSheet.create({
  container: {
    height: 100,
    // borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11,
    elevation: 17,
    marginBottom: 10,
  },
  imageLeft: {
    width: 70,
    height: 70,
    marginRight: 20,
  },
  btnFollow: {
    backgroundColor: '#4FC4F5',
    width: 60,
    height: 30,
    flex: 1,
    marginLeft: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
