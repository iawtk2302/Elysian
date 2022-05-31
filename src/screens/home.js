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
import COLORS from '../common/Color';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Swiper from 'react-native-swiper';
import auth from '@react-native-firebase/auth';
// import {keyExtractor} from 'react-native/Libraries/Lists/VirtualizeUtils';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {SharedElement} from 'react-navigation-shared-element';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import ItemBanner from '../components/itemBanner';
import ItemProduct from '../components/itemProduct';
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
// import ItemProduct from '../components/itemProduct';
// import ItemBanner from './itemBanner';
// import ItemProduct from './itemProduct';

const {height, width} = Dimensions.get('window');
const Home = ({navigation}) => {
  const orders=useSelector(state=>state.orders.list)
  const navigator=useNavigation()
  const navPayment = () => {
    if(orders.length>0)
    navigation.push('Payment');
  };
  // console.log('first');
  const [text, setText] = useState('gggg');
  const [rerender, SetRerender] = useState(false);
  const [databanner, setDatabanner] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);
  const [dataSize, setDataSize] = useState([]);
  const [datatopping, setDataTopping] = useState([]);
  const getData = async () => {
    const listBanner = [];
    const listProduct = [];
    const size=[]
    const topping=[]
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
        });
        setDataProducts(listProduct);
      });
      await firestore()
      .collection('Sizes')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          size.push(documentSnapshot.data());
        });
        setDataSize(size);
      });
      await firestore()
      .collection('Toppings')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          topping.push(documentSnapshot.data());
        });
        setDataTopping(topping);
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
            onPress={() => navigator.navigate('Notification')}
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
            return <ItemProduct item={item} key={index} topping={datatopping} size={dataSize}/>;
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
          }
        </View>
        <View>
        </View>
      </ScrollView>
      {
        orders.length>0&&
        <View style={styles.count}>
            <Text style={{fontSize:12, color:'white'}}>{orders.length}</Text>
        </View>
        
      }
      {
        orders.length>0&&
        <TouchableOpacity style={styles.btnfl} activeOpacity={1} onPress={navPayment}>
            <Icon1 name='cart-outline' color='white' size={24}/>     
      </TouchableOpacity>
        
      } 
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
  btnfl: {
    backgroundColor: COLORS.custom,
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 15,
    right: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  count: {
    backgroundColor: '#BC945D',
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: 48,
    right: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:10
  }
});
