import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
const ItemVoucher = ({item}) => {
  const [time, setTime] = useState();
  const [isExpired, setIsExpired] = useState(false);
  const getTime = time => {
    const end = new Date(time * 1000);
    const now = new Date();
    const temp = Math.floor(
      (end.getTime() - now.getTime()) * (2.77777778 * 0.0000001),
    );
    if (temp <= 24) {
      setTime('Hết hạn trong ' + temp + ' giờ');
      setIsExpired(true);
    } else {
      setTime('Hết hạn ' + end.toLocaleDateString());
    }
  };
  useEffect(() => {
    getTime(item.end.seconds);
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          width: 120,
          height: 120,
          backgroundColor: '#FFF',
          justifyContent: 'center',
          // borderRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          borderStyle: 'dotted',
        }}>
        <Image
          source={{uri: item.image}}
          style={{height: 90, width: 90, alignSelf: 'center'}}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: '#fff',
          height: 120,
          // borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            borderRadius: 20,
            width: 10,
            height: 10,
            backgroundColor: '#F2F2F2',
            marginTop: -7,
          }}></View>
        <View style={{height: 100, justifyContent: 'space-around'}}>
          <IonIcon name="ellipse" size={5} color="#ccc" />
          <IonIcon name="ellipse" size={5} color="#ccc" />
          <IonIcon name="ellipse" size={5} color="#ccc" />
          <IonIcon name="ellipse" size={5} color="#ccc" />
          <IonIcon name="ellipse" size={5} color="#ccc" />
          <IonIcon name="ellipse" size={5} color="#ccc" />
          <IonIcon name="ellipse" size={5} color="#ccc" />
          <IonIcon name="ellipse" size={5} color="#ccc" />
          <IonIcon name="ellipse" size={5} color="#ccc" />
        </View>
        <View
          style={{
            borderRadius: 20,
            width: 10,
            height: 10,
            backgroundColor: '#F2F2F2',
            marginBottom: -7,
          }}></View>
      </View>

      <View
        style={{
          width: width - 150,
          height: 120,
          backgroundColor: 'white',
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          justifyContent: 'space-between',
          paddingVertical: 20,
          paddingLeft: 10,
        }}>
        {/* Title */}
        <View style={{}}>
          <Text style={{fontSize: 15, color: '#000'}} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
        {/* End Time */}
        {isExpired && (
          <View>
            <Text style={{color: 'red'}}>{time}</Text>
          </View>
        )}
        {!isExpired && (
          <View>
            <Text>{time}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ItemVoucher;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: 140,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
