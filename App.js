import React,{useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Bottomtab from './src/navigators/BottomTab'
import Navigation from './src/navigators/Navigation';
const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <Navigation/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
