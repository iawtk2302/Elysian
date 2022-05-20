import {StyleSheet, Text, View, TouchableOpacity, Switch} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/View.Payment.container';
import COLORS from '../common/Color';

const AddressPayment = ({user, address}) => {
  return (
    <View style={[styles.aroundContainer, {flex: 6}]}>
      <Header />
      <BodyAddress address={address} />
      <BodyUser user={user} />
      <Bot />
    </View>
  );
};

const Header = () => {
  return (
    <View style={styles.container}>
      <Text>Giao hàng tận nơi</Text>
      <TouchableOpacity>
        <View style={styles.btnContainer}>
          <Text style={{color: COLORS.custom}}>Thay Đổi</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Bot = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View
      style={{
        flex: 1,
        marginStart: 20,
        marginEnd: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Text>Lưu thông tin giao hàng cho lần sau</Text>
      <Switch
        trackColor={{false: COLORS.gray, true: COLORS.backgroundWeak}}
        thumbColor={COLORS.custom}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const BodyAddress = ({address}) => {
  return (
    <View
      style={{
        paddingStart: 20,
        paddingEnd: 20,
        flexDirection: 'row',
        flex: 1,
      }}>
      <View style={{flex: 7}}>
        <Text style={[styles.bold, {fontSize: 18}]}>{address.detail}</Text>
        <Text>
          {address.detail +
            ', ' +
            address.village +
            ', ' +
            address.ward +
            ', ' +
            address.district +
            ', ' +
            address.province}
        </Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="chevron-forward-outline" style={{fontSize: 20}} />
      </TouchableOpacity>
    </View>
  );
};

const BodyUser = ({user}) => {
  return (
    <View style={{flexDirection: 'row', flex: 2, alignItems: 'center'}}>
      <View style={{padding: 20, flex: 1}}>
        <Text style={{fontSize: 18, color: 'black'}}>{user.userName}</Text>
        <Text>{user.phone}</Text>
      </View>
      <View
        style={{
          width: 1,
          backgroundColor: 'black',
          height: '60%',
          alignSelf: 'center',
        }}
      />
      <View style={{padding: 20, flex: 1}}>
        <Text>
          15-30 phút {'\n'}
          <Text style={{fontSize: 18, color: 'black'}}>Càng sớm càng tốt</Text>
        </Text>
      </View>
    </View>
  );
};

export default AddressPayment;
