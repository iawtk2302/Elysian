import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SectionList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ItemHistory from '../components/ItemHistory';
import COLORS from '../common/Color';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ActivityDelivery from './ActivityDelivery';
import ActivityHistory from './ActivityHistory';
const Tab = createMaterialTopTabNavigator();
const Activities = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              fontWeight: 'bold',
            }}>
            Activities
          </Text>
        </View>
      <Tab.Navigator>
        <Tab.Screen name="ActivityDelivery" component={ActivityDelivery} />
        <Tab.Screen name="ActivityHistory" component={ActivityHistory} />
      </Tab.Navigator>
    </View>
  );
};

export default Activities;

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: 'center',
    backgroundColor: COLORS.custom,
  },
});
