import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore';
// const admin = require('firebase-admin');
// var serviceAccount = require('./notification-314b0-firebase-adminsdk-3v1m1-35caee8623.json');

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMtoken();
  }
}

const getFCMtoken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmtoken');
  console.log(fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmtoken', fcmToken);
        console.log(fcmToken);
      }
    } catch (error) {}
  }
};

export const notificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  messaging().onMessage(async remoteMessage => {
    console.log('Notification forground ...', remoteMessage);
  });
};
//f5H1gsVpTwm_8gLfbuaPqr:APA91bFylaMqoBAwxGcFWDRDO06WGVXjQR4RjOlTZNtQ0NhhianjpbVHOzozoFueSyHg912sBO5BsoGoZKkrOX9KHkZuAOM20n2Q784IBzFqhd7XW0t34-pBGiCy_FyoNgixxJuf5Bux

export async function onUserPictureLiked(ownerId, userId, picture) {

  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  //   //   databaseURL: "https://notification-314b0-default-rtdb.firebaseio.com"
  // });

  // const messages = {
  //   notification: {
  //     title: 'khanh',
  //     body: 'this is khanh',
  //   },
  //   token:
  //     'd2VQr5utRteDbTJ2TWeDiY:APA91bE7eTIKONnGTaXy1UQRMfDg7bmGq8pJCKCu6da887fiH7So3C_ec7luQjDxF1S2hWUNpeEwi6mzO1BEm0NlsEGwNGM9JarVhBT5j-kjGwZRGWqUHhwfedck8ch5PQtifBNPCnmU',
  // };
  // admin
  //   .messaging()
  //   .send(messages)
  //   .then(tres => {
  //     console.log('success');
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
}
