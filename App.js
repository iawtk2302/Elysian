import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import Navigation from './src/navigators/Navigation';
import auth from '@react-native-firebase/auth';
import SiginInNavigate from './src/navigators/SiginInNavigate';
import Register from './src/screens/Register';
import PhoneVertify from './src/screens/PhoneVertify';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
  notificationListener,
  requestUserPermission,
} from './src/utils/pushnotification_helper';
import SplashScreen from 'react-native-splash-screen';
import COLORS from './src/common/Color';
const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [hasPhone, setHasPhone] = useState(false);
  const [loading, setLoading] = useState(true);
  const checkpProfileUpdated = async () => {
    await firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .get()
      .then(doc => {
        if (doc.data()?.dateofbirth !== undefined) {
          setLoading(false);
          setProfileUpdated(true);
        } else {
          if (auth().currentUser.providerData[0].providerId === 'phone') {
            setLoading(false);
            setProfileUpdated(true);
          } else {
            setLoading(false);
            setProfileUpdated(false);
          }
        }
      });
  };
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    if (auth().currentUser !== null) {
      if (auth().currentUser.displayName !== null) {
        checkpProfileUpdated();
      }
      else{
        setLoading(false)
      }
      if (auth().currentUser.phoneNumber != null) {
        setHasPhone(true);
      }
    }
    // console.log(user)
    // console.log(auth().currentUser.email.toString())

    // console.log(profileUpdated)
  }

  useEffect(() => {
    SplashScreen.hide();
    setHasPhone(false);
    requestUserPermission();
    notificationListener();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [loading]);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={{flex: 1}}>
        <SiginInNavigate />
      </View>
    );
  }
  if (!hasPhone)
    return (
      <View style={{flex: 1}}>
        <PhoneVertify setHasPhone={setHasPhone} />
      </View>
    );
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={COLORS.custom} />
      </View>
    );
  }
  if (!profileUpdated)
    return (
      <View style={{flex: 1}}>
        <Register setProfileUpdated={setProfileUpdated} />
      </View>
    );

  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
