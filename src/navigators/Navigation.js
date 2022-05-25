import {StyleSheet, Text, View} from 'react-native';
import React,{useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Bottomtab from './BottomTab';
import DetailProduct from '../screens/detailProduct';
import Payment from '../screens/payment';
import Order from '../screens/order';
import MoreAddresses from '../screens/moreAddresses';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import OnGoing from '../screens/onGoing';
import OrderHistory from '../screens/orderHistory';
import COLORS from '../common/Color';
<<<<<<< HEAD
import firestore from '@react-native-firebase/firestore'
const Stack = createNativeStackNavigator();
=======
import Banner from '../screens/Banner';
import Notification from '../screens/Notification';
const Stack = createSharedElementStackNavigator();
>>>>>>> Notification
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
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fonSize: 12},
          tabBarStyle: {backgroundColor: COLORS.backgroundWeak},
          tabBarActiveTintColor: COLORS.custom,
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.custom,
          },
          tabBarLabelStyle: {
            fontSize: 13,
          },
        }}>
        <Tab.Screen name="Đang giao" component={OnGoing} />
        <Tab.Screen name="Lịch sử đặt hàng" component={OrderHistory} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
