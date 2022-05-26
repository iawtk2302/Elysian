import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  SectionList,
  Text,
  TouchableOpacity
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import ItemProduct from '../components/itemProduct';
import firestore from '@react-native-firebase/firestore';
import HeaderOrder from '../components/headerOrder';
import ItemCategory from '../components/itemCategory';
import COLORS from '../common/Color';
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const Order = () => {
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState([]);
  const [topping, setTopping] = useState([]);
  const [size, setSize] = useState([]);
  const [count,setCount]=useState(0);
  const navigation=useNavigation()
  const orders=useSelector(state=>state.orders)
  const [dataCategory, setDataCategory] = useState([
    {
      title: 'Trà sữa',
      index: 0,
      select: 'true',
    },
    {
      title: 'Trà',
      index: 1,
      select: 'false',
    },
    {
      title: 'Đá xay',
      index: 2,
      select: 'false',
    },
    {
      title: 'Latte',
      index: 3,
      select: 'false',
    },
    {
      title: 'Sinh tố',
      index: 4,
      select: 'false',
    },
    {
      title: 'Cà phê',
      index: 5,
      select: 'false',
    },
    {
      title: 'Sữa chua',
      index: 6,
      select: 'false',
    },
    {
      title: 'Nước ép',
      index: 7,
      select: 'false',
    },
  ]);
  const sectionRef = useRef(null);
  const getToppings = async () => {
    const temp = [];
    await firestore()
      .collection('Toppings')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          temp.push(documentSnapshot.data());
        });
      });
    return temp;
  };
  const getSizes = async () => {
    const temp = [];
    await firestore()
      .collection('Sizes')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          temp.push(documentSnapshot.data());
        });
      });
    return temp;
  };
  const navPayment = () => {
    navigation.push('Payment');
  };
  const getData = async () => {
    const dataTS = [];
    const dataT = [];
    const dataL = [];
    const dataDX = [];
    const dataST = [];
    const dataCF = [];
    const dataNE = [];
    const dataSC = [];
    await firestore()
      .collection('Products')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.data().type === 'Trà sữa') {
            dataTS.push(documentSnapshot.data());
          } else if (documentSnapshot.data().type === 'Trà') {
            dataT.push(documentSnapshot.data());
          } else if (documentSnapshot.data().type === 'Đá xay') {
            dataDX.push(documentSnapshot.data());
          } else if (documentSnapshot.data().type === 'Latte') {
            dataL.push(documentSnapshot.data());
          } else if (documentSnapshot.data().type === 'Sinh Tố') {
            dataST.push(documentSnapshot.data());
          } else if (documentSnapshot.data().type === 'Cà phê') {
            dataCF.push(documentSnapshot.data());
          } else if (documentSnapshot.data().type === 'Sữa chua') {
            dataSC.push(documentSnapshot.data());
          } else if (documentSnapshot.data().type === 'Nước ép') {
            dataNE.push(documentSnapshot.data());
          }
        });
      });
    const tempSection = [
      {
        title: 'Trà sữa',
        data: dataTS,
      },
      {
        title: 'Trà',
        data: dataT,
      },
      {
        title: 'Đá xay',
        data: dataDX,
      },
      {
        title: 'Latte',
        data: dataL,
      },
      {
        title: 'Sinh tố',
        data: dataST,
      },
      {
        title: 'Cà phê',
        data: dataCF,
      },
      {
        title: 'Sữa chua',
        data: dataSC,
      },
      {
        title: 'Nước ép',
        data: dataNE,
      },
    ];
    return tempSection;
  };
  const addSection = async () => {
    const data = await getData();
    const datatopping = await getToppings();
    const dataSizes = await getSizes();
    setSection(data);
    setTopping(datatopping);
    setSize(dataSizes);
    setLoading(false);
  };
  useEffect(() => {
    addSection()
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={COLORS.custom} />
      </View>
    );
  }
  const scroll = index => {
    if (index == 0) {
      sectionRef.current.scrollToLocation({
        animated: true,
        itemIndex: 0,
        sectionIndex: index,
        viewPosition: 0,
      });
    } else {
      sectionRef.current.scrollToLocation({
        animated: true,
        itemIndex: -1,
        sectionIndex: index,
        viewPosition: 0,
      });
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <HeaderOrder />
      <FlatList
        style={{ height: 50, backgroundColor: 'white', paddingLeft: 8 }}
        horizontal={true}
        data={dataCategory}
        renderItem={({ item }) => (
          <ItemCategory
            item={item}
            dataCategory={dataCategory}
            setDataCategory={setDataCategory}
            scroll={scroll}
          />
        )}
        keyExtractor={(item, index) => item + index}
      />
      <SectionList
        ref={sectionRef}
        sections={section}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <ItemProduct item={item} topping={topping} size={size} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
              marginLeft: 16,
              marginVertical: 10,
            }}>
            {title}
          </Text>
        )}
      />
      {
        orders.length>0&&
        <View style={styles.count}>
            <Text style={{fontSize:12, color:'white'}}>{orders.length}</Text>
        </View>
      }
      <TouchableOpacity style={styles.btnfl} activeOpacity={1} onPress={navPayment}>
            <Icon name='cart-outline' color='white' size={24}/>     
      </TouchableOpacity>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
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
