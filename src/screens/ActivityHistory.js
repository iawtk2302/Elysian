import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SectionList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ItemHistory from '../components/ItemHistory';
import COLORS from '../common/Color';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ActivityHistory = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const [listId, setListId] = useState([]);

  const getData = async () => {
    const list = [];
    const listDelivery = [];
    const listCancel = [];
    const listComplete = [];
    const listid = [];
    await firestore()
      .collection('Orders')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          listid.push(documentSnapshot.id);
          // console.log(documentSnapshot.id)
          list.push(documentSnapshot.data());
          switch (documentSnapshot.data().status) {
            case 'delivery':
              const data1 = documentSnapshot.data();
              data1.id = documentSnapshot.id;
              listDelivery.push(data1);
              // console.log(listDelivery)
              break;
            case 'complete':
              const data2 = documentSnapshot.data();
              data2.id = documentSnapshot.id;
              listComplete.push(data2);
              break;
            default:
              const data3 = documentSnapshot.data();
              data3.id = documentSnapshot.id;
              listCancel.push(data3);
              // console.log(listCancel)

              break;
          }
        });
      });
    const listData = [
      {
        title: 'delivery',
        data: listDelivery,
      },
      {
        title: 'complete',
        data: listComplete,
      },
      {
        title: 'cancel',
        data: listCancel,
      },
    ];
    // console.log(list)
    // console.log(listData)
    setListId(listid);
    return listData;
  };
  const [rerender, setRerender] = useState(false);

  const setSection = async () => {
    const Data = await getData();
    // console.log(Data)
    setDataOrder(Data);
  };

  useEffect(() => {
    setSection();
    console.log('first');
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <View style={styles.header}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              color: 'white',
              fontWeight: 'bold',
            }}
            onPress={() => {
              console.log(dataOrder);
            }}>
            Activities
          </Text>
        </View> */}
      <SectionList
        sections={dataOrder}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, index}) => (
          <ItemHistory iitem={item} setRerender={setSection} />
        )}
        renderSectionHeader={({section: {title}}) => <Text>{title}</Text>}
        extraData={item => item.status}
      />
      {/* {dataOrder.map((item, index) => {
          return <ItemHistory iitem={item} id={listId[index]} key={index} />;
        })} */}
      {/* <FlatList
          data={dataOrder}
          renderItem={(item, index) => {
            return <ItemHistory iitem={item} id={listId[item.index]}/>;
          }}
        /> */}
    </View>
  );
};

export default ActivityHistory;

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: 'center',
    backgroundColor: COLORS.custom,
  },
});
