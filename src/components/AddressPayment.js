import {Text, View, TouchableOpacity, Switch} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/View.Payment.container';
import COLORS from '../common/Color';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectedAddress} from '../redux/addressSlice';

const AddressPayment = () => {
  let address = useSelector(selectedAddress);
  return (
    <View style={[styles.aroundContainer, {flex: 5}]}>
      <Header />
      <BodyAddress address={address} />
      <BodyUser address={address} />
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
    <View style={styles.addressContain}>
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
  const navigation = useNavigation();

  const NavMoreAddresses = () => {
    navigation.push('MoreAddresses');
  };
  return (
    <TouchableOpacity
      onPress={NavMoreAddresses}
      style={{
        paddingStart: 20,
        paddingEnd: 20,
        flexDirection: 'row',
        flex: 1,
      }}>
      <View style={{flex: 7}}>
        <Text style={[styles.bold, {fontSize: 18}]}>{address.detail}</Text>
        {address == '' ? (
          <Text>loading...</Text>
        ) : (
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
        )}
      </View>
      <View style={{justifyContent: 'center'}}>
        <Ionicons name="chevron-forward-outline" style={{fontSize: 20}} />
      </View>
    </TouchableOpacity>
  );
};

const BodyUser = ({address}) => {
  return (
    <View style={{flexDirection: 'row', flex: 2, alignItems: 'center'}}>
      <View style={{padding: 20, flex: 1}}>
        <Text style={{fontSize: 18, color: 'black'}}>{address.name}</Text>
        <Text>{address.phone}</Text>
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
