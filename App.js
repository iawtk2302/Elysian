<<<<<<< HEAD
import React,{useState, useEffect} from 'react';
=======
import React, {useEffect} from 'react';
>>>>>>> duclong_checkOrder

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
<<<<<<< HEAD
import Navigation from './src/navigators/Navigation';
import auth from '@react-native-firebase/auth';
import SiginInNavigate from './src/navigators/SiginInNavigate';
import Register from './src/screens/Register'
=======
import Bottomtab from './src/navigators/BottomTab';
>>>>>>> duclong_checkOrder
const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [profileUpdated, setProfileUpdated] = useState(false);

  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
    console.log(auth().currentUser)
    if (initializing) setInitializing(false);
    if(auth().currentUser !== null)
      // console.log(auth().currentUser.email.toString())
        if (auth().currentUser.displayName !== 'null') { 
          setProfileUpdated(true);
        }
    console.log(profileUpdated)

  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={{flex: 1}}>
        <SiginInNavigate />
      </View>
    );
  }
  if (!profileUpdated)
    return (
      <View style={{flex: 1}}>
        <Register />
      </View>
    );
  return (
<<<<<<< HEAD
    <SafeAreaView style={{flex:1}}>
      <Navigation/>
=======
    <SafeAreaView style={{flex: 1}}>
      <Bottomtab />
>>>>>>> duclong_checkOrder
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
