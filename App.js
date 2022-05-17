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
const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <Bottomtab/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
