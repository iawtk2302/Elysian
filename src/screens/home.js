import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
  SafeAreaView,
  LogBox,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Swiper from 'react-native-swiper';
import auth from '@react-native-firebase/auth';
// import {keyExtractor} from 'react-native/Libraries/Lists/VirtualizeUtils';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SharedElement} from 'react-navigation-shared-element';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import ItemBanner from '../components/itemBanner';
import ItemProduct from '../components/itemProduct';
import { useNavigation } from '@react-navigation/native'
// import ItemProduct from '../components/itemProduct';
// import ItemBanner from './itemBanner';
// import ItemProduct from './itemProduct';

const {height, width} = Dimensions.get('window');
const Home = ({navigation}) => {
  const navigator=useNavigation()
  // console.log('first');
  const [text, setText] = useState('gggg');
  const [rerender, SetRerender] = useState(false);
  const [databanner, setDatabanner] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);
  const getData = async () => {
    const listBanner = [];
    const listProduct = [];
    await firestore()
      .collection('Banners')
      .get()
      .then(querySnapshot => {
        // console.log('Total users: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          listBanner.push(documentSnapshot.data());
          // console.log(documentSnapshot.data());
        });
        setDatabanner(listBanner);
      });
    await firestore()
      .collection('Products')
      .limit(5)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          listProduct.push(documentSnapshot.data());
          // console.log(documentSnapshot.data());
        });
        setDataProducts(listProduct);
      });
  };
  useEffect(() => {
    // LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    getData();
  }, []);

  return (
    <View
      style={{flex: 1, borderRadius: 100}}
      nestedScrollEnabled={false}>
        <View style={styles.header}>
          <Image
            source={require('../assets/coffee-cup.png')}
            style={{marginHorizontal: 5, width: 30, height: 30}}
          />
          <Text style={{fontWeight: 'bold', fontSize: 15, paddingLeft: 5}}>
            Xin chào, {auth().currentUser.displayName}
          </Text>
          <Icon
            name="bell"
            style={{fontSize: 20, position: 'absolute', right: 10}}
            onPress={() => navigator.navigate('ItemNotification')}
          />
        </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal: 15}}>
        <Text style={{fontSize: 19, fontWeight: 'bold', color: 'black'}}>
          Bộ sưu tập
        </Text>
        <View style={{flex: 1, paddingVertical: 20}}>
          <Swiper
            activeDotColor="white"
            dotStyle={{marginTop: 40}}
            activeDotStyle={{marginTop: 40}}
            style={{height: width / 2 + 22}}
            autoplay={true}
            autoplayTimeout={3}
            loop={true}
            key={1}>
            {databanner.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => {
                    navigator.navigate('Banner', {item: item});
                  }}>
                  <Image
                    // key={index}
                    style={{
                      borderRadius: 20,
                      // flex: 1,
                      width: width - 30,
                      height: width / 2,
                      resizeMode: 'contain',
                    }}
                    source={{uri: item.image}}
                    // resizeMethod='resize'
                  />
                </TouchableWithoutFeedback>
              );
            })}
          </Swiper>
        </View>
        <Text
          style={{
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 10,
            color: 'black',
          }}>
          Gợi ý riêng cho {auth().currentUser.displayName.toUpperCase()}
        </Text>
        <View>
          {dataProducts.map((item, index) => {
            return <ItemProduct item={item} key={index} />;
          })}
        </View>
        <Text
          style={{
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 10,
            marginTop: 40,
            color: 'black',
          }}>
          Khám phá thêm
        </Text>
        <View
          style={{
            flex: 2,
            flexWrap: 'wrap',
            flexDirection: 'row',
            marginHorizontal: -5,
          }}>
          {
            databanner.map((item, index) => {
              return (
                <ItemBanner item={item} navigation={navigation} key={index} />
              );
            })
            // <FlatList
            //   scrollEnabled={true}
            //   horizontal={false}
            //   numColumns={2}
            //   data={databanner}
            //   renderItem={item => (
            //     <ItemBanner item={item} navigation={navigation} />
            //   )}
            //   keyExtractor={(item, index) => index}
            // />
          }
        </View>
        <View>
          <Text>ác</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white'
  },
});
