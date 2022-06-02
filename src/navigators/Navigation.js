import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Bottomtab from './BottomTab';
import DetailProduct from '../screens/detailProduct';
import Payment from '../screens/payment';
import Order from '../screens/order';
import MoreAddresses from '../screens/moreAddresses';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import firestore from '@react-native-firebase/firestore';
import Banner from '../screens/Banner';
import Notification from '../screens/Notification';
const Stack = createSharedElementStackNavigator();
import notifee, {AndroidImportance, AndroidStyle} from '@notifee/react-native';
import ExploreScreen from '../screens/ExploreScreen';
import FavoriteProduct from '../screens/favoriteProduct';
import InfoUser from '../screens/infoUser';
import TopTabOrder from './TopTabOrder';
import Voucher from '../screens/voucher';
import CancelledOrder from '../screens/cancelledOrder';

const Navigation = () => {
  async function onDisplayNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification',
      body: 'Xin chào',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        largeIcon:
          'https://gamek.mediacdn.vn/133514250583805952/2020/7/11/narutossagemode-15944657133061535033027.png',
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture:
            'https://gamek.mediacdn.vn/133514250583805952/2020/7/11/narutossagemode-15944657133061535033027.png',
        },
      },
    });
  }
  useEffect(() => {
    firestore()
      .collection('Products')
      .where('type', '==', 'Trà sữa')
      .onSnapshot(snapShot => {
        let change = snapShot.docChanges();
        change.forEach(change => {
          if (change.type == 'modified') {
            console.log(change.doc.data());
            onDisplayNotification();
          }
        });
      });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={Bottomtab} />
        <Stack.Screen name="TopTabOrder" component={TopTabOrder} />
        <Stack.Screen name="Detail" component={DetailProduct} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="MoreAddresses" component={MoreAddresses} />
        <Stack.Screen name="Cancel" component={CancelledOrder} />
        <Stack.Screen
          name="Favorite"
          component={FavoriteProduct}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitle: 'Sản phẩm yêu thích',
          }}
        />
        <Stack.Screen
          name="InfoUser"
          component={InfoUser}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitle: 'Cập nhật thông tin',
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitle: 'Thông báo',
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="Banner"
          component={Banner}
          options={{
            gestureEnabled: true,
            transitionSpec: {
              open: {animation: 'timing', config: {duration: 300}},
              close: {animation: 'timing', config: {duration: 300}},
            },
          }}
        />
        <Stack.Screen name="Map" component={ExploreScreen} />
        <Stack.Screen name="Voucher" component={Voucher} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
