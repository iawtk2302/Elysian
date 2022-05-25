import {StyleSheet, Text, View} from 'react-native';
import React,{useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Bottomtab from './BottomTab';
import DetailProduct from '../screens/detailProduct';
import Payment from '../screens/payment';
import Order from '../screens/order';
import MoreAddresses from '../screens/moreAddresses';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import OnGoing from '../screens/onGoing';
import WaiToConFirm from '../screens/waitToConfirm';
import COLORS from '../common/Color';
import firestore from '@react-native-firebase/firestore'
import Banner from '../screens/Banner';
import Notification from '../screens/Notification';
const Stack = createSharedElementStackNavigator();
import styles from '../styles/View.TopTab.Nav';
import CancelledOrder from '../screens/cancelledOrder';
import CompletedOder from '../screens/completedOder';
const Tab = createMaterialTopTabNavigator();
import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';
const Navigation = () => {
  async function onDisplayNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance:AndroidImportance.HIGH
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      },
    });
  }
  useEffect(() => {
    firestore().collection('Products').where('type','==','Trà sữa').onSnapshot(snapShot=>{
      let change=snapShot.docChanges();
      change.forEach(change=>{
        if(change.type=='modified'){
          console.log(change.doc.data())
          onDisplayNotification()
        }
      })
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={Bottomtab} />
        <Stack.Screen name="Detail" component={DetailProduct} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="MoreAddresses" component={MoreAddresses} />
        <Stack.Screen name="Notification" component={Notification} options={{headerShown: true, headerTitleAlign: 'center'}}/>
        <Stack.Screen name="Banner" component={Banner} 
        options={{
          gestureEnabled: true,
          transitionSpec: {
            open: {animation: 'timing', config: {duration: 300}},
            close: {animation: 'timing', config: {duration: 300}},
          }
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export const TopTabs = () => {
  return (
    <NavigationContainer independent={true}>
      <View style={styles.tabBar}>
        <Text style={styles.text}>Đơn mua</Text>
      </View>
      <Tab.Navigator screenOptions={styles.screenOptions}>
        <Tab.Screen name="Chờ xác nhận" component={WaiToConFirm} />
        <Tab.Screen name="Đang giao" component={OnGoing} />
        <Tab.Screen name="Hủy đơn" component={CancelledOrder} />
        <Tab.Screen name="Hoàn thành" component={CompletedOder} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
