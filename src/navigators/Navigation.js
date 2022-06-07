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
import AddAddress from '../screens/addAddress';
import Address from '../screens/address';
import DetailAddress from '../screens/detailAddress';
import Support from '../screens/support';
import CancelledOrder from '../screens/cancelledOrder';
import fireauth from '@react-native-firebase/auth'
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
      title: 'Thông báo',
      body: 'Đơn hàng đã giao thành công!',
      android: {
        channelId,
        smallIcon: 'ic_launcher1', // optional, defaults to 'ic_launcher'.
      },
    });
  }
  useEffect(() => {
    firestore()
      .collection('Orders')
      .where('userID', '==', fireauth().currentUser.uid)
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
        <Stack.Screen name="MoreAddresses" component={MoreAddresses} options={{headerShown: true, headerTitleAlign: 'center',headerTitle:'Chọn địa chỉ khác'}}/>
        <Stack.Screen name="AddAddress" component={AddAddress} options={{headerShown: true, headerTitleAlign: 'center',headerTitle:'Địa chỉ mới'}}/>
        <Stack.Screen name="Address" component={Address} options={{headerShown: true, headerTitleAlign: 'center',headerTitle:'Địa chỉ'}}/>
        <Stack.Screen name="Support" component={Support} options={{headerShown: true, headerTitleAlign: 'center',headerTitle:'Hỗ trợ'}}/>
        <Stack.Screen name="DetailAddress" component={DetailAddress} options={{headerShown: true, headerTitleAlign: 'center',headerTitle:'Sửa địa chỉ'}}/>
        <Stack.Screen name="Favorite" component={FavoriteProduct} options={{headerShown: true, headerTitleAlign: 'center',headerTitle:'Sản phẩm yêu thích'}}/>
        <Stack.Screen name="InfoUser" component={InfoUser} options={{headerShown: true, headerTitleAlign: 'center',headerTitle:'Cập nhật thông tin'}}/>
        <Stack.Screen name="Notification" component={Notification} options={{headerShown: true, headerTitleAlign: 'center', headerTitle:'Thông báo'} }/>
        <Stack.Screen name="Banner" component={Banner} 
        options={{
          gestureEnabled: true,
          transitionSpec: {
            open: {animation: 'timing', config: {duration: 300}},
            close: {animation: 'timing', config: {duration: 300}},
          }
        }}/>
        <Stack.Screen name='Map' component={ExploreScreen}/>
        <Stack.Screen name='Voucher' component={Voucher} options={{headerShown: true, headerTitleAlign: 'center', headerTitle:'Khuyến mãi'} }/>

        <Stack.Screen name="Cancel" component={CancelledOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
