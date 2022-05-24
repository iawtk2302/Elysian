import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Navigation from './src/navigators/Navigation';
import auth from '@react-native-firebase/auth';
import SiginInNavigate from './src/navigators/SiginInNavigate';
import Register from './src/screens/Register'
import PhoneVertify from './src/screens/PhoneVertify';
import { Provider } from 'react-redux'
import store from './src/redux/store';
const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [hasPhone, setHasPhone] = useState(false)
  function onAuthStateChanged(user) {
    setUser(user);
    // console.log(user);

    if (initializing) setInitializing(false);
    if (auth().currentUser !== null) {
      if (auth().currentUser.displayName !== null) {
        setProfileUpdated(true);
      }
      if (auth().currentUser.phoneNumber != null) {
        setHasPhone(true)
      }
    }
    // console.log(user)
    // console.log(auth().currentUser.email.toString())

    // console.log(profileUpdated)

  }

  useEffect(() => {
    setHasPhone(false)
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={{ flex: 1 }}>
        <SiginInNavigate />
      </View>
    );
  }
  if (!hasPhone)
    return (
      <View style={{ flex: 1 }}>
        <PhoneVertify setHasPhone={setHasPhone} />
      </View>
    )
  if (!profileUpdated)
    return (
      <View style={{ flex: 1 }}>
        <Register setProfileUpdated={setProfileUpdated} />
      </View>
    );
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({

});

export default App;
