import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const LoadingPayment = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        source={require('../assets/107573-llove-you.json')}
        autoPlay
        loop
      />
      <View style={{position: 'absolute', bottom: 150}}>
        <Text style={{fontSize: 16, color: 'white', fontWeight: '600'}}>
          Đang thanh toán....
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
});

export default LoadingPayment;
