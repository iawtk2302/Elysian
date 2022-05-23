import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import COLORS from '../common/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const HeaderOrder = () => {
  const Navigation = useNavigation();
  const navPayment = () => {
    Navigation.navigate('Payment');
  };
  return (
    <View style={styles.container}>
      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
        Order
      </Text>
      <Icon name="heart-outline" size={26} color="white" onPress={navPayment} />
    </View>
  );
};

export default HeaderOrder;

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
